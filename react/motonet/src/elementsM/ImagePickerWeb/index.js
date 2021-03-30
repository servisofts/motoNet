import React from 'react';
import { connect } from 'react-redux';
import myProps from '../../_nativeSocket/myProps.json'

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
    if ((encoded.length % 4) > 0) {
      encoded += '='.repeat(4 - (encoded.length % 4));
    }
    resolve(encoded);
  };
  reader.onerror = error => reject(error);
});


const ShowImagePicker = (props) => {
  const handleChange = (data) => {
    async function Main() {
      const file = data.target.files[0];
      const result = await toBase64(file).catch(e => Error(e));
      if (result instanceof Error) {
        console.log('Error: ', result.message);
        return;
      }
      props.state.imagePickerReducer.respose(result);
      props.state.imagePickerReducer.imagePicker(false);
    }
    Main();
  }
  return (
    <div style={{
      position: "fixed",
      width: "100%",
      height: "100vh",
      backgroundColor: "#00000044",
      zIndex: 999999,
      top: 0,
      left: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }} onClick={() => { props.state.imagePickerReducer.imagePicker(false); }}>

      <div style={{
        width: 500,
        maxWidth: "90%",
        height: "auto",
        backgroundColor: "#fff",
        borderRadius: 20,
        justifyContent: "center",
        alignContent: "center",
        zIndex: 999999,

      }}
        onClick={(evt) => { evt.stopPropagation() }}
      >
        <form id="formIn" method="POST" enctype="multipart/form-data">
          <input id="fileIn" type="file" name={"archibo"} hidden onChange={handleChange}></input>
          <input type="text" name={"type"} hidden value={"subirFoto"}></input>
        </form>

        <div onClick={(evt) => {
          document.getElementById("fileIn").click();
        }} id="init" >
          <div style={{
            backgroundColor: 'rgb(231, 51, 73) ',
            padding: 10,
            color: "#fff",
            flex: 1,
            borderRadius: 5,
            textAlign: 'center',
            margin: 10,
          }} >Seleccionar archivo</div>
        </div>
        <div onClick={props.init} id="init" >
          <div style={{
            backgroundColor: 'rgb(231, 51, 73) ',
            padding: 10,
            color: "#fff",
            flex: 1,
            borderRadius: 5,
            textAlign: 'center',
            margin: 10,
          }} >Camara</div>
        </div>
      </div>
    </div >
  )
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ShowImagePicker);