import React, { useCallback, useState } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { 
				addTaskSubTask,
				subTaskComplete,
				subTaskDelete,
				taskDescriptionUpdate
} from './store.ts' 
import { ISubTaskProps, ITaskState } from './types.ts'
import Button from './Buttons/Big.tsx'
import EditableTextarea from './EditableTextarea.tsx'
import Close from './Icons/Close.tsx'
import Shape from './Icons/Shape.tsx'
import Tasks from './Icons/Tasks.tsx'
import TaskScore from './TaskScore.tsx'

const variables = {
  colorGray: '#92929d',
  colorRed: '#fc5a5a',
  colorWhite: '#ffffff'
}

const Wrapper = styled.section`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(23, 23, 37, 0.4);
  z-index: 100;
`
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 80%;
  width: 80%;
  min-height: 30vh;
  background-color: ${variables.colorWhite};
  border-radius: 20px;
	padding: 20px 25px;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${variables.colorGray};
  font-size: 14px;
  height: 50px;
  border-bottom: 1px solid #e2e2ea;
`
const ButtonStyled = styled.button`
  background-color: ${variables.colorWhite};
  border: none;
  outline: none;
  cursor: pointer;
  svg {
    fill: ${variables.colorGray};
    :hover {
      fill: #0062ff;
    }
  }
`
const Delete = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  background-color: ${variables.colorRed};
  outline: none;
  cursor: pointer;
  color: ${variables.colorWhite};
  height: 38px;
  border-radius: 20px;
  border: 1px solid ${variables.colorRed};
  :hover {
    color: ${variables.colorRed};
    background-color: ${variables.colorWhite};
  }
`

interface ITaskModalProps extends ITaskState {
  //deleteTask: typeof deleteTask
  onClose(): void
}

const TaskModal: React.FC<ITaskModalProps> = props => {
  const { addTaskSubTask, subTaskComplete, description,
					subTaskDelete, subTaskList, type, taskDescriptionUpdate,
					title, onClose, id } = props

  const element = document.getElementById('modal')
  if (!element) {
    throw new Error('The element #portal wasn`t found')
  }

  const removeTask = (id: string) => {
    //deleteTask(id)
  }

  return ReactDOM.createPortal(
    <Wrapper>
      <Modal>
        <Header>
          <span>{type}</span>
          <ButtonStyled onClick={onClose}>
            <Close />
          </ButtonStyled>
        </Header>
        <TaskModalTitle 
					title={title}
					onSubmit={taskDescriptionUpdate}
					taskId={id}
				/>
        <TaskModalDescription
					description={description}
					onSubmit={taskDescriptionUpdate}
					taskId={id}
				/>
				<div>
					<TaskModalChecklist
						addTaskSubTask={addTaskSubTask}
						subTaskDelete={subTaskDelete}
						subTaskComplete={subTaskComplete}
						subTaskList={subTaskList}
						taskId={id}
						taskItem={props}
					/>
				</div>
       	<Delete onClick={() => removeTask(id)}>Delete</Delete>
      </Modal>
    </Wrapper>,
    element
  )
}

const mapDispatchToProps = {
//  deleteTask
	subTaskComplete,
	subTaskDelete,
	taskDescriptionUpdate,
	addTaskSubTask
}
const Title = styled.div`
  color: #171725;
  font-size: 24px;
  margin-top: 30px;
`
interface ITaskModalTitleProps {
	onSubmit: () => void
	taskId: string
	title: string	
}
const TaskModalTitle: React.FC<ITaskModalTitleProps> = props => {
  const { onSubmit, taskId, title } = props
  const [textareaValue, setTextareaValue] = useState(title)
  const handleOnChange = useCallback(event => {
    const {value} = event.target
    setTextareaValue(value)
  })
  const onSubmitTaskTitle = () => {
    onSubmit(taskId, 'title', textareaValue)
  }

	return (
		<Title>
			<EditableTextarea fieldValue={textareaValue} onChange={handleOnChange} onSubmit={onSubmitTaskTitle}>
				<span>{title}</span>
			</EditableTextarea>
		</Title>
	)
}

const TaskModalDescriptionWrapper = styled.div`
  display: flex;
  svg {
    fill: ${variables.colorGray};
  }
`
const ShapeWrapper = styled.div`
  width: 20px;
`
const HeaderD = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: 10px;
`
const TitleD = styled.span`
  font-size: 14px;
  letter-spacing: 0.1px;
  color: #171725;
  margin: 0 0 10px 10px;
`
const TextD = styled.span`
  margin-left: 10px;
  color: ${variables.colorGray};
  font-size: 14px;
