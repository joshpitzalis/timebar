import { Grommet } from 'grommet'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CommentsProvider from './context/CommentsContext'
import TaskProvider from './context/TasksContext'
import VoteProvider from './context/VoteContext'
import Discussions from './features/chat/Chat'
import Errors from './features/errors'
import NoMatch from './features/errors/NoMatch'
import Tasks from './features/tasks'
import Votes from './features/votes'
import './index.css'
import Projects from './pages/Project'
import * as serviceWorker from './serviceWorker'

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px'
    },
    colors: { brand: 'currentColor' }
  }
}

const Routes = () => (
  <Grommet theme={theme}>
    <BrowserRouter>
      <React.StrictMode>
        <Errors>
          <div className='sans-serif ph5 ba b--green bw4'>
            <Switch>
              <Route exact path='/' component={Projects} />
              <Route
                exact
                path='/discussion/:discussionId'
                component={Discussions}
              />
              <Route exact path='/task/:taskId' component={Tasks} />
              <Route exact path='/vote/:voteId' component={Votes} />
              <Route component={NoMatch} />
            </Switch>
            <div className='tc sans-serif fw1 ma3'>
              <small>Version 0.0.1</small>
            </div>
          </div>
        </Errors>
      </React.StrictMode>
    </BrowserRouter>
  </Grommet>
)

ReactDOM.render(
  <TaskProvider>
    <VoteProvider>
      <CommentsProvider>
        <Routes />
      </CommentsProvider>
    </VoteProvider>
  </TaskProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
