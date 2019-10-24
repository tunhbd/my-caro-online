import React from 'react';
import { Provider } from 'react-redux';
import App from '../components/app';
import buildStore from '../store';

export default function AppContainer() {
  const store = buildStore();

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
