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
                SocketServer.sendUser(objSend.toString(), "70597ea4-fa68-4792-8a5f-39225c2a36a8");
            }
        };
        thread.start();
    } 
    
}
