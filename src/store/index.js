import { createStore } from 'redux';
import reducers from '../reducers';

export default function buildStore() {
  const store = createStore(reducers);

  return store;
}
