package Component;

import org.json.JSONArray;
import org.json.JSONObject;

import Servisofts.SPG;
import Servisofts.SPGConect;
import Servisofts.SUtil;
import Server.SSSAbstract.SSSessionAbstract;

public class background_location {
    public static final String COMPONENT = "background_location";
    public static final String VIEW = "background_location";

    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        switch (obj.getString("type")) {
            case "getAll":
                getAll(obj, session);
                break;
            case "getByKey":
                getByKey(obj, session);
                break;
            case "onChange":
                onChange(obj, session);
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

    public static void onChange(JSONObject obj, SSSessionAbstract session) {
        try {
            String key_usuario = obj.getString("key_usuario");
            JSONObject data = obj.getJSONObject("data");
            String type = data.getString("type");
            if (key_usuario.length() <= 0) {
                obj.put("estado", "error");
                obj.put("error", "key_usuario not found");
                return;
            }
            JSONObject bl = SPG.single_object(COMPONENT, "key = '" + key_usuario + "'");
            bl.put("fecha_last", SUtil.now());

            if (!bl.has("key")) {
                bl.put("key", key_usuario);
                bl.put("estado", 0);
                bl.put("fecha_on", SUtil.now());
                SPGConect.insertObject(COMPONENT, bl);
            }
            switch (type) {
                case "start":
                    bl.put("estado", 1);
                    SPGConect.editObject(COMPONENT, bl);
                    break;
                case "stop":
                    bl.put("estado", 0);
                    SPGConect.editObject(COMPONENT, bl);
                    break;
                case "locationChange":
                    JSONObject dto = data.getJSONObject("data");
                    bl.put("latitude", dto.getDouble("latitude"));
                    bl.put("longitude", dto.getDouble("longitude"));
                    SPGConect.editObject(COMPONENT, bl);
                    break;
            }
            obj.put("data", bl);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
            e.printStackTrace();
        }
    }

}
