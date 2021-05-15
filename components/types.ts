export const STATUS_TYPES = {
  all: 'All tasks',
  backlog: 'Backlog',
  progress: 'In Progress',
	review: 'In Review',
  complete: 'Complete'
}

export const FETCH_TEAMS = 'FETCH_TEAMS'

export interface ITeamListUserState {
  size: number
  name: string
  color: string
  avatar?: string
}

export interface ITeamListState {
  id: number
  avatar?: string
  name: string
  users: ITeamListUserState[]
}

export interface ITeamsState {
  list: ITeamListState[] | object
}

export interface ITeamsFetchTeamsAction {
  type: typeof FETCH_TEAMS
  payload: ITeamsState
}

export const SHOW_MORE = 'SHOW_MORE'
export const SWITCH_KANBAN = 'SWITCH_KANBAN'

export interface IShowTypes {
  backlog: boolean
  progress: boolean
  complete: boolean
}

export interface IShowState {
  list: IShowTypes
  kanban: boolean
}

export interface IShowMoreAction {
  type: typeof SHOW_MORE
  payload: IShowTypes
}

export interface ISwitchKanbanAction {
  type: typeof SWITCH_KANBAN
  payload: boolean
}


export const TASK_DELETE = 'DELETE_TASK'
export const TASKS_FETCH = 'FETCH_TASKS'
export const TASK_DESCRIPTION_UPDATE = 'TASK_DESCRIPTION_UPDATE'
export const TASK_UPDATE_SUBTASK_ADD = 'TASK_UPDATE_SUBTASK_ADD'
export const TASK_UPDATE_SUBTASK_DELETE = 'TASK_UDPATE_SUBTASK_DELETE'
export const TASK_UPDATE_SUBTASK_COMPLETE = 'TASK_UPDATE_SUBTASK_COMPLETE'
export const DRAG_AND_DROP = 'DRAG_AND_DROP'

export interface ISubTaskProps {
	complete: boolean
	id: string
	itemText: string
}
export interface ITaskState {
  id: string
  title: string
  team: string
  attach: number
  status: string
  score: { days: number; colors: { bg: string; text: string } }
  line: number
  type: string
  users: ITeamListUserState[]
	subTaskList: ISubTaskState[]
}

export interface ITasksDragAndDropAction {
  type: typeof DRAG_AND_DROP
  payload: any
}

export interface ITasksFetchTasksAction {
  type: typeof TASKS_FETCH
  payload: ITaskState[]
}

export interface ITasksDeleteTasksAction {
  type: typeof TASK_DELETE
  payload: string
}

