import React from 'react'
import { AppState } from './store'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { STATUS_TYPES, ISTaskStatus } from './types.ts'
import { dragAndDrop, fetchTasks, getTasks, filteredTasks } from './store.ts'
import StatusBoard from './StatusBoard.tsx'
import Loader from './Loader.tsx'
import Title from './Title.tsx'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 250px;
  background-color: #fafafa;
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
	console.log('kdl props.backlog ', props.backlog)
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
    complete: filteredTasks(state, STATUS_TYPES.complete)	
	}
}

const mapDispatchToProps = {
  fetchTasks,
	dragAndDrop
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusBoardContainer)
