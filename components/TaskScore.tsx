import React from 'react'
import { AppState } from 'store'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ITaskState } from 'types.ts'
//import { getKanbanOption } from 'store/show/selectors'

const Wrapper = styled.div`
  display: flex;
  flex-direction: ${(props: IScoreProps) =>
    props.option ? 'column' : 'column'};
  align-items: ${(props: IScoreProps) => !props.option && 'center'};
`
const ScoreLineTitle = styled.div`
  font-size: 14px;
  letter-spacing: 0.1px;
  color: #696974;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-left: ${(props: IScoreProps) => !props.option && '10px'};
`
const ScoreLineDivElement = styled.div`
  background-color: #e2e2ea;
  width: 100%;
  height: 3px;
  border-radius: 2.5px;
  min-width: ${(props: IScoreProps) => !props.option && '150px'};
  div {
    height: 3px;
    background-color: #3dd598;
    width: ${(props: IScoreProps) => `${props.scoreLine}%`};
  }
`
interface IScoreProps {
  data: ITaskState
  option: boolean
	scoreLine: number
}

const Score: React.FC<IScoreProps> = props => {
  const { data, scoreLine } = props
  return (
    <Wrapper {...props}>
      <ScoreLineTitle {...props}>{scoreLine}%</ScoreLineTitle>
      <ScoreLineDivElement {...props}>
        <div />
      </ScoreLineDivElement>
    </Wrapper>
  )
}
const mapStateToProps = (state: AppState) => {
  return {
    option: false//getKanbanOption(state)
  }
}

export default Score

