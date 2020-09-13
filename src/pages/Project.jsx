import Button from 'antd/lib/button'
import React, { useEffect } from 'react'
import { authState } from 'rxfire/auth'
import { Machine } from 'xstate'
import Chat from '../features/chat/Chat'
import { Stats } from '../features/goals'
import Tasks from '../features/tasks'
import Votes from '../features/votes'
import { useMachine } from '../hooks/useMachine'
import { app, googleAuthProvider } from '../utils/firebase'
import { Static } from '../features/static/index.jsx'

export const authMachine = Machine({
  id: 'auth',
  initial: 'loggedIn',
  states: {
    idle: {
      on: {
        LOGGED_IN: 'loggedIn',
        LOGGED_OUT: 'loggedOut'
      }
    },
    loggedOut: {
      on: {
        LOGGED_IN: 'loggedIn'
      }
    },
    loggedIn: {
      on: {
        LOGGED_OUT: {
          actions: (ctx, event) => event.payload,
          target: 'loggedOut'
        }
      }
    }
  }
})

const Project = () => {
  const [state, send] = useMachine(authMachine)
  useEffect(() => {
    const auth$ = authState(app.auth()).subscribe(user =>
      user ? send('LOGGED_IN') : send('LOGGED_OUT')
    )
    return () => {
      auth$.unsubscribe()
    };
  }, [send])
  return (
    <article>
      {state.matches('loggedIn') ? (
        <div className='tr mv3 mh5-ns'>
          <button
            type='button'
            className='f6 link dim  bn ph3 pv2 mb2 dib mid-gray bg-white'
            onClick={() =>
              send({ type: 'SIGNED_OUT', payload: app.auth().signOut() })}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className='tr'>
          <button
            type='button'
            className='f6 link dim  ba ph3 pv2 mb2 dib mid-gray bg-white'
            onClick={() => app.auth().signInWithPopup(googleAuthProvider)}
          >
            Signup/Login
          </button>
        </div>
      )}

      <Static />
      {/* <Stats /> */}

      {state.matches('loggedIn') && (
        <>
          {' '}
          <Tasks />
          {/* <Votes />
          <Chat /> */}
        </>
      )}
    </article>
  )
};

export default Project
