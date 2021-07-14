package component;

import java.sql.SQLException;
import java.util.UUID;
import conexion.*;
import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;
import Viaje.ViajeHilo;

public class BackgroundLocation {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public BackgroundLocation(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "registro":
                registro(data, session);
                break;
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        JSONObject data = obj.getJSONObject("data");
        try {
            // String consulta = "select to_json(conductor_activo.*) as json \n" + "from
            // conductor_activo \n"
            // + "where key_usuario = '" + obj.getString("key_usuario") + "'";
            String consulta = "SELECT to_json(sq.*) as json\n";
            consulta += "FROM (\n";
            consulta += "select conductor_activo.*,\n";
            consulta += "    (\n";
            consulta += "        select to_json(viaje.*) as viaje\n";
            consulta += "        from viaje\n";
            consulta += "        where viaje.key_conductor = conductor_activo.key_usuario\n";
            consulta += "        and viaje.estado = 1\n";
            consulta += "    ) as viaje\n";
            consulta += "from conductor_activo WHERE conductor_activo.key_usuario = '" + obj.getString("key_usuario")
                    + "'\n";
            consulta += ") sq";
            JSONObject conductorJson = Conexion.ejecutarConsultaObject(consulta);
            if (conductorJson.has("key")) {
                String consultaUpdate = "UPDATE conductor_activo SET \n" + "latitude = " + data.getDouble("latitude")
                        + ", \n" + "longitude = " + data.getDouble("longitude") + ", \n" + "deegre = "
                        + data.getDouble("deegre") + ", \n" + "fecha_on = now() \n" + " WHERE key = '"
                        + conductorJson.getString("key") + "'";
                Conexion.ejecutarUpdate(consultaUpdate);
                if (!conductorJson.isNull("viaje")) {
                    ViajeHilo.notificarLocationChange(conductorJson);
                }
            } else {
                JSONObject conductorActivo = new JSONObject();
                conductorActivo.put("key", UUID.randomUUID().toString());
                conductorActivo.put("key_usuario", obj.getString("key_usuario"));
                // conductorActivo.put("id_session", obj.getString("id"));
                conductorActivo.put("fecha_on", "now()");
                // conductorActivo.put("fecha_off", "");
                conductorActivo.put("latitude", data.getDouble("latitude"));
                conductorActivo.put("longitude", data.getDouble("longitude"));
                conductorActivo.put("deegre", data.getDouble("deegre"));
                Conexion.insertArray("conductor_activo", new JSONArray().put(conductorActivo));
            }
            obj.put("noSend", true);

        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }

}