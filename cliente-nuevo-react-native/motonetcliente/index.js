import {AppRegistry,LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
console.disableYellowBox = true;
LogBox.ignoreLogs(['Warning:','Animated:','VirtualizedList:','VirtualizedLists'])
AppRegistry.registerComponent(appName, () => App);
