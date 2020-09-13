import React from 'react'

export const EditableToDoItem = ({ submit, todo, setTodo }) => {
  const [editable, setEditability] = React.useState(false)
  return (
    <div>
      {editable === false ? (
        <button
          type='button'
          className='f6 link dim bn ph3 pv2 mb2 dib white bg-green pointer'
          onClick={() => setEditability(true)}
        >
          Add a to-do
        </button>
      ) : (
        <form onSubmit={submit}>
          <input
            type='text'
            value={todo}
            onChange={e => setTodo(e.target.value)}
            data-testid='taskInput'
          />
          <input type='submit' value='add todo' data-testid='addToDo' />
        </form>
      )}
    </div>
  )
}
