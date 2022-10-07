package component;

import java.sql.SQLException;
import conexion.*;

import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;

public class HistorialViaje {

    public HistorialViaje(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
                break;
            case "getAllConductor":
                getAllConductor(data, session);
                break;
        }
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "";
            consulta += "select get_all_viaje_formateado() as json";
            JSONObject tiposViajes = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", tiposViajes);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void getAllConductor(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "";
            consulta += "select get_all_viaje_formateado_usuario('"+obj.getString("key_usuario")+"') as json";
            JSONObject tiposViajes = Conexion.ejecutarConsultaObject(consulta);
            obj.put("data", tiposViajes);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}