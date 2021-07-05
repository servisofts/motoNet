package component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import conexion.*;
import Server.SSSAbstract.SSSessionAbstract;
import Viaje.LatLng;
import Viaje.ViajeHilo;
import util.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Rol {

    public Rol(JSONObject data,SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
                break;
            case "registro":
                registro(data, session);
                break;
            case "setPermiso":
                setPermiso(data, session);
                break;
            case "setRolUsuario":
                setRolUsuario(data, session);
                break;
            case "getAllRolUsuario":
                getAllRolUsuario(data, session);
                break;
        }
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "";
            consulta += "select array_to_json(array_agg(sq1.*)) as json \n";
            consulta += "from ( select rol.*, (SELECT jsonb_object_agg(permiso.path,to_json(permiso.*)) as json FROM permiso where permiso.key_rol = rol.key AND permiso.estado =1 group by(rol.key)) as permisos \n";
            consulta += "from rol where estado = 1) as sq1";
            JSONArray tipo_consulta = Conexion.ejecutarConsultaArray(consulta);
            obj.put("data", tipo_consulta);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            String key_usuario = obj.getString("key_usuario");
            JSONObject especialidad = new JSONObject();
            especialidad.put("key", UUID.randomUUID().toString());
            especialidad.put("nombre", obj.getString("nombre"));
            especialidad.put("key_usuario", key_usuario);
            especialidad.put("fecha_on", "now()");
            especialidad.put("estado", 1);
            Conexion.insertArray("rol", new JSONArray().put(especialidad));
            obj.put("data", especialidad);
            obj.put("estado", "exito");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            obj.put("estado", "error");
        }
    }

    public void setPermiso(JSONObject obj, SSSessionAbstract session) {
        try {
            String key_usuario = obj.getString("key_usuario");
            String key_rol = obj.getString("key_rol");
            String path = obj.getString("path");

            String consulta = "";
            consulta += "SELECT to_json(permiso.*) as json FROM permiso where permiso.key_rol = '" + key_rol
                    + "' AND permiso.path='" + path + "' AND permiso.estado =1 LIMIT 1\n";
            JSONObject permisoActivo = Conexion.ejecutarConsultaObject(consulta);
            if (permisoActivo.has("key")) {
                Conexion.ejecutarUpdate("UPDATE permiso SET estado = 0 WHERE permiso.key_rol = '" + key_rol
                        + "' AND permiso.path='" + path + "'");
                obj.put("data", "");
            } else {
                JSONObject especialidad = new JSONObject();
                especialidad.put("key", UUID.randomUUID().toString());
                especialidad.put("path", path);
                especialidad.put("key_usuario", key_usuario);
                especialidad.put("key_rol", key_rol);
                especialidad.put("fecha_on", "now()");
                especialidad.put("estado", 1);
                Conexion.insertArray("permiso", new JSONArray().put(especialidad));
                obj.put("data", especialidad);

            }
            obj.put("estado", "exito");

        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            obj.put("estado", "error");
        }
    }

    public void setRolUsuario(JSONObject obj, SSSessionAbstract session) {
        try {
            String key_usuario = obj.getString("key_usuario");
            String key_rol = obj.getString("key_rol");
            Conexion.ejecutarUpdate(
                    "UPDATE rol_usuario SET estado = 0 WHERE rol_usuario.key_usuario = '" + key_usuario + "'");
            JSONObject especialidad = new JSONObject();
            especialidad.put("key", UUID.randomUUID().toString());
            especialidad.put("key_usuario", key_usuario);
            especialidad.put("key_rol", key_rol);
            especialidad.put("fecha_on", "now()");
            especialidad.put("estado", 1);
            Conexion.insertArray("rol_usuario", new JSONArray().put(especialidad));
            obj.put("data", especialidad);
            obj.put("estado", "exito");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            obj.put("estado", "error");
        }
    }

    public void getAllRolUsuario(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "";
            consulta += "select array_to_json(array_agg(rol_usuario.*)) as json \n";
            consulta += "from rol_usuario where estado = 1";
            JSONArray tipo_consulta = Conexion.ejecutarConsultaArray(consulta);
            obj.put("data", tipo_consulta);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}