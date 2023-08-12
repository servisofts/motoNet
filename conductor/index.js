import { AppRegistry, LogBox } from "react-native";
import App from "./src/App";
import { name as appName } from "./package.json";

// LogBox.ignoreLogs(['AsyncStorage', 'Animated:', 'VirtualizedList:', 'VirtualizedLists', "Animated.event", "Warning: Each child in a list ", "Invalid", "Require cycle"])
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
