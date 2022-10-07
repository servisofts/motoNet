package component;

import java.sql.SQLException;
import java.util.UUID;

import conexion.*;
import Server.SSSAbstract.SSSessionAbstract;
import org.json.JSONArray;
import org.json.JSONObject;

public class TipoTarifa {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public TipoTarifa(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
                break;
            case "registro":
                registro(data, session);
                break;
            case "editarMontoTipoViaje":
                editarMontoTipoViaje(data, session);
                break;
        }
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "";
            consulta += "select array_to_json(array_agg(tipo_tarifa.*)) as json \n";
            consulta += "from tipo_tarifa where estado = 1";
            JSONArray tiposViajes = Conexion.ejecutarConsultaArray(consulta);
            obj.put("data", tiposViajes);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        JSONObject data = obj.getJSONObject("data");
        try {

            // String key_usuario = obj.getString("key_usuario");
            JSONObject tipo_viaje = new JSONObject();
            tipo_viaje.put("key", UUID.randomUUID().toString());
            tipo_viaje.put("descripcion", data.getString("descripcion"));
            tipo_viaje.put("fecha_on", "now()");
            tipo_viaje.put("estado", 1);
            Conexion.insertArray("tipo_tarifa", new JSONArray().put(tipo_viaje));
            obj.put("data", tipo_viaje);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            obj.put("estado", "error");
        }

    }

    public void editarMontoTipoViaje(JSONObject obj, SSSessionAbstract session) {
        JSONObject data = obj.getJSONObject("data");
        try {
            // String key_usuario = obj.getString("key_usuario");
            String key_tipo_viaje = obj.getString("key_tipo_viaje");
            JSONObject tipo_tarifas = data.getJSONObject("tarifas");
            JSONArray arrToInsert = new JSONArray();
            tipo_tarifas.keySet().forEach(keyStr -> {
                JSONObject tarita_tv = (JSONObject) tipo_tarifas.get(keyStr);
                Conexion.ejecutarUpdate("UPDATE tipo_viaje_tipo_tarifa SET estado = 0 where key_tipo_viaje = '"
                        + key_tipo_viaje + "' and key_tipo_tarifa = '" + tarita_tv.getString("key_tipo_tarifa") + "'");

                JSONObject tipo_viaje = new JSONObject();
                tipo_viaje.put("key", UUID.randomUUID().toString());
                tipo_viaje.put("monto", tarita_tv.getDouble("monto"));
                tipo_viaje.put("key_tipo_viaje", key_tipo_viaje);
                tipo_viaje.put("key_tipo_tarifa", tarita_tv.getString("key_tipo_tarifa"));
                tipo_viaje.put("fecha_on", "now()");
                tipo_viaje.put("estado", 1);
                arrToInsert.put(tipo_viaje);
            });
            Conexion.insertArray("tipo_viaje_tipo_tarifa", arrToInsert);
            obj.put("estado", "exito");

        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            obj.put("estado", "error");
        }

    }

}