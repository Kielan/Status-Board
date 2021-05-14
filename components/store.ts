import thunkMiddleware from 'redux-thunk'
import { createSelector } from 'reselect'
import { Dispatch, createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { REST_DATA } from './DummyData.ts'
import {
  TASKS_FETCH,
  TASK_DELETE,
  DRAG_AND_DROP,
	TASK_UPDATE_SUBTASK_ADD,
	TASK_UPDATE_SUBTASK_COMPLETE,
	TASK_UPDATE_SUBTASK_DELETE,
	TASK_DESCRIPTION_UPDATE,
	IShowState,
	IShowTypes,
	IShowMoreAction,
	ISwitchKanbanAction,
  ITasksDragAndDropAction,
	ITasksFetchTasksAction,
  ITasksDeleteTasksAction,
	ITaskState
} from './types.ts'


/*----------------------------------------------------------------------

	ACTIONS	

------------------------------------------------------------------------*/

export const fetchTasks = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch({ type: TASKS_FETCH, payload: REST_DATA })
  } catch (err) {
    console.error(`[Action: fetchTasks] - ${err}`)
  }
}

export const dragAndDrop = (
  e: object,
  type: string
): ITasksDragAndDropAction => {
  return {
    type: DRAG_AND_DROP,
    payload: { e, type }
  }
}

interface ITasksDeleteTasksAction {
	type: any
	payload: any
}

export const deleteTask = (id: string): ITasksDeleteTasksAction => {
  return {
    type: TASK_DELETE,
    payload: id
  }
}

interface ITaskDescriptionUpdate {
	type: any
	payload: any
}

export const taskDescriptionUpdate = (taskId: string, propKey: string, itemText: string): ITaskDescriptionUpdate => {
	return {
		type: TASK_DESCRIPTION_UPDATE,
		payload: { taskId, propKey, itemText }
	}
}

interface ISubTaskAddAction {
	type: any
	payload: any
}

export const addTaskSubTask = (taskId: string, subTask: any): ITasksAddSubTaskAction => {
	return {
		type: TASK_UPDATE_SUBTASK_ADD,
		payload: { taskId, subTask }
	}
}

export const subTaskComplete = (taskId: string, subTaskId: string): ISubTaskCompleteAction => {
	return {
		type: TASK_UPDATE_SUBTASK_COMPLETE,
		payload: { taskId, subTaskId }
	}
}

export const subTaskDelete = (taskId: string, subTaskId: string): ISubTaskDeleteAction => {
	return {
		type: TASK_UPDATE_SUBTASK_DELETE,
		payload: { taskId, subTaskId }
	}
}

/*----------------------------------------------------------------------

		SELECTORS

------------------------------------------------------------------------*/

const taskList = (state: AppState): ITaskState[] => state.tasks

export const getTasks = createSelector(
  [taskList],
  list => {
    return list
  }
)

export const filteredTasks = (state: any, type: string): ITaskState[] => {
  return state.tasks.filter((task: ITaskState) => {
    return task.type === type
  })
}


/*----------------------------------------------------------------------

	CORE REDUCER ACTIONS

-----------------------------------------------------------------------*/

const tasksCaseDescriptionUpdate = (state, payload): ITaskState => {
	let { taskId, propKey, itemText } = payload
  let taskIndex = state.map(x=>x.id).indexOf(taskId)
  let taskItem = state.find(x => x.id == taskId)
	if (propKey == 'description' || propKey == 'title') {
		taskItem[propKey] = itemText
		state.splice(taskIndex, 1, taskItem)
		return [ ...state ]
	} else {
		console.log('handle rejection')
	}
}
const tasksCaseUpdateSubtaskAdd = (state, payload): ITaskState => {
	    let { taskId, subTask } = payload
      let index = state.map(x=>x.id).indexOf(taskId)
      let taskItem = state.find(x => x.id == taskId)
      if(!taskItem.subTaskList || !taskItem.subTaskList.length) {
        taskItem.subTaskList = []
      }
      const subTaskItem = { ...subTask, id: genId() }
      taskItem.subTaskList.push(subTaskItem)
      //replace taskItem in taskList by index
      state.splice(index, 1, taskItem)

      return [ ...state ]
}


const tasksCaseUpdateSubtaskDelete = (state: any, payload: any): ITaskState => {
			let { taskId, subTaskId } = payload
			let taskIndex = state.map(x=>x.id).indexOf(taskId)
			let taskItem = state.find(x => x.id == taskId)
			let subTaskIndex = taskItem.subTaskList.map(x=>x.id).indexOf(subTaskId)
			taskItem.subTaskList.splice(subTaskIndex, 1)
			state.splice(taskIndex, 1, taskItem)
			return [ ...state ]					
}

const tasksCaseUpdateSubtaskComplete = (state: any, payload: any): ITaskState => {
	let { taskId, subTaskId } = payload
  //find task
	let taskIndex = state.map(x=>x.id).indexOf(taskId)
  let taskItem = state.find(x => x.id == taskId)
	//find subtask	
	let subTaskIndex = taskItem.subTaskList.map(x=>x.id).indexOf(subTaskId)
	let subTask = taskItem.subTaskList.find(x=>x.id == subTaskId)
	subTask.complete = !subTask.complete
	//add subtask back into taskItem array
	taskItem.subTaskList.splice(subTaskIndex, 1, subTask)
	state.splice(taskIndex, 1, taskItem)
	return [ ...state ]
}

/*-----------------------------------------------------------------------

		REDUCER

------------------------------------------------------------------------*/

const checkChrome = (id: string): string => {
  return id[0] === '<' ? id.replace(/[^\d]/g, '').slice(1) : id
}
const genId = (): string => {
	var key =  window.crypto.subtle.generateKey(
  	{
    	name: "ECDSA",
    	namedCurve: "P-384"
  	},
  	true,
  	["sign", "verify"]
	)
	return key
}

type Actions =
  | ITasksDragAndDropAction
  | ITasksFetchTasksAction
  | ITasksDeleteTasksAction

const initialTasksState: ITaskState[] = []

export function tasks(state = initialTasksState, action: Actions): ITaskState[] {
  const { type, payload } = action
  switch (type) {
    case DRAG_AND_DROP:
      const id = payload.e.dataTransfer.getData('text/html')
      const checkedId = checkChrome(id)
      return state.filter(task => {
        if (task.id === checkedId) {
          task.type = payload.type
        }
        return task
      })
    case TASKS_FETCH:
      return [...state, ...action.payload]
    case TASK_DELETE:
      return state.filter(task => task.id !== payload)
		case TASK_UPDATE_SUBTASK_ADD:
			return tasksCaseUpdateSubtaskAdd(state, payload)
		case TASK_UPDATE_SUBTASK_DELETE:
			return tasksCaseUpdateSubtaskDelete(state, payload)					
		case TASK_UPDATE_SUBTASK_COMPLETE:
			return tasksCaseUpdateSubtaskComplete(state, payload)
		case TASK_DESCRIPTION_UPDATE:
			return tasksCaseDescriptionUpdate(state, payload)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  tasks
})

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore() {
  const middleware = [thunkMiddleware]
  const middleWareEnhancer = applyMiddleware(...middleware)
  return createStore(rootReducer, composeWithDevTools(middleWareEnhancer))
}
