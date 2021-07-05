package component;

import java.sql.SQLException;
import java.util.UUID;
import conexion.*;
import org.json.JSONArray;
import org.json.JSONObject;
import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;

public class Asociacion {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public Asociacion(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
                break;
            case "registro":
                registro(data, session);
                break;
            case "subirFoto":
                subirFoto(data, session);
                break;
            case "eliminar":
                eliminar(data, session);
                break;
        }
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "";
            consulta += "select array_to_json(array_agg(asociacion_moto.*)) as json \n";
            consulta += "from asociacion_moto where estado = 1";
            JSONArray tiposViajes = Conexion.ejecutarConsultaArray(consulta);
            obj.put("data", tiposViajes);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        //JSONObject data = obj.getJSONObject("data");
        try {

            // String key_usuario = obj.getString("key_usuario");
            JSONObject dataIn = obj.getJSONObject("data");
            dataIn.put("key", UUID.randomUUID().toString());
            // dataIn.put("key_encargado", obj.getString("key_encargado"));
            // dataIn.put("descripcion", obj.getString("descripcion"));
            // dataIn.put("direccion", obj.getString("direccion"));
            dataIn.put("fecha_on", "now()");
            dataIn.put("estado", 1);
            Conexion.insertArray("asociacion_moto", new JSONArray().put(dataIn));
            obj.put("data", dataIn);
            obj.put("estado", "exito");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            obj.put("estado", "error");
        }

    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        try {

            //String b64 = obj.getString("data");
            String key = UUID.randomUUID().toString();
            String key_usuario = obj.getString("key_usuario");
            //byte[] foto = Base64.getDecoder().decode(b64.getBytes("UTF-8"));
            //String url = FilesManager.guardar_file_type(foto, "publicidad.png", key, "url_publicidad");
            JSONObject especialidad = new JSONObject();
            especialidad.put("key", key);
            especialidad.put("fecha_on", "now()");
            especialidad.put("key_usuario", key_usuario);
            especialidad.put("estado", 1);
            Conexion.insertArray("publicidad", new JSONArray().put(especialidad));
            obj.put("data", especialidad);
            obj.put("estado", "exito");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());

        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            obj.put("estado", "error");
        }

    }

    public void eliminar(JSONObject obj, SSSessionAbstract session) {
        try {

            String key = obj.getString("key");
            //String key_usuario = obj.getString("key_usuario");
            Conexion.ejecutarUpdate("UPDATE publicidad SET estado = 0 WHERE key = '"+ key + "'");
            // obj.put("data", "");
            obj.put("estado", "exito");
            SSServerAbstract.sendServer(SSServerAbstract.TIPO_SOCKET_WEB, obj.toString());
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            obj.put("estado", "error");
        }

    }
}