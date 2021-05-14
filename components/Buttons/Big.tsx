import React from 'react'
import styled from 'styled-components'

const variables = {
  color: '#D5D5DC',
  crossSize: 15
}

const Wrapper = styled.div`
  background-color: #D5D5DC;
  border: 2px solid ${variables.color};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`
const Text = styled.span`
  font-size: 14px;
	text-align: center;
	padding: ${(props: IButtonProps) => (props.size == 'small' ? '3px 10px' :
																				props.size == 'big' ? '10px 15px' : '10px 15px')};
`

interface IButtonProps {
  name: string
	onClick?: () => void
	size?: string
}

const Big: React.FC<IButtonProps> = props => {
  const { name, onClick } = props

  return (
    <Wrapper onClick={onClick} >
      <Text {...props}>{name}</Text>
    </Wrapper>
  )
}

export default React.memo(Big)

