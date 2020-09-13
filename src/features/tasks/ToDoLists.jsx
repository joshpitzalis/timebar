import { Box } from 'grommet'
import React from 'react'
import { useFireColl } from '../../hooks/firebase'
import { ToDoItem } from './ToDoItem'

export const ToDoLists = ({ lists, dispatch }) => (
  <Box direction='row' wrap justify='between'>
    {lists &&
      lists.map((list, index) => (
        <List
          key={list.id}
          index={index}
          dispatch={dispatch}
          id={list.id}
          title={list.title}
          color={list.listColour}
        />
      ))}
  </Box>
)

export const List = ({ dispatch, id, title, index, color }) => {
  const tasks = useFireColl(`todoLists/${id}/tasks`)
  const activeTasks = tasks.filter(item => item.completed === false)
  const archivedTasks = tasks.filter(item => item.completed === true)
  const [archived, setArchived] = React.useState(true)
  const [full, setFull] = React.useState(tasks && archivedTasks.length > 5)

  return (
    <div
      className='dib ma1 w5 mt4 pointer'

      onClick={() =>
        dispatch({
          type: 'OPENED_TASK_LIST_EDITOR',
          payload: id
        })}
    >
      <div>
        <div className='h1 w1 br-100 dib mr3' style={{ backgroundColor: color }} />
        <h2 className='fw7 mb2 dib'>
          {title}
        </h2>
      </div>
      <ul
        className='list pl0 ml0 center mw5 bn h5 pv3 b--black-05'
        key={id}
        style={{ borderColor: color }}
      >
        {!full ? (
          <ShortTaskList
            setArchived={setArchived}
            tasks={tasks}
            activeTasks={activeTasks}
            index={index}
            id={id}
            color={color}
            setFull={setFull}
            archivedTasks={archivedTasks}
            archived={archived}
          />
        ) : (
          <LongTaskList
            setFull={setFull}
            tasks={tasks}
            activeTasks={activeTasks}
            index={index}
            id={id}
            color={color}
            setArchived={setArchived}
            archived={archived}
            archivedTasks={archivedTasks}
          />
        )}
      </ul>

      {/* <small
        onClick={() =>
          dispatch({
            type: 'OPENED_TASK_LIST_EDITOR',
            payload: id
          })}
        data-testid='editTaskList'
        className='pr3 dib pointer'
      >
        Edit
      </small> */}
    </div>
  )
}

const ShortTaskList = ({
  setArchived,
  tasks,
  activeTasks,
  index,
  id,
  color,
  setFull,
  archivedTasks,
  archived
}) => (
  <span
    onMouseLeave={() => setArchived(true)}
    className='flex flex-column justify-between h-100'
  >
    <div>
      {tasks &&
        activeTasks.slice(0, 5).map((task, indexx, array) => {
          const lastTask = indexx + 1 === array.length
          return (
            <ToDoItem
              index={index}
              task={task}
              lastTask={lastTask}
              key={task.id}
              listId={id}
              color={color}
            />
          )
        })}
    </div>
    {tasks && activeTasks.length > 5 ? (
      <div className='tc '>
        <small className='pointer pv3' onClick={() => setFull(true)}>
          {'Show More Tasks..'}
        </small>
      </div>
    ) : (
      archivedTasks.length > 0 && (
        <ShowArchivedTasks
          archivedTasks={archivedTasks}
          setArchived={setArchived}
          archived={archived}
        />
      )
    )}
    <ArchivedTasks
      archived={archived}
      tasks={tasks}
      archivedTasks={archivedTasks}
      index={index}
      id={id}
      color={color}
    />
  </span>
)

const LongTaskList = ({
  setFull,
  tasks,
  activeTasks,
  index,
  id,
  color,
  setArchived,
  archived,
  archivedTasks
}) => (
  <span onMouseLeave={() => setFull(false)}>
    {tasks &&
      activeTasks.map((task, indexx, array) => {
        const lastTask = indexx + 1 === array.length
        return (
          <ToDoItem
            index={index}
            task={task}
            lastTask={lastTask}
            key={task.id}
            listId={id}
            color={color}
          />
        )
      })}
    {tasks && archivedTasks.length > 0 && (
      <ShowArchivedTasks
        archivedTasks={archivedTasks}
        setArchived={setArchived}
        archived={archived}
      />
    )}
    <ArchivedTasks
      archived={archived}
      tasks={tasks}
      archivedTasks={archivedTasks}
      index={index}
      id={id}
      color={color}
    />
  </span>
)

const ArchivedTasks = ({ archived, tasks, archivedTasks, index, id, color }) =>
  !archived &&
  tasks &&
  archivedTasks.map((task, indexx, array) => {
    const lastTask = indexx + 1 === array.length
    return (
      <ToDoItem
        index={index}
        task={task}
        lastTask={lastTask}
        key={task.id}
        listId={id}
        color={color}
      />
    )
  })

const ShowArchivedTasks = ({ setArchived, archived }) => (
  <div className='tc '>
    <small
      className='pointer pv3'
      onClick={() => {
        archived ? setArchived(false) : setArchived(true)
      }}
    >
      {archived ? 'Show Archived Tasks' : 'Hide Archived Tasks'}
    </small>
  </div>
)
