import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { colors } from './styles.ts'
import { AppState, dragAndDrop, fetchTasks, filteredTasks, getTasks } from './store.ts'
import { STATUS_TYPES, IShowTypes, ITaskState, ITaskStatus } from './types.ts'
import Loader from './Loader.tsx'
import TaskWrapper from './TaskWrapper.tsx'
import Title from './Title.tsx'

const Tasks = styled.div`
  margin-top: 35px;
  display: grid;
  grid-template-columns: ${(props: IContentProps) =>
    props.option ? `repeat(auto-fill, minmax(320px, 1fr))` : 'none'};
  grid-template-rows: ${(props: IContentProps) =>
    props.option ? 'none' : 'repeat(4, auto)'};
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`

interface IStatusBoardProps {
  backlog: ITaskState[]
  progress: ITaskState[]
	review: ITaskState[]
  complete: ITaskState[]
  showAll: boolean
  showBacklog: boolean
  showState: IShowTypes
  option: boolean
  fetchTasks?: typeof fetchTasks
  tasks: ITaskState[]
}

const StatusBoard: React.FC<IStatusBoardProps> = props => {
  const { tasks, showState, backlog, progress, review, complete } = props

  return (
      <Tasks {...props}>
        <TaskWrapper data={backlog} type='Backlog' {...props}/>
        <TaskWrapper data={progress} type='In Progress' {...props}/>
				<TaskWrapper data={review} type='In Review' {...props}/>
        <TaskWrapper data={complete} type='Complete' {...props}/>
      </Tasks>
  )
};

StatusBoard.defaultProps = {
	showAll: true,
	showBacklog: true,
	showState: STATUS_TYPES.all,
  option: true
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 250px;
  background-color: ${colors.SecondaryColor};
`

interface IStatusBoardContainerProps {
  data: ITaskStatus[]
  setTaskList: (data: ITaskStatus[]) => {}
  backlog: ITaskState[]
  progress: ITaskState[]
  complete: ITaskState[]
  showAll: boolean
  showBacklog: boolean
  showState: IShowTypes
  option: boolean
  tasks: ITaskState[]
}

const StatusBoardContainer: React.FC<IStatusBoardContainerProps> = props => {
  const { fetchTasks, tasks } = props

  React.useEffect(() => {
    !tasks.length && fetchTasks()
  }, [])

  return (
    <Wrapper>
      <Title />
      {tasks.length ? (
        <StatusBoard {...props} />
      ) : (
        <Loader />
      )}
      <div id="modal"></div>
    </Wrapper>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    tasks: getTasks(state),
    backlog: filteredTasks(state, STATUS_TYPES.backlog),
    progress: filteredTasks(state, STATUS_TYPES.progress),
		review: filteredTasks(state, STATUS_TYPES.review),
    complete: filteredTasks(state, STATUS_TYPES.complete)
  }
}

const mapDispatchToProps = {
  fetchTasks,
  dragAndDrop
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusBoardContainer)
