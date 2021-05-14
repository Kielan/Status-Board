import React from 'react'
import styled from 'styled-components'
import Loader from './Loader.tsx'
import Big from './Buttons/Big.tsx'
import TeamCard from './TeamCard.tsx'
import { ITeamListState } from './types.tsx'
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
const TeamsList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

interface IContentTeamsProps {
  fetchTeams: () => void
  teams: ITeamListState[]
}

const TeamCards: Function = (props: IContentTeamsProps): JSX.Element[] => {
  return props.teams.map((card: ITeamListState) => (
    <TeamCard key={card.id} {...card} />
  ))
}

const Teams: React.FC<IContentTeamsProps> = props => {
  const { teams, fetchTeams } = props

  React.useEffect(() => {
    !teams.length && fetchTeams()
  }, [])

  return (
    <Wrapper>
      <Header>
        <TeamsTitle>Teams</TeamsTitle>
        <TeamsMore>
          <IconOval />
        </TeamsMore>
      </Header>
      <TeamsList>
        {teams.length ? <TeamCards {...props} /> : <Loader height={'none'} />}
        <Big name='Add team' />
      </TeamsList>
    </Wrapper>
  )
}

export default Teams;

