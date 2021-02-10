*******SSSockNative************

//--> en /App.js

//Importar
import * as SSSocketNative from './src/SSSocketNative'
import BarraDeDesconeccion from './src/SSSocketNative/BarraDeDesconeccion';
import AlertaDesconectado from './src/SSSocketNative/AlertaDesconectado';


//Luego de iniciar el STORE
SSSocketNative.init(store);

//En el componentDidMount
SSSocketNative.init(store);

//Dentro de el render
    <BarraDeDesconeccion socketName={"Nombre del socket"} />
     <AlertaDesconectado socketName={"clinica_nj"} />


//--> en /src/Pages/index.js
//Importar
import SessionSocketPage from '../SSSocketNative/SessionSocketPage'

export const getPages = () => {
      return {
        ...,
-->ESTA LINEA --> SessionSocketPage   
    }
}     