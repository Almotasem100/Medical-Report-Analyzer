/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import 'react-native-gesture-handler/Swipeable';
import React from 'react';
import Main from './components/mainComponent';
import { Provider } from 'react-redux';
import store from './redux/configureStore'; 

export default function App () {
  return (
    <Provider store={store}>
        <Main />
      </Provider>
  );
};


