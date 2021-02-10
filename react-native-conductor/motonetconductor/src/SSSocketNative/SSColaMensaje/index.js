var DEBUG = true;
class SSColaMensaje {
    session;
    MENSAJES;
    constructor(session) {
        this.session = session;
        this.MENSAJES = [];
        Log("Iniciando cola de menjase....");
    }
    setMensaje(){
        
    }
}

const Log = (mensaje) => {
    if (DEBUG) {
        console.log("\x1b[34m" + "SSSocketNative::SSColaMensaje:: " + mensaje + "\x1b[39m");
    }
}
export default SSColaMensaje;