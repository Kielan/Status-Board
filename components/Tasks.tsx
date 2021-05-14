import React from 'react'
import styled from 'styled-components'
import TaskItem from './TaskItem.tsx'
import { ITaskState } from './types.ts'
import IconOval from './Icons/Oval.tsx'

const Wrapper = styled.div`
  border: 1px solid #e2e2ea;
  border-radius: 23px;
  margin: 35px 0 20px 0;
  display: flex;
  flex-direction: column;
  padding: 5px;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const TeamsTitle = styled.span`
  font-size: 16px;
  letter-spacing: 0.1px;
  color: #696974;
  padding: 15px 20px;
`
const TeamsMore = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: not-allowed;
  @media (max-width: 450px) {
    display: none;
  }
`
const Teams = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const TasksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

interface IContentTasksProps {
  tasks: ITaskState[]
}

const Tasks: React.FC<IContentTasksProps> = props => {
  const { tasks = { id: "100" } } = props

  const tasksList = tasks.map((item: ITaskState) => (
    <TaskItem taskItem={item} key={item.id} />
  ))

  return (
    <Wrapper>
      <Header>
        <TeamsTitle>Tasks</TeamsTitle>
        <TeamsMore>
          <IconOval />
        </TeamsMore>
      </Header>
      <Teams>
        <TasksWrapper>{tasksList}</TasksWrapper>
      </Teams>
    </Wrapper>
  )
}

export default Tasks;
