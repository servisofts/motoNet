package Component;

import org.json.JSONArray;
import org.json.JSONObject;

import Servisofts.SPG;
import Servisofts.SPGConect;
import Servisofts.SUtil;
import model.viaje.Viaje;
import Server.SSSAbstract.SSSessionAbstract;

public class viaje {
    public static final String COMPONENT = "viaje";
    public static final String VIEW = "view_viaje";

    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        switch (obj.getString("type")) {
            case "getAll":
                getAll(obj, session);
                break;
            case "getByKey":
                getByKey(obj, session);
                break;
            case "getActivo":
                getActivo(obj, session);
                break;
            case "action":
                action(obj, session);
                break;
        }
    }

    public static void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_all('" + VIEW + "') as json";
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
            String consulta = "select get_by_key('" + VIEW + "', '" + obj.getString("key") + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
            e.printStackTrace();
        }
    }

    public static void getActivo(JSONObject obj, SSSessionAbstract session) {
        try {
            String key_usuario = obj.getString("key_usuario");
            JSONObject data = SPG.single_object(VIEW, "estado > 0", "key_usuario = '" + key_usuario + "'");
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
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
