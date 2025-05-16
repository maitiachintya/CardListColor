/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import { store } from './src/redux/store/Store';
import { Provider } from 'react-redux';

LogBox.ignoreAllLogs();

const TaskRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => TaskRedux);
