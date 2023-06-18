/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';
import AppStart from './routes';

AppRegistry.registerComponent(appName, () => AppStart);
