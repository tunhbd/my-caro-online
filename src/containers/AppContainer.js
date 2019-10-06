import React from 'react';
import { Provider } from 'react-redux';
import App from '../components/App/App';

export default function AppContainer() {
  return (
    <Provider>
      <App />
    </Provider>
  );
}
