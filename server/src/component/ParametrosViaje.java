package component;

import java.sql.SQLException;
import java.util.UUID;
import conexion.*;
import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;

public class ParametrosViaje {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public ParametrosViaje(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
                break;
            case "registro":
                registro(data, session);
                break;
        }
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "";
            consulta += "select array_to_json(array_agg(parametros_viaje.*)) as json \n";
            consulta += "from parametros_viaje";
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

            //String key_usuario = obj.getString("key_usuario");
            JSONObject tipo_viaje = new JSONObject();
            tipo_viaje.put("key", UUID.randomUUID().toString());
            tipo_viaje.put("descripcion", data.getString("descripcion"));
            tipo_viaje.put("valor", data.getString("valor"));
            tipo_viaje.put("medida", data.getString("medida"));
            tipo_viaje.put("fecha_on", "now()");
            tipo_viaje.put("estado", 1);
            Conexion.insertArray("parametros_viaje", new JSONArray().put(tipo_viaje));
            obj.put("data", tipo_viaje);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            obj.put("estado", "error");
        }
       

    }

}