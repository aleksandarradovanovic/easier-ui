import { applyMiddleware, compose, createStore } from 'redux'
// import { asyncDispatchMiddleware } from './middleware/asynchronousDispatch'
// import createSagaMiddleware from 'redux-saga'
// import freeze from 'redux-freeze'
import { reducers } from './reducers/index'
// import {sagas} from './sagas/index'
import thunk from 'redux-thunk'
import { syncTranslationWithStore } from 'react-redux-i18n'
import {createBrowserHistory} from "history";

// add the middlewares
let middlewares = []

// add the router middleware

// add the saga middleware
// const sagaMiddleware = createSagaMiddleware()
// middlewares.push(sagaMiddleware)

// used in i18n
middlewares.push(thunk)
// used for scheduling a dispatch functions
// middlewares.push(asyncDispatchMiddleware)

// add the freeze dev middleware
// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(freeze)
// }

// apply the middleware
let middleware = applyMiddleware(...middlewares)

// add the redux dev tools
  middleware = compose(middleware,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// create the store
const store = createStore(reducers, middleware)
const history = createBrowserHistory();
// sagaMiddleware.run(sagas)

// used in i18n
syncTranslationWithStore(store)

// export
export { store, history }
