package model.viaje;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import Servisofts.SPG;
import Servisofts.SPGConect;
import Servisofts.SUtil;
import model.viaje.ViajeStateFactory.ViajeStateType;

public class Viaje {
    public static final String VIEW = "view_viaje";
    public static HashMap<String, Viaje> INSTANCES = new HashMap<>();

    public static Viaje getInstance(String key) throws Exception {
        if (!INSTANCES.containsKey(key)) {
            INSTANCES.put(key, new Viaje(key));
        }
        return INSTANCES.get(key);
    }

    public static Viaje getByKeyUsuario(String key_usuario) throws Exception {
        for (Map.Entry ks : INSTANCES.entrySet()) {
            Viaje v = INSTANCES.get(ks.getKey());
            if (v.data != null) {
                if (v.data.has("key_usuario")) {
                    String key_usuario_v = v.data.getString("key_usuario");
                    if (key_usuario_v.equals(key_usuario)) {
                        return v;
                    }
                }
            }
        }
        return null;
    }

    public static Viaje getInstance(String key, JSONObject data) throws Exception {
        if (!INSTANCES.containsKey(key)) {
            INSTANCES.put(key, new Viaje(key, data));
        }
        return INSTANCES.get(key);
    }

    String key;

    public JSONObject data;
    public ViajeState state;

    private Viaje(String key) throws Exception {
        this.key = key;
        this.syncDB();

    }

    private Viaje(String key, JSONObject viaje) throws Exception {
        this.key = key;
        this.data = viaje;
        this.initState();
    }

    public JSONObject getUltimoMovimiento() {
        return this.data.getJSONArray("movimientos").getJSONObject(0);
    }

    public void syncDB() throws Exception {
        this.data = SPG.single_object(VIEW, "key = '" + this.key + "'");
        this.initState();
    }

    public void initState() throws Exception {
        if (!this.data.has("state")) {
            this.state = ViajeStateFactory.create(this, ViajeStateType.no_registrado);
        } else {
            if (this.state != null) {
                if (this.state.code.equals(this.data.getString("state"))) {
                    return;
                }
            }
            this.state = ViajeStateFactory.create(this, ViajeStateType.valueOf(this.data.getString("state")));
        }
        this.state.start();
    }

    public void notifyChange(String key_usuario) throws Exception {
        notifyChange(new String[] { key_usuario });
    }

    public void notifyChange(String[] users) throws Exception {

        JSONObject notify = new JSONObject();
        notify.put("component", "viaje");
        notify.put("type", "action");
        notify.put("action", "change");
        notify.put("estado", "exito");
        notify.put("data", this.data);

        // String key_cliente = this.data.getString("key_usuario");
        for (String key_user : users) {
            SSServerAbstract.sendUser(notify, key_user);

        }
        // SSServerAbstract.sendUsers(notify, users);

        // if (this.data.has("key_conductor")) {
        // if (!this.data.isNull("key_conductor")) {
        // String key_conductor = this.data.getString("key_conductor");
        // }
        // }

        System.out.println(
                "TODO: Notificar por firebase que el viaje cambio para los interezados new state (" + this.state.code
                        + ")");
    }

    public void action(JSONObject data) throws Exception {
        String action = data.getString("action");
        Method[] metods = this.state.getClass().getMethods();
        for (Method method : metods) {
            if (action.equals(method.getName())) {
                try {
                    method.invoke(this.state, data);
                } catch (InvocationTargetException e) {
                    throw new Exception(e.getCause().getMessage());
                }
                this.syncDB();
                return;
            }
        }
        throw new Exception("action type not foud.");
    }

    public JSONObject toJson() {
        JSONObject obj = new JSONObject();
        if (this.data != null) {
            obj = this.data;
        }
        obj.put("key", this.key);
        obj.put("state", this.state.code);
        return obj;
    }

    public void changeState(ViajeStateType state, JSONObject data) throws Exception {
        if (data == null) {
            data = new JSONObject();
        }
        if (this.state.code.equals(state.name())) {
            return;
        }
        System.out.println("Entro al change state");
        this.state.interrupt();
        this.state = ViajeStateFactory.create(this, state);
        this.data.put("state", this.state.code);
        SPGConect.editObject("viaje", this.data);
        addMovimiento(data);
        this.syncDB();
        this.notifyChange(new String[] { this.data.getString("key_usuario") });
        this.state.start();

    }

    public void addMovimiento(JSONObject data) throws SQLException {
        JSONObject viaje_movimiento = new JSONObject();
        viaje_movimiento.put("key", SUtil.uuid());
        viaje_movimiento.put("key_viaje", this.key);
        viaje_movimiento.put("tipo", this.state.code);
        viaje_movimiento.put("fecha_on", SUtil.now());
        viaje_movimiento.put("estado", 1);
        viaje_movimiento.put("data", data);
        SPGConect.insertObject("viaje_movimiento", viaje_movimiento);
    }

    public String getKey() {
        return key;
    }
}
