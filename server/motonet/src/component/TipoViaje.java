package component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import conexion.*;
import Router.Router;
import SocketCliente.SocketCliete;
import SocketServer.SocketServer;
import Viaje.LatLng;
import Viaje.ViajeHilo;
import util.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class TipoViaje {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public TipoViaje(JSONObject data, Router router) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, router);
                break;
            case "registro":
                registro(data, router);
                break;
        }
    }

    public void getAll(JSONObject obj, Router router) {
        try {
            String consulta = "";
            consulta += "select array_to_json(array_agg(tipo_viaje.*)) as json \n";
            consulta += "from tipo_viaje";
            JSONArray tiposViajes = Conexion.ejecutarConsultaArray(consulta);
            obj.put("data", tiposViajes);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void registro(JSONObject obj, Router router) {
        JSONObject data = obj.getJSONObject("data");
        try {

            String key_usuario = obj.getString("key_usuario");
            JSONObject tipo_viaje = new JSONObject();
            tipo_viaje.put("key", UUID.randomUUID().toString());
            tipo_viaje.put("descripcion", data.getString("descripcion"));
            tipo_viaje.put("fecha_on", "now()");
            tipo_viaje.put("estado", 1);
            Conexion.insertArray("tipo_viaje", new JSONArray().put(tipo_viaje));
            obj.put("data", tipo_viaje);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            obj.put("estado", "error");
        }
       

    }

}