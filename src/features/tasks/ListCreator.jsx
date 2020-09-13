import React from 'react'
import { firestore } from '../../utils/firebase'
import { EditableToDoItem } from './components/EditableToDoItem'
import { randomColor } from 'randomcolor'

const createList = async (title, providedTitle, tasks, dispatch, listColour) => {
  try {
    const list = await firestore.collection('todoLists').doc()

    await firestore.doc(`todoLists/${list.id}`).set({
      title: title || providedTitle,
      id: list.id,
      createdOn: +new Date(),
      listColour
    })

    for (const task of tasks) {
      const newTask = await firestore
        .collection(`todoLists/${list.id}/tasks`)
        .doc()

      await firestore
        .doc(`todoLists/${list.id}/tasks/${newTask.id}`)
        .set({ ...task, id: newTask.id })
    }
    dispatch({
      type: 'LIST_CREATED'
    })
  } catch (error) {
    console.error('Error creating a list:', error)
  }
}

export const ListCreator = ({ dispatch, providedTitle = '' }) => {
  const [title, setTitle] = React.useState('')
  const [value, setValue] = React.useState('')
  const [tasks, setTasks] = React.useState([])
  const listColour = randomColor()
  const setItem = e => {
    e.preventDefault()
    setTasks([
      ...tasks,
      {
        title: value,
        createdOn: +new Date(),
        createdBy: 'Josh',
        completed: false,
        size: 1,
        colour: randomColor({ hue: listColour }),
        thisWeek: false
      }
    ])
    setValue('')
  }
  return (
    <section data-testid='taskListCreator'>
      <div>
        <input
          type='text'
          value={title || providedTitle}
          placeholder='Name this list...'
          className='db'
          onChange={e => setTitle(e.target.value)}
          data-testid='titleInput'
        />
      </div>
      <div className='h2' />
      <ul>{tasks && tasks.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul>
      <EditableToDoItem submit={setItem} todo={value} setTodo={setValue} />
      <div className='h2' />
      <button
        onClick={() => createList(title, providedTitle, tasks, dispatch, listColour)} data-testid='submitTodoList'
      >
        Save List
      </button>
    </section>
  )
}
