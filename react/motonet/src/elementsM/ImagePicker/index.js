import ImagePicker from 'react-native-image-picker';
import myProps from '../../nativeSocket/myProps.json'
// More info on all the options is below in the API Reference... just some common use cases shown here
/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */
const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const ShowImagePicker = (props) => {


  const handleChange = (data) => {

    var body = new FormData();


    
      body.append("archibo", { uri: data.uri, name: 'image.png', type: 'image/jpeg' })
    


    body.append('type', "subirFoto");
    body.append('key', props.key);
    body.append('tipo', props.tipo);
    body.append('key_usuario', props.key_usuario);
    var myInit = {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    };
    props.respose(data);
    var myRequest = new Request(myProps.images.url, myInit);
    fetch(myRequest)
      .then(function (response) {
        console.log("ENTGROooooooooooooooo",response);
      }).catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
    
    
      

  }
  ImagePicker.showImagePicker(options, (response) => {

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const source = { uri: response.uri };

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };


      handleChange(source)



    }
  });
}




export default ShowImagePicker;