`
interface ITaskModalDescriptionProps {
  description: string
  onSubmit: () => void
  title: string
}
const TaskModalDescription: React.FC<ITaskModalDescriptionProps> = props => {
  const { description, onSubmit, taskId, title } = props
  const [textareaValue, setTextareaValue] = useState(description)
  const handleOnChange = useCallback(event => {
    const {value} = event.target
    setTextareaValue(value)
  })
  const onSubmitTaskDescription = () => {
    onSubmit(taskId, 'description', textareaValue)
  }

  return (
    <TaskModalDescriptionWrapper>
      <ShapeWrapper>
        <Shape />
      </ShapeWrapper>
      <HeaderD>
        <TitleD>Description</TitleD>
        <EditableTextarea fieldValue={textareaValue} onChange={handleOnChange} onSubmit={onSubmitTaskDescription}>
          <TextD>
            {description}
          </TextD>
        </EditableTextarea>
      </HeaderD>
    </TaskModalDescriptionWrapper>
  )
}

const WrapRow = styled.div`
  display: flex;
  flex-direction: column;
`
const TaskModalHeaderWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  svg {
    fill: ${variables.colorGray};
  }
`
const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`
const SectionTitle = styled.span`
  font-size: 14px;
  letter-spacing: 0.1px;
  color: #171725;
  margin: 0 0 10px 10px;
`
const SectionBody = styled.span`
  display: flex;
  margin-bottom: 10px;
`
const SectionText = styled.span`
  color: ${variables.colorGray};
  flex: 1;
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
`
const TaskModalChecklistColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`
interface ITaskModalChecklistProps {
  addTaskSubTask: () => void
  taskId: string
	taskItem: ITaskStatus
  title: string
  subTaskList: ISubTaskProps[]
  subTaskComplete: () => void
  subTaskDelete: () => void
}

const TaskModalChecklist:React.FC<ITaskModalChecklistProps> = props => {
  const { addTaskSubTask, subTaskComplete, subTaskDelete, subTaskList, taskId, taskItem } = props
  var checklistContent;

  if(subTaskList && subTaskList.length > 0) {
    checklistContent = <TaskModalChecklistContent subTaskList={subTaskList} />
  } else {
    checklistContent = <></>
  }

  return (
    <WrapRow>
      <TaskModalHeaderWrapper>
        <ShapeWrapper>
          <Tasks />
        </ShapeWrapper>
        <TaskModalChecklistColumn>
          <SectionHeader>
            <SectionTitle>Checklist</SectionTitle>
            <Button size="small" name="Delete" />
          </SectionHeader>
          <SectionBody>
            <SectionText>
              <TaskScore data={taskItem}/>
            </SectionText>
          </SectionBody>
        </TaskModalChecklistColumn>
      </TaskModalHeaderWrapper>

        <div>
          <TaskModalChecklistContent taskId={taskId} subTaskComplete={subTaskComplete} subTaskDelete={subTaskDelete} subTaskList={subTaskList} />
          <TaskModalChecklistAddItem taskId={taskId} addTaskSubTask={addTaskSubTask} />
        </div>

    </WrapRow>
  )
}

const ChecklistContentWrapper = styled.div`
  display: flex;
  flex-direction: column; 
`
const TaskModalChecklistItemWrapper = styled.div`
  flex-direction: column;
`
const SubTaskItemDeleteButtonWrapper = styled.div`
  display: flex;
`
const TaskModalCheckboxWrapper = styled.div`
  height: 16px;
  width: 16px;
  cursor: pointer;
  margin-left: 5px;
`
const TaskModalCheckBox = styled.input`
  cursor: pointer;
`
const TaskModalChecklistItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2rem;
  :hover {
    background-color: #D5D5DC; 
  }
`

interface ITaskModalChecklistContentProps {
  subTaskList: ISubTaskListProps
  subTaskComplete: () => void
  subTaskDelete: () => void
  taskId: string
}

const TaskModalChecklistContent:React.FC<ITaskModalChecklistContentProps> = props => {
  const { subTaskList, subTaskComplete, subTaskDelete, taskId } = props
  const onSubTaskComplete = (taskId, subTaskId) => {
    subTaskComplete(taskId, subTaskId)
  }
  return (
      <ChecklistContentWrapper>
        {subTaskList && subTaskList.length > 0 && <>
          {subTaskList.map((subTask, key) => (
            <TaskModalChecklistItem key={key}>
              <TaskModalCheckboxWrapper>
                <TaskModalCheckBox checked={subTask.complete} onChange={() => onSubTaskComplete(taskId, subTask.id)} type="checkbox"/>
              </TaskModalCheckboxWrapper>

              <TaskModalChecklistSubTaskText subTask={subTask}/>

              <SubTaskItemDeleteButtonWrapper>
                <Button name="x" size="small" onClick={() => subTaskDelete(taskId)}/>
              </SubTaskItemDeleteButtonWrapper>
            </TaskModalChecklistItem>
          ))}</>
        }
      </ChecklistContentWrapper>
  )
}

const SubTaskSpanInputWrapper = styled.div`
  display: flex;
  flex: 1;
