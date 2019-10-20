import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';

export default function buildStore() {
  const store = createStore(
    reducers,
    process.env.NODE_ENV === 'development' ? composeWithDevTools() : null
  );

  return store;
}
