package Viaje;

import java.sql.SQLException;
import java.util.HashMap;

import org.json.JSONException;
import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import component.Viaje;

public class ViajeHilo {

    private static HashMap<String, BuscandoViaje> VIAJES_EN_CURSO = new HashMap<>();

    public static void buscar(JSONObject objViaje) {
        BuscandoViaje bv = new BuscandoViaje(objViaje);
        VIAJES_EN_CURSO.put(bv.getKey(), bv);
    }

    public static void removerViaje(String key) {
        VIAJES_EN_CURSO.remove(key);
    }

    public static void actualizarViaje(JSONObject objViaje) {
        VIAJES_EN_CURSO.get(objViaje.getString("key")).setViaje(objViaje);
    }

    public static void notificarLocationChange(JSONObject objConductor) {
        JSONObject viaje = objConductor.getJSONObject("viaje");

        objConductor.remove("viaje");
        JSONObject objSend = new JSONObject();
        objSend.put("component", "posicionConductor");
        objSend.put("type", "locationChange");
        objSend.put("data", objConductor);
        objSend.put("estado", "exito");
        SSServerAbstract.sendUser(objSend.toString(), viaje.getString("key_usuario"));

        try {
            JSONObject obj = Viaje.getViajeFormat(viaje.getString("key"));
            JSONObject movimientos = obj.getJSONObject("movimientos");
            if (!movimientos.has(Viaje.TIPO_CONDUCTOR_CERCA)) {
                
                JSONObject direccionInicio = obj.getJSONObject("direccion_inicio");
                double latitude_g = direccionInicio.getDouble("latitude");
                double longitude_g = direccionInicio.getDouble("longitude");
                double latitude_c = objConductor.getDouble("latitude");
                double longitude_c = objConductor.getDouble("longitude");
                double distancia = LatLng.distanciaCoord(latitude_g, longitude_g, latitude_c, longitude_c);
                if (distancia < 100) {
                    Viaje.nuevoMovimientoViaje(obj.getString("key"), Viaje.TIPO_CONDUCTOR_CERCA,
                            obj.getString("key_conductor"));
                    obj = Viaje.getViajeFormat(viaje.getString("key"));
                    JSONObject dataSend = new JSONObject();
                    dataSend.put("component", "viaje");
                    dataSend.put("type", "movimientos");
                    dataSend.put("estado", "exito");
                    dataSend.put("data", obj);
                    SSServerAbstract.sendUser(dataSend.toString(), obj.getString("key_usuario"));
                    SSServerAbstract.sendUser(dataSend.toString(), obj.getString("key_conductor"));
                }

            }
        } catch (JSONException | SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }

}
