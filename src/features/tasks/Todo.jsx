import React from 'react'
import { firestore } from '../../utils/firebase'

export const Todo = ({ todo, id, listId }) => {
  const [title, setTitle] = React.useState('')
  const [editable, setEditability] = React.useState(false)
  return (
    <div key={todo.id}>
      <div>
        {!editable && <input
          type='checkbox'
          value={todo.completed}
          onChange={() =>
            firestore.doc(`todoLists/${listId}/tasks/${id}`).update({
              completed: !todo.completed
            })}
                      />}

        {editable
          ? <div className='dib'>
            <input value={title} onChange={e => setTitle(e.target.value)} />
            <button
              onClick={() => {
                firestore.doc(`todoLists/${listId}/tasks/${id}`).update({
                  title
                })
                setEditability(false)
              }}
            >
          Update
            </button>

            <button
              className='ml4'
              onClick={() =>
                firestore.doc(`todoLists/${listId}/tasks/${id}`).delete()}
            >
          Destroy
            </button>
            </div>
          : <label>{` ${todo.title}`} <button
            type='button' className='bn mr3 pointer'
            onClick={() => setEditability(true)}
                                      >✏️
                                      </button>
            </label>}
        {!editable && <button
          class=' ml3 f6 button-reset bg-white bn b--black-10 dim pointer pv1 black-60' type='button' onClick={() => firestore.doc(`todoLists/${listId}/tasks/${id}`).update({
            thisWeek: !todo.thisWeek,
            size: 1
          })}
                      >{todo.thisWeek
            ? '- Remove from timebar'
            : '+ Add to timebar'}
                      </button>}

      </div>

    </div>
  )
}
