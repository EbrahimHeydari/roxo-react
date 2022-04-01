import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

const rootReducer = combineReducers({
  counterState: counterReducer,
  resultsState: resultReducer
})


const logger = store => {
  return next => {
    return action => {
      console.log('middleware Dispatching',action )
      const result = next(action)
      console.log('middleware next state', store.getState())
      return result;
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
