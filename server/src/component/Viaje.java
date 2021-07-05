package component;

import java.sql.SQLException;
import java.util.UUID;

import conexion.*;
import Viaje.LatLng;
import Viaje.ViajeHilo;

import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;

public class Viaje {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public Viaje(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "buscar":
                buscar(data, session);
                break;
            case "cancelarBusqueda":
                cancelarBusqueda(data, session);
                break;
            case "cancelarBusquedaConductor":
                cancelarBusquedaConductor(data, session);
                break;
            case "cancelarViajeCliente":
                cancelarViajeCliente(data, session);
                break;
            case "confirmarBusqueda":
                confirmarBusqueda(data, session);
                break;
            case "negociarViajeConductor":
                negociarViajeConductor(data, session);
                break;
            case "getViajeByKeyUsuario":
                getViajeByKeyUsuario(data, session);
                break;
        }
    }

    public void getViajeByKeyUsuario(JSONObject obj, SSSessionAbstract session) {
        try {

            String key_usuario = obj.getString("key_usuario");
            String consulta = "";
            consulta += "select to_json(viaje.*) as json\n";
            consulta += "from viaje\n";
            consulta += "where estado = 1\n";
            consulta += "AND (key_usuario = '" + key_usuario + "'\n";
            consulta += "OR key_conductor = '" + key_usuario + "')\n";
            consulta += "LIMIT 1\n";
            JSONObject viajeActual = Conexion.ejecutarConsultaObject(consulta);
            if (viajeActual.has("key")) {
                JSONObject viaje = getViajeAndDestinos(viajeActual.getString("key"));
                obj.put("data", viaje);
            } else {
                obj.put("data", false);
            }
            obj.put("estado", "exito");
        } catch (SQLException e) {
            e.printStackTrace();
            obj.put("estado", "error");

        }

    }

    public void buscar(JSONObject obj, SSSessionAbstract session) {
        JSONObject data = obj.getJSONObject("data");

        JSONObject viaje = new JSONObject();
        viaje.put("key", UUID.randomUUID().toString());
        

    }

    public void buscar1(JSONObject obj, SSSessionAbstract session) {
        JSONObject data = obj.getJSONObject("data");
        try {
            JSONObject objViaje = new JSONObject();
            objViaje.put("key", UUID.randomUUID().toString());
            objViaje.put("key_usuario", obj.getString("key_usuario"));
            objViaje.put("key_tipo_viaje", obj.getString("key_tipo_viaje"));
            objViaje.put("key_conductor", "");
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
            /// CALCULO E INSERTO EL PRECIO AL MOVIMIENTO INICIO BUSQUEDA
            JSONObject viajeMovimiento = nuevoMovimientoViaje(objViaje.getString("key"), Viaje.TIPO_INICIO_BUSQUEDA,
                    objViaje.getString("key_usuario"));
            nuevoCostoMovimiento(viajeMovimiento.getString("key"), 10);
            JSONObject vieajeFormateado = getViajeAndDestinos(objViaje.getString("key"));
            ViajeHilo.buscar(vieajeFormateado);
            obj.put("data", vieajeFormateado);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void confirmarBusqueda(JSONObject obj, SSSessionAbstract session) {
        try {
            // String key_usuario = obj.getString("key_usuario");
            String key_viaje = obj.getString("key_viaje");
            String key_conductor = obj.getString("key_conductor");
            // String key_movimiento = obj.getString("key_movimiento"); // AGREGAR EL KET
            // MOVIMIENTO ACEPTADO AL VIAJE

            JSONObject viaje = getViajeAndDestinos(key_viaje);

            if (viaje.getInt("estado") == 0) {
                obj.put("error", "viaje_cancelado");
                obj.put("estado", "error");
                return;
            }
            if (viaje.getString("key_conductor").length() > 0) {
                obj.put("error", "viaje_confirmado");
                obj.put("estado", "error");
                return;
            }
            Conexion.ejecutarUpdate(
                    "UPDATE viaje SET key_conductor = '" + key_conductor + "' WHERE key = '" + key_viaje + "'");
            // JSONObject viajeMovimiento = nuevoMovimientoViaje(key_viaje,
            // Viaje.TIPO_INICIO_VIAJE, key_usuario);
            viaje = getViajeAndDestinos(key_viaje);
            JSONObject objSend = new JSONObject();
            objSend.put("component", "viaje");
            objSend.put("type", "confirmarBusqueda");
            objSend.put("data", viaje);
            objSend.put("estado", "exito");
            SSServerAbstract.sendUser(objSend.toString(), key_conductor);
            // SocketServer.sendUser(objSend.toString(), viaje.getString("key_usuario"));
            obj.put("data", viaje);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
        }

    }

    public void negociarViajeConductor(JSONObject obj, SSSessionAbstract session) {
        try {
            String key_usuario = obj.getString("key_usuario");
            String key_viaje = obj.getString("key_viaje");
            double precio = obj.getDouble("costo");
            JSONObject viaje = getViajeAndDestinos(key_viaje);

            if (viaje.getInt("estado") == 0) {
                obj.put("error", "viaje_cancelado");
                obj.put("estado", "error");
                return;
            }
            if (viaje.getString("key_conductor").length() > 0) {
                obj.put("error", "viaje_confirmado");
                obj.put("estado", "error");
                return;
            }
            // Conexion.ejecutarUpdate(
            // "UPDATE viaje SET key_conductor = '" + key_usuario + "' WHERE key = '" +
            // key_viaje + "'");
            JSONObject viajeMovimiento = nuevoMovimientoViaje(key_viaje, Viaje.TIPO_NEGOCIACION_CONDUCTOR, key_usuario);
            nuevoCostoMovimiento(viajeMovimiento.getString("key"), precio);

            viaje = getViajeAndDestinos(key_viaje);
            JSONObject objSend = new JSONObject();
            objSend.put("component", "viaje");
            objSend.put("type", "negociarViajeConductor");
            objSend.put("data", viaje);
            objSend.put("estado", "exito");
            SSServerAbstract.sendUser(objSend.toString(), viaje.getString("key_usuario"));
            // SocketServer.sendUser(objSend.toString(), viaje.getString("key_usuario"));
            obj.put("data", viaje);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
        }

    }

    public void cancelarBusqueda(JSONObject obj, SSSessionAbstract session) {
        try {

            // String key_usuario = obj.getString("key_usuario");
            String key_viaje = obj.getString("key_viaje");
            // JSONObject viajeMovimiento = nuevoMovimientoViaje(key_viaje,
            // Viaje.TIPO_CANCELO_BUSQUEDA, key_usuario);
            Conexion.ejecutarUpdate("UPDATE viaje SET estado = 0 WHERE key = '" + key_viaje + "'");
            obj.put("estado", "exito");
        } catch (Exception e) {
            e.printStackTrace();
            obj.put("estado", "error");

        }

    }

    public void cancelarViajeCliente(JSONObject obj, SSSessionAbstract session) {
        try {

            // String key_usuario = obj.getString("key_usuario");
            String key_viaje = obj.getString("key_viaje");
            // JSONObject viajeMovimiento = nuevoMovimientoViaje(key_viaje,
            // Viaje.TIPO_CANCELO_VIAJE, key_usuario);
            Conexion.ejecutarUpdate("UPDATE viaje SET estado = 0 WHERE key = '" + key_viaje + "'");
            obj.put("estado", "exito");
        } catch (Exception e) {
            e.printStackTrace();
            obj.put("estado", "error");

        }

    }

    public void cancelarBusquedaConductor(JSONObject obj, SSSessionAbstract session) {
        try {

            // String key_usuario = obj.getString("key_usuario");
            // String key_viaje = obj.getString("key_viaje");
            // JSONObject viajeMovimiento = nuevoMovimientoViaje(key_viaje,
            // Viaje.TIPO_CANCELO_BUSQUEDA_CONDUCTOR,
            // key_usuario);

            // Conexion.ejecutarUpdate("UPDATE viaje SET estado = 0 WHERE key = '" +
            // key_viaje + "'");

            obj.put("estado", "exito");
        } catch (Exception e) {
            e.printStackTrace();
            obj.put("estado", "error");

        }

    }

    public JSONObject getViajeAndDestinos(String key) throws SQLException {

        String consulta = "select get_viaje_formateado('" + key + "') as json";
        return Conexion.ejecutarFuncionObject(consulta);
    }

    public static final String TIPO_INICIO_BUSQUEDA = "inicio_busqueda";
    public static final String TIPO_CANCELO_BUSQUEDA = "cancelo_busqueda";
    public static final String TIPO_CANCELO_BUSQUEDA_CONDUCTOR = "cancelo_busqueda_conductor";
    public static final String TIPO_CANCELO_VIAJE = "cancelo_viaje";
    public static final String TIPO_NOTIFICO_CONDUCTOR = "notifico_conductor";
    public static final String TIPO_NEGOCIACION_CONDUCTOR = "negociacion_conductor";
    public static final String TIPO_ACEPTO_CONDUCTOR = "acepto_conductor";
    public static final String TIPO_INICIO_VIAJE = "inicio_viaje";

    public static JSONObject nuevoMovimientoViaje(String key_viaje, String tipo, String key_referencia)
            throws SQLException {
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

    public static JSONObject nuevoCostoMovimiento(String key_viaje_movimiento, double monto) throws SQLException {
        JSONObject viaje_movimiento = new JSONObject();
        viaje_movimiento.put("key", UUID.randomUUID().toString());
        viaje_movimiento.put("key_viaje_movimiento", key_viaje_movimiento);
        viaje_movimiento.put("monto", monto);
        viaje_movimiento.put("fecha_on", "now()");
        viaje_movimiento.put("estado", 1);
        Conexion.insertArray("costo_viaje", new JSONArray().put(viaje_movimiento));
        return viaje_movimiento;

    }
}