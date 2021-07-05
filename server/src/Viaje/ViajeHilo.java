package Viaje;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import component.Viaje;
import conexion.Conexion;

public class ViajeHilo {
    
    private static HashMap<String, JSONObject> VIAJES_EN_CURSO = new HashMap<>();
    public static final int RADIO_BUSQUEDA = 10000;
    public static final int LIMITE = 10;

    public static void buscar(JSONObject objViaje) {
        Thread thread = new Thread() {
            @Override
            public void run() {
                JSONArray destinos = objViaje.getJSONArray("destinos");
                JSONObject destino_inicio = destinos.getJSONObject(0);

                JSONObject parametros = objViaje.getJSONObject("parametros");
                String radioDeBusqueda = parametros.getString("Distancia minima permitida para recibir viaje como conductor");
                JSONArray conductoresCercanos;
                try {
                    String consulta = "SELECT array_to_json(array_agg(calculo.*)) as json FROM (\n" + "SELECT \n" + "|/ (((" + destino_inicio.getDouble("latitude")
                            + " - ver.latitude) ^ 2) + ((" +  destino_inicio.getDouble("longitude") + " - ver.longitude) ^ 2)) AS resultado,\n" + "ver.*\n"
                            + "FROM conductor_activo ver) calculo\n" + "WHERE\n"
                            + "calculo.resultado <= ((0.000009) * (" + radioDeBusqueda + ")) limit "+LIMITE;
                     
                     conductoresCercanos =Conexion.ejecutarConsultaArray(consulta);
                     JSONObject objSend = new JSONObject();
                     objSend.put("component", "viaje");
                     objSend.put("type", "viajeEntrante");
                     objSend.put("data", objViaje);
                     objSend.put("estado", "exito");
                     
                     for (int i = 0; i < conductoresCercanos.length(); i++) {
                        SSServerAbstract.sendUser(objSend.toString(), conductoresCercanos.getJSONObject(i).getString("key_usuario"));
                        // SocketServer.sendUser(objSend.toString(), conductoresCercanos.getJSONObject(i).getString("key_usuario"));
                        JSONObject viajeMovimiento = Viaje.nuevoMovimientoViaje(objViaje.getString("key"), Viaje.TIPO_NOTIFICO_CONDUCTOR, conductoresCercanos.getJSONObject(i).getString("key_usuario"));
                    }
                    
                } catch (JSONException | SQLException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
           
            }
        };
        thread.start();

    }

    public class ViajeEnCurso{

        public ViajeEnCurso(){

        }
    }
}
