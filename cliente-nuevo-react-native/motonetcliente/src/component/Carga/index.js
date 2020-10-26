import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

const Carga = (props) => {

    const [isRun, setIsRun] = React.useState(false);
    const [obj, setObj] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);

    const ShowPage = () => {
        return (
            <View>

            </View>
        );
    }
    if (redirect) {
        props.state.navigationReducer.replace(redirect);
        return <View />
    }

    if (obj) {
        if (props.state.usuarioReducer.estado === "cargando") {
            return <ShowPage />
        }
        if (props.state.cabeceraDatoReducer.estado === "cargando") {
            return <ShowPage />
        }
        if (props.state.socketClienteReducer.sessiones["motonet"].isOpen) {
            if (props.state.usuarioReducer.usuarioLog) {
                //registro
                var cabecera = "registro_cliente";
                if (!props.state.cabeceraDatoReducer.data[cabecera]) {
                    props.state.socketClienteReducer.sessiones["motonet"].send({
                        component: "cabeceraDato",
                        type: "getDatoCabecera",
                        estado: "cargando",
                        cabecera: cabecera
                    });
                    return <View />
                }
                if (!props.state.usuarioReducer.usuarioDatos) {
                    props.state.socketClienteReducer.sessiones["motonet"].send({                        
                        component: "usuario",
                        type: "getById",
                        key: props.state.usuarioReducer.usuarioLog.key,
                        cabecera: cabecera,
                        estado: "cargando"
                    }, true);
                    return <View />
                } else {
                    // var estados = false
                    // Object.keys(props.state.usuarioReducer.usuarioDatos).map((key) => {
                    //     var obj = props.state.usuarioReducer.usuarioDatos[key]
                    //     if (key === "Foto perfil") {
                    //         return <View />
                    //     }
                    //     if (obj.estado === 0) {
                    //         estados = true
                    //         return <View />
                    //     }
                    // })
                    // if (estados) {
                    //     props.state.usuarioReducer.estado = ""
                    //     setRedirect("EsperandoConfirmacionPage");                      
                    //     return <View />
                    // }
                    props.state.usuarioReducer.estado = ""
                    setRedirect("InicioPage");
                    return <View />;
                }
            } else {
                
                props.state.usuarioReducer.estado = ""
                setRedirect("LoginPage");
            }
            return <View />;
        }
        return <View />
    } else {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const yourFunction = async () => {
            await delay(1000);
            console.log("ms");
            setObj(true);
            return <View />;
        };

        AsyncStorage.getItem("motonet_usuarioLog").then((value) => {
            if (isRun) {
                return;
            }
            if (!value) {
                yourFunction();
                return;
            }
            if (value.length <= 0) {
                yourFunction();
                return;

            }
            props.state.usuarioReducer.usuarioLog = JSON.parse(value)
            yourFunction();
            if (!isRun) {
                setIsRun(true);
            }
        });
    }
    return (
        <ShowPage />
    );
}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Carga);