`
const SubTaskSpanInput = styled.span`
  margin: 0px 15px;
  text-decoration: ${(props) => (props.complete == true ? 'line-through' : 'none')};  
  transition: all 0.2s ease-in-out;
`

interface ITaskModalChecklistSubTaskTextProps extends ISubTaskListProps {}

const TaskModalChecklistSubTaskText:React.FC<ITaskModalChecklistSubTaskTextProps> = props => {
  const { subTask } = props
  return (
          <SubTaskSpanInputWrapper>
            <SubTaskSpanInput {...subTask}>{subTask.itemText}</SubTaskSpanInput>
          </SubTaskSpanInputWrapper>

  )
}

const TaskModalChecklistAddItemWrapper = styled.div`
	flex: 1;
  margin-top: 15px;
	height: 120px;
`

interface ITaskModalChecklistAddItemProps {
	addTaskSubTask: () => void
	taskId: string
  title: string
}

const TaskModalChecklistAddItem:React.FC<ITaskModalChecklistAddItemProps> = props => {
	const { addTaskSubTask, taskId } = props
	const [addChecklistItemActive, setAddChecklistItemActive] = useState(false)
  var wrapperContent

  const onClickSetAddChecklistItemActive = () => {
    setAddChecklistItemActive(true)
  }

  const onClickSetAddChecklistItemClose = () => {
    setAddChecklistItemActive(false)
  }

	const onClickAddTaskSubTask = (taskId, subTask) => {
		addTaskSubTask(taskId, subTask)
		setAddChecklistItemActive(false)
	}

  if(addChecklistItemActive) {
    wrapperContent = <TaskModalChecklistAddItemForm onClickAdd={onClickAddTaskSubTask} onClickClose={onClickSetAddChecklistItemClose} taskId={taskId}/>
  } else {
    wrapperContent = <TaskModalChecklistAddAnItemButton
												name={'Add an item'}
												onClick={onClickSetAddChecklistItemActive} /> 
  }

	return (
		<TaskModalChecklistAddItemWrapper>
			{wrapperContent}
		</TaskModalChecklistAddItemWrapper>
	)
}

const TaskModalChecklistAddItemFormWrapper = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
`

const TaskModalChecklistAddItemFormFooter = styled.div`
	display: flex;
	flex: 1;
	margin-top: 1rem;
`
const IconCloseWrapper = styled.div`
	align-items: center;
	cursor: pointer;
	justify-content: center;
	display: flex;
	flex: 1;
	max-width: 82px;
`
const TaskModalChecklistAddItemFormTextarea = styled.textarea`
  background-color: #FAFAFA;
  border-color: #FFFFFF;
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  border-style: none;
  padding: 15px 10px;	
`
const TaskModalChecklistAddItemFormButtonWrapper = styled.div`
	display: flex;
`

interface ITaskModalChecklistAddItemFormProps {
	onClickAdd: () => void;
	onClickClose: () => void;
	taskId: any;
}

const TaskModalChecklistAddItemForm:React.FC<ITaskModalChecklistAddItemFormProps> = props => {
	const { onClickAdd, onClickClose, taskId } = props
	const [inputValues, setInputValues] = useState({
		itemText: ''
	})
	
	const handleOnChange = useCallback(event => {
		const { value } = event.target;
		setInputValues({ itemText: value });
	});

	return (
		<TaskModalChecklistAddItemFormWrapper>
			<TaskModalChecklistAddItemFormTextarea onChange={handleOnChange} placeholder={'Add text here'}/>
			<TaskModalChecklistAddItemFormFooter>
				<TaskModalChecklistAddItemFormButtonWrapper onClick={() => onClickAdd(taskId, inputValues)}>
					<Button name={'Add'}/>
				</TaskModalChecklistAddItemFormButtonWrapper>
				<IconCloseWrapper onClick={() => onClickClose()}>
					<Close/>
				</IconCloseWrapper>	
			</TaskModalChecklistAddItemFormFooter>
		</TaskModalChecklistAddItemFormWrapper>
	)
}

const TaskModalChecklistAddAnItemButtonWrapper = styled.div`
	display: flex;
	max-width: 182px;
`

interface ITaskModalChecklistAddAnItemButtonProps {
	onClick: () => void;
}

const TaskModalChecklistAddAnItemButton:React.FC<ITaskModalChecklistAddAnItemButtonProps> = props => {
	const { name, onClick } = props

	return (
		<TaskModalChecklistAddAnItemButtonWrapper onClick={() => onClick()}>
			<Button name={'Add an item'} />
		</TaskModalChecklistAddAnItemButtonWrapper>
	)
}
export default connect(
  null,
  mapDispatchToProps
)(TaskModal)
