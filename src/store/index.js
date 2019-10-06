import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';

export default function buildStore() {
  const store = createStore(reducers, composeWithDevTools());

  return store;
}
