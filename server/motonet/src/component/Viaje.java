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

public class Viaje {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public Viaje(JSONObject data, Router router) {
        switch (data.getString("type")) {
            case "buscar":
                buscar(data, router);
                break;
            case "cancelarBusqueda":
                cancelarBusqueda(data, router);
                break;
            case "confirmarBusqueda":
                confirmarBusqueda(data, router);
                break;
        }
    }

    public void buscar(JSONObject obj, Router router) {
        JSONObject data = obj.getJSONObject("data");
        try {
            JSONObject objViaje = new JSONObject();
            objViaje.put("key", UUID.randomUUID().toString());
            objViaje.put("key_usuario", obj.getString("key_usuario"));
            objViaje.put("key_tipo_viaje", obj.getString("key_tipo_viaje"));
            objViaje.put("estado", 1);
            objViaje.put("fecha_on", "now()");

            Conexion.insertArray("viaje", new JSONArray().put(objViaje));

            JSONArray destinos = data.getJSONArray("destinos");

            JSONObject destinoTemp;
            int radioEnMetros = 10;
            for (int i = 0; i < destinos.length(); i++) {
                destinoTemp = destinos.getJSONObject(i);
                JSONObject destinoObj = LatLng.buscarLatLng(destinoTemp.getDouble("latitude"),
                        destinoTemp.getDouble("longitude"), radioEnMetros, "latlng");
                if (!destinoObj.has("key")) {
                    // NO SE ENCONTRO UN DESTINO SIMILAR A #radioMetros DE DISTANCIA
                    destinoObj.put("key", UUID.randomUUID().toString());
                    destinoObj.put("direccion", destinoTemp.getString("direccion"));
                    destinoObj.put("latitude", destinoTemp.getDouble("latitude"));
                    destinoObj.put("longitude", destinoTemp.getDouble("longitude"));
                    destinoObj.put("fecha_on", "now()");
                    destinoObj.put("estado", 1);
                    Conexion.insertArray("latlng", new JSONArray().put(destinoObj));
                }
                JSONObject latlng_viaje = new JSONObject();
                latlng_viaje.put("key", UUID.randomUUID().toString());
                latlng_viaje.put("key_viaje", objViaje.getString("key"));
                latlng_viaje.put("key_latlng", destinoObj.getString("key"));
                latlng_viaje.put("index", destinoTemp.getInt("index"));
                latlng_viaje.put("fecha_on", "now()");
                latlng_viaje.put("estado", 1);
                Conexion.insertArray("latlng_viaje", new JSONArray().put(latlng_viaje));
            }
            JSONObject viajeMovimiento = nuevoMovimientoViaje(objViaje.getString("key"), Viaje.TIPO_INICIO_BUSQUEDA,
                    objViaje.getString("key_usuario"));
            JSONObject vieajeFormateado = getViajeAndDestinos(objViaje.getString("key"));
            ViajeHilo.buscar(vieajeFormateado);
            obj.put("data", vieajeFormateado);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void confirmarBusqueda(JSONObject obj, Router router) {
        try {
            String key_usuario = obj.getString("key_usuario");
            String key_viaje = obj.getString("key_viaje");
            JSONObject viajeMovimiento = nuevoMovimientoViaje(key_viaje, Viaje.TIPO_ACEPTO_CONDUCTOR, key_usuario);
            JSONObject viaje = getViajeAndDestinos(key_viaje);
       
            if (viaje.getInt("estado")==0) {
                obj.put("error", "viaje_cancelado");
                obj.put("estado", "error");
                return;
            }
            if (viaje.has("key_conductor")) {
                obj.put("error", "viaje_confirmado");
                obj.put("estado", "error");
                return;
            }
            Conexion.ejecutarUpdate(
                    "UPDATE viaje SET key_conductor = '" + key_usuario + "' WHERE key = '" + key_viaje + "'");
            viaje.put("key_conductor", key_usuario);
            JSONObject objSend = new JSONObject();
            objSend.put("component", "viaje");
            objSend.put("type", "confirmarBusqueda");
            objSend.put("data", viaje);
            objSend.put("estado", "exito");
            SocketServer.sendUser(objSend.toString(), viaje.getString("key_usuario"));
            obj.put("data", viaje);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
        }

    }

    public void cancelarBusqueda(JSONObject obj, Router router) {
        try {

            String key_usuario = obj.getString("key_usuario");
            String key_viaje = obj.getString("key_viaje");
            JSONObject viajeMovimiento = nuevoMovimientoViaje(key_viaje, Viaje.TIPO_CANCELO_BUSQUEDA, key_usuario);
            Conexion.ejecutarUpdate("UPDATE viaje SET estado = 0 WHERE key = '" + key_viaje + "'");
            obj.put("estado", "exito");
        } catch (SQLException e) {
            e.printStackTrace();
            obj.put("estado", "error");

        }

    }

    public JSONObject getViajeAndDestinos(String key) throws SQLException {

        String consulta = "";
        consulta += "SELECT\n";
        consulta += "to_json(rsfinal.*) as json\n";
        consulta += "FROM (\n";
        consulta += "    SELECT\n";
        consulta += "        viaje.*,\n";
        consulta += "        json_agg(to_json(latlng.*)) AS destinos,\n";
        consulta += "(SELECT\n";
        consulta += "        array_to_json(array_agg(viaje_movimiento.*))\n";
        consulta += "    FROM\n";
        consulta += "        viaje_movimiento\n";
        consulta += "    WHERE\n";
        consulta += "        viaje_movimiento.key_viaje = viaje.key ) AS movimientos\n";
        consulta += "    FROM\n";
        consulta += "        viaje,\n";
        consulta += "        (\n";
        consulta += "            SELECT\n";
        consulta += "                latlng.*,\n";
        consulta += "                latlng_viaje.index,\n";
        consulta += "                latlng_viaje.key_viaje\n";
        consulta += "            FROM\n";
        consulta += "                latlng_viaje,\n";
        consulta += "                latlng\n";
        consulta += "            WHERE\n";
        consulta += "                latlng_viaje.key_latlng = latlng.key\n";
        consulta += "            ORDER BY\n";
        consulta += "                (latlng_viaje.index) ASC) latlng\n";
        consulta += "        WHERE\n";
        consulta += "            viaje.key = '" + key + "'\n";
        consulta += "            AND latlng.key_viaje = viaje.key\n";
        consulta += "        GROUP BY\n";
        consulta += "            viaje.key) rsfinal";
        return Conexion.ejecutarConsultaObject(consulta);
    }

    public static final String TIPO_INICIO_BUSQUEDA = "inicio_busqueda";
    public static final String TIPO_CANCELO_BUSQUEDA = "cancelo_busqueda";
    public static final String TIPO_NOTIFICO_CONDUCTOR = "notifico_conductor";
    public static final String TIPO_ACEPTO_CONDUCTOR = "acepto_conductor";
    public static final String TIPO_INICIO_VIAJE = "inicio_viaje";

    public JSONObject nuevoMovimientoViaje(String key_viaje, String tipo, String key_referencia) throws SQLException {
        JSONObject viaje_movimiento = new JSONObject();
        viaje_movimiento.put("key", UUID.randomUUID().toString());
        viaje_movimiento.put("key_viaje", key_viaje);
        viaje_movimiento.put("tipo", tipo);
        viaje_movimiento.put("key_referencia", key_referencia);
        viaje_movimiento.put("fecha_on", "now()");
        viaje_movimiento.put("estado", 1);
        Conexion.insertArray("viaje_movimiento", new JSONArray().put(viaje_movimiento));
        return viaje_movimiento;

    }
}