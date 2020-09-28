package component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import conexion.*;
import Router.Router;
import SocketCliente.SocketCliete;
import SocketServer.SocketServer;
import util.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class BackgroundLocation {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public BackgroundLocation(JSONObject data, Router router) {
        switch (data.getString("type")) {
            case "registro":
                registro(data, router);
                break;
        }
    }

    public void registro(JSONObject obj, Router router) {
        JSONObject data = obj.getJSONObject("data");
        try {
            JSONObject conductorActivo = new JSONObject();
            conductorActivo.put("key", UUID.randomUUID().toString());
            conductorActivo.put("key_usuario", obj.getString("key_usuario"));
            conductorActivo.put("id_session", obj.getString("id"));
            conductorActivo.put("fecha_on", "now()");
            // conductorActivo.put("fecha_off", "");
            conductorActivo.put("lat", data.getDouble("latitude"));
            conductorActivo.put("lng", data.getDouble("longitude"));
            conductorActivo.put("deegre", data.getDouble("deegre"));
            Conexion.insertArray("conductor_activo", new JSONArray().put(conductorActivo));
            obj.put("noSend",true);
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }

}