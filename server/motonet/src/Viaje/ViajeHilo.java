package Viaje;

import java.sql.SQLException;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;

import SocketServer.SocketServer;
import conexion.Conexion;

public class ViajeHilo {

    public static void buscar(JSONObject objViaje) {
        Thread thread = new Thread() {
            @Override
            public void run() {

                JSONObject objSend =  new JSONObject();
                objSend.put("component", "viaje");
                objSend.put("type", "viajeEntrante");
                objSend.put("data", objViaje);
                objSend.put("estado", "exito");


                
                SocketServer.sendUser(objSend.toString(), "a69b308e-50b2-4be2-bc07-fd0a9b0e55d0");
            }
        };
        thread.start();
    } 
    
}
