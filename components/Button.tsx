import React from 'react'
import styled from 'styled-components'
import { colors } from './styles.ts'

const crossSize = 16

const Cross = styled.div`
  position: absolute;
  left: 50%;
  top: 25%;
  width: ${crossSize}px;
  height: ${crossSize}px;
  :before,
  :after {
    position: absolute;
    left: 0;
    content: '';
    height: ${crossSize}px;
    width: 2px;
    background-color: ${colors.TertiaryColor};
  }
  :before {
    transform: rotate(90deg);
  }
  :after {
    transform: rotate(180deg);
  }
`
const Wrapper = styled.button`
  height: 35px;
  border-radius: ${(props: IButtonProps) => (props.borderVariant == ButtonBorder.rounded ? '4px' :
																							props.size == ButtonBorder.topflat ? '0 0 15px 15px' :
																							'0 0 15px 15px')};
  outline: none;
  border: ${(props: IButtonProps) => (props.backgroundVariant == ButtonBackground.light ? `1px solid ${colors.TertiaryColor};` :
																			props.backgroundVariant == ButtonBackground.dark ? `1px solid ${colors.PrimaryColor};` :
																			`1px solid ${colors.TertiaryColor}`)};
  position: relative;
  cursor: ${(props: IButtonProps) => (props.disabled == true ? 'not-allowed' : 'pointer' )};
  background-color: ${(props: IButtonProps) => (props.backgroundVariant == ButtonBackground.light ? colors.WhiteColor :
																								props.backgroundVariant == ButtonBackground.dark ? colors.PrimaryColor :
																								colors.PrimaryColor)};
  :hover {
    background-color: 1px dashed ${colors.SecondaryColor};
  }
  :hover ${Cross}:before {
    background-color: ${colors.PrimaryColor};
  }
  :hover ${Cross}:after {
    background-color: ${colors.PrimaryColor};
  }
`
const Text = styled.span`
  font-size: 14px;
  text-align: center;
  padding: ${(props: IButtonProps) => (props.size == 'small' ? '3px 10px' :
                                        props.size == 'big' ? '10px 15px' :
																				'10px 15px')};
`
export enum ButtonBackground{
	light,
	dark,
	warning
}
export enum ButtonBorder {
	topflat,
	rounded
}
export enum ButtonModification {
	outline,
	inverted,
	notext
}

interface IButtonProps {
	backgroundVariant?: ButtonBackground
	borderVariant?: ButtonBorder
	disabled?: boolean
	modification?: ButtonModification
	name: string
  onClick?: () => void
  size?: string
}

const Button: React.FC<IButtonProps> = props => {
  const { modification, name, onClick, size } = props

  return (
    <Wrapper { ...props } >
      { modification != ButtonModification.notext && <Text {...props}>{name}</Text>}
			{ modification == ButtonModification.notext && <Cross />}
    </Wrapper>
  )
}

Button.defaultProps = {
	backgroundVariant: ButtonBackground.dark,
	borderVariant: ButtonBorder.rounded,
	disabled: false
}

export default React.memo(Button)
	
