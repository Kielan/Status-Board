import React from 'react'
import styled from 'styled-components'
import Avatar from './Avatar.tsx'
import TaskInfo from './TaskInfo.tsx'
import TaskModal from './TaskModal.tsx'
import TaskScore from './TaskScore.tsx'
import { ITaskState, ITeamListUserState } from './types.ts'
import Titles from './TaskTitles.tsx'

const Wrapper = styled.div`
  display: flex;
  justify-content: ${(props: ITaskProps) => !props.option && 'space-around'};
  flex-direction: ${(props: ITaskProps) => (props.option ? 'column' : 'column')};
  cursor: move;
  border-radius: 20px;
  padding: 15px;
  margin: 0 5px 10px 5px;
  background: ${props =>
    props.drag
      ? `repeating-linear-gradient(
    45deg,
    white,
    white 5px,
    #f1f1f5 5px,
    #f1f1f5 10px
  )`
      : 'white'};
  border: ${props => (props.drag ? '1px dashed #92929d' : '1px dashed white')};
  opacity: ${props => (props.drag ? '0.999' : '1')};
`
const Users = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px;
  margin: 10px 0 0 0;
`

interface ITaskProps {
  taskItem: ITaskState
  key: string
  option: boolean
  drag?: boolean
}

const TaskItem: React.FC<ITaskProps> = props => {
  const { taskItem } = props

  const [modal, setModal] = React.useState<boolean>(false)
  const [drag, setDrag] = React.useState<boolean>(false)

  const onDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
    setDrag(prevState => !prevState)
    e.dataTransfer.setData('text/html', taskItem.id)
  }

  const toggleModal = (): void => {
    setModal(prevState => !prevState)
  }

  const users = taskItem.users.map(
    (user: ITeamListUserState, idx: number): object => (
      <Avatar key={idx} {...user} />
    )
  )

  return (
    <>
      <Wrapper
        {...props}
        draggable={true}
        onDragStart={onDragStart}
        onClick={toggleModal}
				drag={drag}
      >
        <Titles data={taskItem} />
        <TaskInfo data={taskItem} />
				<TaskScore data={taskItem} />
        <Users>{users}</Users>
      </Wrapper>
      <>{modal && <TaskModal {...taskItem} onClose={toggleModal} />}</>
    </>
  )
}

export default TaskItem

