import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';

export default function buildStore() {
  const store = createStore(
    reducers,
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools(applyMiddleware(ReduxThunk))
      : applyMiddleware(ReduxThunk)
  );

  return store;
}
