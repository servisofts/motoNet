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

public class TipoTarifa {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public TipoTarifa(JSONObject data, Router router) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, router);
                break;
            case "registro":
                registro(data, router);
                break;
            case "editarMontoTipoViaje":
                editarMontoTipoViaje(data, router);
                break;
        }
    }

    public void getAll(JSONObject obj, Router router) {
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

    public void registro(JSONObject obj, Router router) {
        JSONObject data = obj.getJSONObject("data");
        try {

            String key_usuario = obj.getString("key_usuario");
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
    public void editarMontoTipoViaje(JSONObject obj, Router router) {
        JSONObject data = obj.getJSONObject("data");
        try {
            String key_usuario = obj.getString("key_usuario");
            String key_tipo_viaje = obj.getString("key_tipo_viaje");
            JSONObject tipo_tarifa = obj.getJSONObject("tarifa");
            String key_tarifa = tipo_tarifa.getString("key");
            JSONObject tipo_viaje = new JSONObject();
            tipo_viaje.put("key", UUID.randomUUID().toString());
            tipo_viaje.put("monto", data.getDouble("monto"));
            tipo_viaje.put("key_tipo_viaje", key_tipo_viaje);
            tipo_viaje.put("key_tipo_tarifa", key_tarifa);
            tipo_viaje.put("fecha_on", "now()");
            tipo_viaje.put("estado", 1);

            Conexion.ejecutarUpdate(
                    "UPDATE tipo_viaje_tipo_tarifa SET estado = 0 where key_tipo_viaje = '" + key_tipo_viaje + "' and key_tipo_tarifa = '" + key_tarifa + "'");

            Conexion.insertArray("tipo_viaje_tipo_tarifa", new JSONArray().put(tipo_viaje));
            
            JSONObject tipo = new JSONObject();
            tipo.put(tipo_tarifa.getString("descripcion"), tipo_viaje);
            obj.put("data", tipo);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            obj.put("estado", "error");
        }

    }

}