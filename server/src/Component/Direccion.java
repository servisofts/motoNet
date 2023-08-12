package Component;

import org.json.JSONObject;

import Servisofts.SPG;
import Servisofts.SPGConect;
import Servisofts.SUtil;
import model.viaje.Viaje;
import Server.SSSAbstract.SSSessionAbstract;

public class Direccion {
    public static final String COMPONENT = "direccion";

    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        switch (obj.getString("type")) {
            case "getAll":
                getAll(obj, session);
                break;
            case "getByKey":
                getByKey(obj, session);
                break;
            case "action":
                action(obj, session);
                break;
        }
    }

    public static void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_all('" + COMPONENT + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
            e.printStackTrace();
        }
    }

    public static void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_by_key('" + COMPONENT + "', '" + obj.getString("key") + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
            e.printStackTrace();
        }
    }
    public static JSONObject getByKey(String key) {
        try {
            String consulta = "select get_by_key('" + COMPONENT + "', '" + key + "') as json";
            return SPGConect.ejecutarConsultaObject(consulta);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static JSONObject getDireccion(String key_viaje){
        try {
            String consulta = "select get_direccion('" + key_viaje + "') as json";
            return SPGConect.ejecutarConsultaObject(consulta);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void conductorLlego(String key_direccion){
        try {
            JSONObject direccion = getByKey(key_direccion);
            direccion.put("fecha_conductor_llego", SUtil.now());
            SPGConect.editObject(COMPONENT, direccion);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void action(JSONObject obj, SSSessionAbstract session) {
        try {
            String key = SUtil.uuid();
            if (!obj.isNull("key_viaje")) {
                if (obj.getString("key_viaje").length() > 0) {
                    key = obj.getString("key_viaje");
                }
            }
            Viaje objViaje = Viaje.getInstance(key);
            objViaje.action(obj);
            obj.put("data", objViaje.toJson());
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
            e.printStackTrace();
        }
    }

}
