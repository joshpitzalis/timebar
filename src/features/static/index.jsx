import React from 'react'
import { firestore } from '../../utils/firebase'
import { Resizable } from 're-resizable'

export const Static = () => {
  const [tasks, setTasks] = React.useState([
    {
      id: 1,
      color: '#eee',
      size: 40
    }
  ])

  React.useEffect(() => {
    const thisWeekTasks = firestore.collectionGroup('tasks')
      .where('completed', '==', false)
      .where('thisWeek', '==', true)

    thisWeekTasks.onSnapshot(coll => {
      const allTasks = coll.docs.map(doc => {
        return { ...doc.data(), listId: doc.E_.path.segments[6] }
      })

      setTasks([...allTasks, {
        id: 3333,
        colour: '#eee',
        size: allTasks.reduce((accumulator, currentValue) => accumulator - currentValue.size, 40)
      }])
    })
    // return () => unsubscribe()
  }, [])

  return (
    <section className='cf ph0 pv5 flex w-100 overflow-hidden'>
      {tasks && tasks.map(task =>

        <Chunk task={task} key={task.id} />
      )}
    </section>
  )
}

const Chunk = ({ task }) => {
  const [size, setSize] = React.useState(null)
  const minutes = task.size * 60 + size
  const hours = Math.floor(minutes / 60)
  return (
    <Resizable
      defaultSize={{
        width: 0,
        height: 100
      }}
      enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
      onResize={(e, direction, ref, d) => setSize(d.width)}
      onResizeStop={() => {
        setSize(null)
        firestore.doc(`todoLists/${task.listId}/tasks/${task.id}`).update({
          size: minutes / 60
        })
      }}

      style={{ flexGrow: task.size, backgroundColor: task.colour }}
    >
      {size && `${task.title} : ${hours} hours ${minutes % 60} minutes`}
    </Resizable>
  )
}
