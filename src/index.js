import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'

import {router} from './router'

import { store } from './store.js'
import { Provider } from 'react-redux'
// import {App} from './App'

ReactDOM.render(
  <Provider store={store}>
  {router}
  </Provider>, document.getElementById('root'))
