import {PermissionsAndroid} from "react-native";
export async function requestLocationPermission(callback) 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
    //   alert("You can use the location");
      callback(true);
    } else {
      console.log("location permission denied")
    //   alert("Location permission denied");
      callback(false);
    }
  } catch (err) {
    console.warn(err)
    callback(false);
  }
}
