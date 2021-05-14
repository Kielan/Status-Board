import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import Close from './Icons/Close.tsx'
import Button from './Buttons/Big.tsx'

const EditableTextareaWrapper = styled.div`
	cursor: pointer;
	display: flex;
	flex: 1;
	min-height: 135px;
`

const TextareaFieldFooter = styled.div`
	display: flex;
	flex: 1;
	padding: 1rem 0;
`

interface IEditableTextareaProps {
	fieldValue: string
	onChange: () => void
	onSubmit: () => void
}

const EditableTextarea:React.FC<EditableTextareaProps> = props => {
	const { fieldValue, onChange, onSubmit } = props
	const [editActive, setEditActive] = useState(false)
	var wrapperContent;

	const onClickEditOpen = () => {
		setEditActive(true)
	}

	const onClickEditClose = () => {
		setEditActive(false)
	}

	if(editActive) {
		wrapperContent = <TextareaField
												fieldValue={fieldValue}
												onChange={onChange}
												onClickEditClose={onClickEditClose}
												onSubmit={onSubmit}/>
	} else {
		wrapperContent = <TextareaChildrenRender children={props.children} onClickEditOpen={onClickEditOpen}/>
	}

	return (
		<EditableTextareaWrapper>
			{wrapperContent}	
		</EditableTextareaWrapper>
	)
}

const TextareaFieldWrapper = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
`
const TextareaCloseIcon = styled.div`
	padding 0 1rem;
	display: flex;
	align-items: center;
`
const FormTextarea = styled.textarea`
  background-color: #FAFAFA;
  border-color: #FFFFFF;
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  border-style: none;
  padding: 15px 10px;
`

interface ITextareaField {
	fieldValue: string
	onChange: () => void
	onClickEditClose: () => void
	onSubmit: () => void
}

const TextareaField:React.FC<ITextareaField> = props => {
	const { fieldValue, onChange, onClickEditClose, onSubmit } = props
	const onClickSubmit = () => {
		onSubmit()
		onClickEditClose()
	}
	return (
		<TextareaFieldWrapper>
			<FormTextarea 
				onChange={onChange}
				value={fieldValue}>
			</FormTextarea>
			<TextareaFieldFooter>
			<Button onClick={onClickSubmit} name="save" />
			<TextareaCloseIcon onClick={() => onClickEditClose()}>
				<Close />
			</TextareaCloseIcon>
			</TextareaFieldFooter>
		</TextareaFieldWrapper>
	);
}

const TextareaChildrenRenderWrapper = styled.div`
	display: flex;
`

interface ITextareaChildrenRender {
	children: any
	onClickEditOpen: () => void
}

const TextareaChildrenRender:React.FC<ITextareaChildrenRender> = props => {
	const { children, onClickEditOpen } = props
	return (
		<TextareaChildrenRenderWrapper onClick={() => onClickEditOpen()}>
			{children}
		</TextareaChildrenRenderWrapper>
	)
}

export default EditableTextarea;
