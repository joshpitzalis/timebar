import { Box, Heading, Menu } from 'grommet'
import React from 'react'
import { useFireColl, useFireDoc } from '../../hooks/firebase'
import { firestore } from '../../utils/firebase'
import { EditableToDoItem } from './components/EditableToDoItem'
import { Todo } from './Todo'
import { randomColor } from 'randomcolor'
export const ListEditor = ({ dispatch, listId }) => {
  const tasks = useFireColl(`todoLists/${listId}/tasks`)
  const list = useFireDoc(`todoLists/${listId}`)

  const [title, setTitle] = React.useState('')
  const [todo, setTodo] = React.useState('')

  const createTodo = (todo, listId, listColour) => async e => {
    e.preventDefault()
    const newTask = await firestore
      .collection(`todoLists/${listId}/tasks`)
      .doc()

    await firestore.doc(`todoLists/${listId}/tasks/${newTask.id}`).set({
      title: todo,
      id: newTask.id,
      completed: false,
      createdOn: +new Date(),
      colour: randomColor({ hue: listColour }),
      size: 1,
      thisWeek: false
    })

    setTodo('')
  }

  const [editable, seteditable] = React.useState(false)

  return (
    <section data-testid='taskListEditor' className='pa3'>
      <div>
        {list && (
          editable
            ? <div>
              <input
                type='text'
                value={title || list.title}
                placeholder='List title goes here'
                className='dib'
                onChange={e => setTitle(e.target.value)}
                data-testid='titleInput'
              />
              <button
                className='dib'
                onClick={() => {
                  firestore.doc(`todoLists/${listId}`).update({
                    title: title || list.title
                  })
                  seteditable(false) 
}}
                data-testid='submitTodoList'
              >
          Save Name
              </button>
              <div className='h2 db' />
              <small
                className=' pointer red'
                onClick={() => {
                  dispatch({ type: 'EDITOR_MODAL_CLOSED' })
                  firestore.doc(`todoLists/${listId}`).delete()
                }}
              >
        Delete Entire List
              </small>
            </div>
            : <Box direction='row' align='center'>
              <button
                type='button' className='bn mr3 pointer'
                onClick={() => seteditable(true)}
              >✏️
              </button>
              <Heading margin='none' data-testid='title'>
                {list.title}
              </Heading>
            </Box>

        )}

      </div>
      <div className='h3' />
      {tasks.map(todo => (
        <Todo key={todo.id} todo={todo} id={todo.id} listId={listId} />
      ))}
      <div className='h3' />

      <EditableToDoItem
        submit={createTodo(todo, listId, list.listColour)}
        todo={todo}
        setTodo={setTodo}
      />

    </section>
  )
}
