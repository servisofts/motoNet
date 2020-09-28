package Viaje;

import org.json.JSONObject;

import SocketServer.SocketServer;

public class ViajeHilo {

    public static void buscar(JSONObject obj){
        Thread thread = new Thread() {
            @Override
            public void run() {
                JSONObject objSend =  new JSONObject();
                objSend.put("component", "viaje");
                objSend.put("type", "viajeEntrante");
                objSend.put("data", obj);
                objSend.put("estado", "exito");
                SocketServer.sendUser(objSend.toString(), "1eab302f-5e84-41b2-bfca-7852eb52fc4a");
            }
        };
        thread.start();
    } 
    
}
