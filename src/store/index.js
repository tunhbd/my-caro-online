import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';

export default function buildStore() {
  const store = createStore(
    combineReducers(reducers),
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools(applyMiddleware(ReduxThunk))
      : applyMiddleware(ReduxThunk)
  );

  return store;
}
