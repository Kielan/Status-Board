import React from 'react'
import styled from 'styled-components'
import TaskItem from './TaskItem.tsx'
import { ITaskState } from './types.tsx'
import TaskWrapperButton from './TaskWrapperButton.tsx'
import IconOval from './Icons/Oval.tsx'

const variables = {
  color: '#0062ff',
  colorBorder: '#e2e2ea',
  crossSize: 16
}

const Wrapper = styled.div`
  width: ${(props: ITaskWrapperProps) => (props.option ? '320px' : 'auto')};
  min-height: ${(props: ITaskWrapperProps) => (props.option ? '480px' : '380px')};
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  border-radius: 15px 15px 0 0;
  border-top: 1px solid ${variables.colorBorder};
  border-left: 1px solid ${variables.colorBorder};
  border-right: 1px solid ${variables.colorBorder};
  display: flex;
  justify-content: space-between;
  height: min-content;
`
const Title = styled.span`
  font-size: 16px;
  letter-spacing: 0.1px;
  color: #696974;
  padding: 15px 20px;
`
const More = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: not-allowed;
  @media (max-width: 450px) {
    display: none;
  }
`
const TasksWrapper = styled.div<DragWrapperProps>`
  height: auto;
  border-left: 1px solid ${variables.colorBorder};
  border-right: 1px solid ${variables.colorBorder};
  padding: 20px 0;
  background: ${props =>
    props.dragOver
      ? `repeating-linear-gradient(
    45deg,
    white,
    white 5px,
    #E3ECFB 5px,
    #E3ECFB 10px
  )`
      : 'none'};
		height: 38rem;
`

type DragWrapperProps = {
  dragOver: boolean
}

interface ITaskWrapperProps {
  dragAndDrop: typeof dragAndDrop
  data: ITaskState[]
  type: string
  option: boolean
}

const Tasks: Function = (props: ITaskWrapperProps): JSX.Element[] => {
  return props.data.map((item: ITaskState) => (
    <TaskItem taskItem={item} key={item.id} />
  ))
}

const TaskWrapper: React.FC<ITaskWrapperProps> = props => {
  const { type, dragAndDrop } = props

  const [dragOver, setDragOver] = React.useState<boolean>(false)

  const onDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
  }

  const onDragEnter = (): void => {
    setDragOver(prevState => !prevState)
  }

  const onDragLeave = (): void => {
    setDragOver(prevState => !prevState)
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>): void => {
		dragAndDrop(e, type)
    setDragOver(false)
  }

  return (
    <Wrapper
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      {...props}
    >
      <Header>
        <Title>{type}</Title>
        <More>
          <IconOval />
        </More>
      </Header>
      <TasksWrapper dragOver={dragOver}>
        <Tasks {...props} />
      </TasksWrapper>
      <TaskWrapperButton />
    </Wrapper>
  )
}

export default TaskWrapper

