import React from 'react'
import styled from 'styled-components'
import { STATUS_TYPES, IShowTypes, ITaskState } from './types.ts'
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
  complete: ITaskState[]
  showAll: boolean
  showBacklog: boolean
  showState: IShowTypes
  option: boolean
  fetchTasks?: typeof fetchTasks
  tasks: ITaskState[]
}

const StatusBoard: React.FC<IStatusBoardProps> = props => {
  const { tasks, showState, backlog, progress, complete } = props

  return (
      <Tasks {...props}>
        <TaskWrapper data={backlog} type='Backlog' {...props}/>
        <TaskWrapper data={progress} type='In Progress' {...props}/>
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

export default StatusBoard;

