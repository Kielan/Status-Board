import React from 'react'
import styled from 'styled-components'
import { ITaskState } from './types.ts'
import TasksIcon from './Icons/Tasks.tsx'
import AttachIcon from './Icons/Attach.tsx'
import ActivityIcon from './Icons/Activity.tsx'

const TextStyles = styled.div`
  font-size: 14px;
  letter-spacing: 0.1px;
  color: #92929d;
`
const Wrapper = styled.div`
  display: flex;
  margin: 15px 0 10px 0;
`
const Attach = styled(TextStyles)`
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
`
const Status = styled(TextStyles)`
  margin: 0 15px 0 20px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
    fill: #92929d;
    width: 14px;
    height: 14px;
  }
`
const Activity = styled(Status)`
  background-color: ${(props: IInfoProps) => props.data.score.colors.bg};
  color: ${(props: IInfoProps) => props.data.score.colors.text};
  padding: 5px;
  border-radius: 5px;
  margin: 0;
  span:last-child {
    margin-left: 5px;
  }
  svg {
    fill: ${(props: IInfoProps) => props.data.score.colors.text};
  }
`

interface IInfoProps {
  data: ITaskState
}

const Info: React.FC<IInfoProps> = props => {
  const { data } = props

  return (
    <Wrapper>
      <Attach>
        <AttachIcon />
        {data.attach}
      </Attach>
      <Status>
        <TasksIcon />
        {data.status}
      </Status>
      {data.score.days > 0 && (
        <Activity {...props}>
          <ActivityIcon />
          <span>{data.score.days}</span>
          <span>days left</span>
        </Activity>
      )}
    </Wrapper>
  )
}

export default Info

