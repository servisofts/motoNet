import { AppRegistry, LogBox } from "react-native";
import App from "./src/App";
import { name as appName } from "./package.json";
var regx = /Warning:*?React.state.update/
LogBox.ignoreLogs(['AsyncStorage', 'Animated:', 'VirtualizedList:', 'VirtualizedLists', "Animated.event", "Warning: Each child in a list ", "Invalid", "Require cycle", regx])
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
