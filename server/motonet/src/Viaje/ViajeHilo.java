package Viaje;

import java.sql.SQLException;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import SocketServer.SocketServer;
import conexion.Conexion;

public class ViajeHilo {

    public static final int RADIO_BUSQUEDA = 10000;
    public static final int LIMITE = 10;

    public static void buscar(JSONObject objViaje) {
        Thread thread = new Thread() {
            @Override
            public void run() {
                JSONArray destinos = objViaje.getJSONArray("destinos");
                JSONObject destino_inicio = destinos.getJSONObject(0);
                JSONArray conductoresCercanos;
                try {
                    String consulta = "SELECT array_to_json(array_agg(calculo.*)) as json FROM (\n" + "SELECT \n" + "|/ (((" + destino_inicio.getDouble("latitude")
                            + " - ver.latitude) ^ 2) + ((" +  destino_inicio.getDouble("longitude") + " - ver.longitude) ^ 2)) AS resultado,\n" + "ver.*\n"
                            + "FROM conductor_activo ver) calculo\n" + "WHERE\n"
                            + "calculo.resultado <= ((0.000009) * (" + RADIO_BUSQUEDA + ")) limit "+LIMITE;
                     
                     conductoresCercanos =Conexion.ejecutarConsultaArray(consulta);
                     JSONObject objSend = new JSONObject();
                     objSend.put("component", "viaje");
                     objSend.put("type", "viajeEntrante");
                     objSend.put("data", objViaje);
                     objSend.put("estado", "exito");
                     
                     for (int i = 0; i < conductoresCercanos.length(); i++) {
                        SocketServer.sendUser(objSend.toString(), conductoresCercanos.getJSONObject(i).getString("key_usuario"));
                    }
                } catch (JSONException | SQLException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
           
            }
        };
        thread.start();
    }

}
