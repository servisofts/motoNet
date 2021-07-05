package component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import conexion.*;
import Viaje.LatLng;
import Viaje.ViajeHilo;
import util.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;


public class TipoViaje {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public TipoViaje(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
                break;
            case "registro":
                registro(data, session);
                break;
        }
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "";
            consulta += "select get_all_tipo_viaje() as json";
            JSONArray tiposViajes = Conexion.ejecutarConsultaArray(consulta);
            obj.put("data", tiposViajes);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
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