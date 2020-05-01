// Imports: Dependencies
import React from 'react';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers/index';
import Counter from './screens/Counter';

// new add by me
// asyncStoreage move to top
import {PersistGate} from 'redux-persist/es/integration/react'; //import persistGate from redux-persist integrate/react
import {persistStore, persistReducer} from 'redux-persist'; //import persistStore for given store and persistReducer for combine redux
import {createLogger} from 'redux-logger'; //for log every action

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['counterReducer', 'authReducer'],
};
const PersistReducer = persistReducer(persistConfig, rootReducer);

// end new add by me

const store = createStore(PersistReducer, applyMiddleware(createLogger()));

// add again here me
const PersistStore = persistStore(store);
// end add again here

export default (App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={PersistStore} loading={null}>
        <Counter />
      </PersistGate>
    </Provider>
  );
});
