package component;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.Base64;
import java.util.UUID;

import conexion.*;
import util.FilesManager;
import Viaje.LatLng;
import Viaje.ViajeHilo;

import org.json.JSONArray;
import org.json.JSONException;
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
        System.out.println("VIAJE- " + data.getString("type"));
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
            case "denegarOferta":
                denegarOferta(data, session);
                break;
            case "getViajeByKeyUsuario":
                getViajeByKeyUsuario(data, session);
                break;
            case "conductorLlegoDestino":
                conductorLlegoDestino(data, session);
                break;
            case "finalizarViaje":
                finalizarViaje(data, session);
                break;
            case "iniciarViajeConductor":
                iniciarViajeConductor(data, session);
                break;
            case "calificar":
                calificar(data, session);
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
        viaje.put("key_usuario", data.getString("key_usuario"));
        viaje.put("key_tipo_viaje", data.getString("key_tipo_viaje"));
        viaje.put("fecha_on", "now()");
        viaje.put("estado", 1);
        viaje.put("tiempo", data.getDouble("tiempo"));
        viaje.put("distancia", data.getDouble("distancia"));
        viaje.put("monto_estimado", data.getDouble("monto_estimado"));
        try {
            Conexion.insertObject("viaje", viaje);
        } catch (Exception e) {
            obj.put("estado", "error");
            System.out.println("Error al insertar viaje");
            return;
        }
        // DESTINOS
        if (data.has("paquete")) {
            JSONObject paquete = data.getJSONObject("paquete");
            paquete.put("key", UUID.randomUUID().toString());
            paquete.put("key_viaje", viaje.getString("key"));
            paquete.put("fecha_on", "now()");
            paquete.put("estado", 1);
            try {
                byte[] foto = Base64.getDecoder().decode(paquete.getString("foto").getBytes("UTF-8"));
                FilesManager.guardar_file_type(foto, "foto.png", paquete.getString("key"), "paquete");
                paquete.put("foto", "foto.png");
            } catch (JSONException | IOException e) {
                System.out.println("Registro paquete sin foto");
            }
            try {
                Conexion.insertObject("viaje_paquete", paquete);
            } catch (Exception e) {
                obj.put("estado", "error");
                System.out.println("Error al insertar paquete");
                return;
            }
        }
        if (data.has("pedidos")) {
            JSONObject pedidos = data.getJSONObject("pedidos");
            for (String key : pedidos.keySet()) {
                JSONObject pedido = pedidos.getJSONObject(key);
                pedido.put("key", UUID.randomUUID().toString());
                pedido.put("key_viaje", viaje.getString("key"));
                pedido.put("fecha_on", "now()");
                pedido.put("estado", 1);
                try {
                    byte[] foto = Base64.getDecoder().decode(pedido.getString("foto").getBytes("UTF-8"));
                    FilesManager.guardar_file_type(foto, "foto.png", pedido.getString("key"), "pedido");
                    pedido.put("foto", "foto.png");

                } catch (JSONException | IOException e) {
                    System.out.println("Registro producto sin foto");
                }
                try {
                    Conexion.insertObject("pedido", pedido);
                } catch (Exception e) {
                    obj.put("estado", "error");
                    System.out.println("Error al insertar pedido");
                    return;
                }

            }
        }
        if (data.has("detalle_p1")) {
            JSONObject detalle = data.getJSONObject("detalle_p1");
            JSONObject detallep1 = new JSONObject();
            detallep1.put("key", UUID.randomUUID().toString());
            detallep1.put("key_viaje", viaje.getString("key"));
            detallep1.put("nombre", detalle.getString("nombre"));
            detallep1.put("telefono", detalle.getString("telefono"));
            detallep1.put("nota", detalle.getString("nota"));
            detallep1.put("fecha_on", "now()");
            detallep1.put("estado", 1);
            detallep1.put("tipo", "p1");
            try {
                Conexion.insertObject("viaje_detalle", detallep1);
            } catch (Exception e) {
                obj.put("estado", "error");
                System.out.println("Error al insertar detallep1");
                return;
            }
        }
        if (data.has("detalle_p2")) {
            JSONObject detalle = data.getJSONObject("detalle_p2");
            JSONObject detallep2 = new JSONObject();
            detallep2.put("key", UUID.randomUUID().toString());
            detallep2.put("key_viaje", viaje.getString("key"));
            detallep2.put("nombre", detalle.getString("nombre"));
            detallep2.put("telefono", detalle.getString("telefono"));
            detallep2.put("nota", detalle.getString("nota"));
            detallep2.put("fecha_on", "now()");
            detallep2.put("estado", 1);
            detallep2.put("tipo", "p2");
            try {
                Conexion.insertObject("viaje_detalle", detallep2);
            } catch (Exception e) {
                obj.put("estado", "error");
                System.out.println("Error al insertar detallep2");
                return;
            }
        }
        if (data.has("direccion_inicio")) {
            JSONObject dir = data.getJSONObject("direccion_inicio");
            JSONObject direccionInicio = new JSONObject();
            direccionInicio.put("key", UUID.randomUUID().toString());
            direccionInicio.put("direccion", dir.getString("direccion"));
            direccionInicio.put("latitude", dir.getDouble("latitude"));
            direccionInicio.put("longitude", dir.getDouble("longitude"));
            direccionInicio.put("fecha_on", "now()");
            direccionInicio.put("estado", 1);
            direccionInicio.put("tipo", "inicio");
            direccionInicio.put("key_viaje", viaje.getString("key"));
            try {
                Conexion.insertObject("direccion", direccionInicio);
            } catch (Exception e) {
                obj.put("estado", "error");
                System.out.println("Error al insertar direccion");
                return;
            }

        }
        if (data.has("direccion_fin")) {
            JSONObject dir = data.getJSONObject("direccion_fin");
            JSONObject direccionFin = new JSONObject();
            direccionFin.put("key", UUID.randomUUID().toString());
            direccionFin.put("direccion", dir.getString("direccion"));
            direccionFin.put("latitude", dir.getDouble("latitude"));
            direccionFin.put("longitude", dir.getDouble("longitude"));
            direccionFin.put("fecha_on", "now()");
            direccionFin.put("estado", 1);
            direccionFin.put("tipo", "fin");
            direccionFin.put("key_viaje", viaje.getString("key"));
            try {
                Conexion.insertObject("direccion", direccionFin);
            } catch (Exception e) {
                obj.put("estado", "error");
                System.out.println("Error al insertar direccion");
                return;
            }
        }
        try {
            JSONObject viajeMovimiento = nuevoMovimientoViaje(viaje.getString("key"), Viaje.TIPO_INICIO_BUSQUEDA,
                    viaje.getString("key_usuario"));
            nuevoCostoMovimiento(viajeMovimiento.getString("key"), viaje.getDouble("monto_estimado"));
            JSONObject viajeSend = getViajeAndDestinos(viaje.getString("key"));
            obj.put("data", viajeSend);
            ViajeHilo.buscar(viajeSend);
            obj.put("estado", "exito");

        } catch (JSONException | SQLException e) {
            e.printStackTrace();
        }

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
            String key_usuario = obj.getString("key_usuario");
            String key_viaje = obj.getString("key_viaje");
            // String key_conductor = obj.getString("key_conductor");
            // String key_movimiento = obj.getString("key_movimiento"); // AGREGAR EL KET
            // MOVIMIENTO ACEPTADO AL VIAJE

            JSONObject viaje = getViajeAndDestinos(key_viaje);

            if (viaje.getInt("estado") == 0) {
                obj.put("error", "viaje_cancelado");
                obj.put("estado", "error");
                return;
            }
            // if (viaje.getString("key_conductor").length() > 0) {
            // obj.put("error", "viaje_confirmado");
            // obj.put("estado", "error");
            // return;
            // }
            // Conexion.ejecutarUpdate(
            // "UPDATE viaje SET key_conductor = '" + key_conductor + "' WHERE key = '" +
            // key_viaje + "'");
            JSONObject viajeMovimiento = nuevoMovimientoViaje(key_viaje, Viaje.TIPO_INICIO_VIAJE, key_usuario);
            viaje = getViajeAndDestinos(key_viaje);
            // JSONObject objSend = new JSONObject();
            // objSend.put("component", "viaje");
            // objSend.put("type", "confirmarBusqueda");
            // objSend.put("data", viaje);
            // objSend.put("estado", "exito");
            // SocketServer.sendUser(objSend.toString(), viaje.getString("key_usuario"));
            obj.put("data", viaje);
            obj.put("estado", "exito");
            SSServerAbstract.sendUser(obj.toString(), viaje.getString("key_conductor"));

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
            if (!viaje.has("key_conductor")) {
                obj.put("error", "viaje_confirmado");
                obj.put("estado", "error");
                return;
            }
            Conexion.ejecutarUpdate(
                    "UPDATE viaje SET key_conductor = '" + key_usuario + "' WHERE key = '" + key_viaje + "'");
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
            ViajeHilo.actualizarViaje(viaje);
            obj.put("data", viaje);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
        }
    }

    public void denegarOferta(JSONObject obj, SSSessionAbstract session) {
        try {
            String key_usuario = obj.getString("key_usuario");
            String key_viaje = obj.getString("key_viaje");

            JSONObject viaje = getViajeAndDestinos(key_viaje);
            String key_conductor = viaje.getString("key_conductor");
            JSONObject movimiento = viaje.getJSONObject("movimientos").getJSONObject(TIPO_NEGOCIACION_CONDUCTOR);
            JSONObject movimiento2 = viaje.getJSONObject("movimientos").getJSONObject(TIPO_NOTIFICO_CONDUCTOR);
            if (movimiento != null) {
                Conexion.ejecutarUpdate(
                        "UPDATE viaje_movimiento SET estado = 0 WHERE key = '" + movimiento.getString("key") + "'");
            }
            if (movimiento2 != null) {
                Conexion.ejecutarUpdate(
                        "UPDATE viaje_movimiento SET estado = 0 WHERE key = '" + movimiento2.getString("key") + "'");
            }
            Conexion.ejecutarUpdate("UPDATE viaje SET key_conductor = '' WHERE key = '" + key_viaje + "'");
            // JSONObject viajeMovimiento = nuevoMovimientoViaje(key_viaje, Viaje.,
            // key_usuario);
            viaje = getViajeAndDestinos(key_viaje);
            JSONObject objSend = new JSONObject();
            objSend.put("component", "viaje");
            objSend.put("type", "denegarOferta");
            objSend.put("data", viaje);
            objSend.put("estado", "exito");
            SSServerAbstract.sendUser(objSend.toString(), key_conductor);
            obj.put("data", viaje);
            ViajeHilo.actualizarViaje(viaje);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
        }

    }

    public void cancelarBusqueda(JSONObject obj, SSSessionAbstract session) {
        try {

            String key_usuario = obj.getString("key_usuario");
            String key_viaje = obj.getString("key_viaje");
            JSONObject viajeMovimiento = nuevoMovimientoViaje(key_viaje, Viaje.TIPO_CANCELO_BUSQUEDA, key_usuario);
            Conexion.ejecutarUpdate("UPDATE viaje SET estado = 0 WHERE key = '" + key_viaje + "'");
            obj.put("estado", "exito");
        } catch (Exception e) {
            e.printStackTrace();
            obj.put("estado", "error");

        }

    }

    public void cancelarViajeCliente(JSONObject obj, SSSessionAbstract session) {
        try {

            String key_usuario = obj.getString("key_usuario");
            String key_viaje = obj.getString("key_viaje");
            JSONObject viajeMovimiento = nuevoMovimientoViaje(key_viaje, Viaje.TIPO_CANCELO_VIAJE, key_usuario);
            Conexion.ejecutarUpdate("UPDATE viaje SET estado = 0 WHERE key = '" + key_viaje + "'");
            JSONObject viaje = getViajeAndDestinos(key_viaje);
            obj.put("data", viaje);
            obj.put("estado", "exito");

            if (viaje.has("key_conductor")) {
                SSServerAbstract.sendUser(obj.toString(), viaje.getString("key_conductor"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            obj.put("estado", "error");

        }

    }

    public void conductorLlegoDestino(JSONObject obj, SSSessionAbstract session) {
        try {
            String key_usuario = obj.getString("key_usuario");
            String key_viaje = obj.getString("key_viaje");
            JSONObject viajeMovimiento = nuevoMovimientoViaje(key_viaje, Viaje.TIPO_CONDUCTOR_LLEGO, key_usuario);
            JSONObject viaje = getViajeAndDestinos(key_viaje);
            obj.put("data", viaje);
            obj.put("estado", "exito");

            JSONObject objSend = new JSONObject();
            objSend.put("component", "viaje");
            objSend.put("type", "movimientos");
            objSend.put("estado", "exito");
            objSend.put("data", viaje);
            SSServerAbstract.sendUser(objSend.toString(), viaje.getString("key_usuario"));
        } catch (Exception e) {
            e.printStackTrace();
            obj.put("estado", "error");

        }
    }

    public void iniciarViajeConductor(JSONObject obj, SSSessionAbstract session) {
        try {
            String key_usuario = obj.getString("key_usuario");
            String key_viaje = obj.getString("key_viaje");
            JSONObject viajeMovimiento = nuevoMovimientoViaje(key_viaje, Viaje.TIPO_INICIO_VIAJE_CONDUCTOR,
                    key_usuario);
            JSONObject viaje = getViajeAndDestinos(key_viaje);
            obj.put("data", viaje);
            obj.put("estado", "exito");
            JSONObject objSend = new JSONObject();
            objSend.put("component", "viaje");
            objSend.put("type", "movimientos");
            objSend.put("estado", "exito");
            objSend.put("data", viaje);
            SSServerAbstract.sendUser(objSend.toString(), viaje.getString("key_usuario"));
        } catch (Exception e) {
            e.printStackTrace();
            obj.put("estado", "error");

        }
    }

    public void finalizarViaje(JSONObject obj, SSSessionAbstract session) {
        try {
            String key_usuario = obj.getString("key_usuario");
            String key_viaje = obj.getString("key_viaje");
            JSONObject viajeMovimiento = nuevoMovimientoViaje(key_viaje, Viaje.TIPO_FINALIZAR_VIAJE, key_usuario);
            Conexion.ejecutarUpdate("UPDATE viaje SET estado = 0 WHERE key = '" + key_viaje + "'");
            JSONObject viaje = getViajeAndDestinos(key_viaje);
            obj.put("data", viaje);
            obj.put("estado", "exito");
            JSONObject objSend = new JSONObject();
            objSend.put("component", "viaje");
            objSend.put("type", "movimientos");
            objSend.put("estado", "exito");
            objSend.put("data", viaje);
            SSServerAbstract.sendUser(objSend.toString(), viaje.getString("key_usuario"));
        } catch (Exception e) {
            e.printStackTrace();
            obj.put("estado", "error");

        }
    }

    public void calificar(JSONObject obj, SSSessionAbstract session) {
        try {
            String key_usuario = obj.getString("key_usuario");
            String key_viaje = obj.getString("key_viaje");
            int calificacion = obj.getInt("calificacion");
            String sugerencia = obj.getString("sugerencia");
            JSONObject dataIn = new JSONObject();
            dataIn.put("key", UUID.randomUUID().toString());
            dataIn.put("key_viaje", key_viaje);
            dataIn.put("key_usuario", key_usuario);
            dataIn.put("calificacion", calificacion);
            dataIn.put("sugerencia", sugerencia);
            dataIn.put("estado", 1);
            dataIn.put("fecha_on", "now()");
            Conexion.insertObject("viaje_calificacion", dataIn);

            obj.put("data", dataIn);
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

    public static JSONObject getViajeFormat(String key) throws SQLException {

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
    public static final String TIPO_DENEGO_OFERTA = "denego_oferta";
    public static final String TIPO_SIN_CONDUCTOR = "sin_conductor";
    public static final String TIPO_INICIO_VIAJE = "inicio_viaje";
    public static final String TIPO_CONDUCTOR_CERCA = "conductor_cerca";
    public static final String TIPO_CONDUCTOR_LLEGO = "conductor_llego";
    public static final String TIPO_INICIO_VIAJE_CONDUCTOR = "inicio_viaje_conductor";
    public static final String TIPO_FINALIZAR_VIAJE = "finalizar_viaje";

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