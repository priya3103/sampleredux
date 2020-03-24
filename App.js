
import React from 'react';
import { Provider } from 'react-redux';

import ListFilter from './screens/ListFilter';

import { store } from './store';

export default function App() {
  return (
    // Redux: Global Store
    <Provider store={store}>
      <ListFilter />
    </Provider>
  );
}