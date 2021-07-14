package component;

import java.sql.SQLException;
import java.util.Date;
import java.util.UUID;
import conexion.*;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import org.json.JSONArray;
import org.json.JSONObject;

// import FireBase.FireBase;

public class Mensaje {

    // DATA TABLE = usuario
    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public Mensaje(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "enviar":
                enviar(data, session);
                break;
            case "getAllByViaje":
                getAllByViaje(data, session);
                break;
        }
    }

    public void enviar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject mensaje = obj.getJSONObject("data");
            mensaje.put("fecha_on", "now()");
            mensaje.put("estado", 1);
            Conexion.insertArray("mensaje", new JSONArray().put(mensaje));
            JSONObject movimiento = nuevo_movimiento(mensaje.getString("key"), TIPO_ENVIANDO);
            mensaje.put("movimiento", new JSONObject().put(movimiento.getString("tipo"), movimiento));
            obj.put("data", mensaje);
            obj.put("estado", "exito");
            SSServerAbstract.sendUser(obj.toString(), mensaje.getString("key_receptor"));
            // SSServerAbstract.sendUserFirebase(obj.toString(),mensaje.getString("key_receptor"));
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void getAllByViaje(JSONObject obj, SSSessionAbstract session) {
        try {
            String key_ref = obj.getString("key_viaje");
            JSONObject arr = Conexion.ejecutarConsultaObject("select mensaje_getallby_keyref('" + key_ref + "') as json");
            obj.put("data", arr);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static final String TIPO_ENVIANDO = "enviando";
    public static final String TIPO_LEIDO = "leido";
    public static final String TIPO_RECIVIDO = "recivido";

    public JSONObject nuevo_movimiento(String key_mensaje, String tipo_movimiento) {
        try {
            JSONObject mensaje_movimiento = new JSONObject();
            mensaje_movimiento.put("key", UUID.randomUUID().toString());
            mensaje_movimiento.put("fecha_on", "now()");
            mensaje_movimiento.put("estado", 1);
            mensaje_movimiento.put("key_mensaje", key_mensaje);
            mensaje_movimiento.put("tipo", tipo_movimiento);
            Conexion.insertArray("mensaje_movimiento", new JSONArray().put(mensaje_movimiento));
            return mensaje_movimiento;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new JSONObject();
    }
}