package model.viaje.states;

import org.json.JSONArray;
import org.json.JSONObject;

import Servisofts.SPG;
import Servisofts.SPGConect;
import Servisofts.SUtil;
import model.viaje.Viaje;
import model.viaje.ViajeState;
import model.viaje.ViajeStateFactory.ViajeStateType;

public class no_registrado extends ViajeState {

    public no_registrado(Viaje viaje, String code) {
        super(viaje, code, "Sin registrar en la base de datos");
    }

    @Override
    public void registro(JSONObject obj) throws Exception {
        JSONObject viaje = obj.getJSONObject("data");
        if (viaje.isNull("key_tipo_viaje")) {
            throw new Exception("key_tipo_viaje not found");
        }
        if (viaje.isNull("destinos")) {
            throw new Exception("destinos not found");
        }
        String key_usuario = obj.getString("key_usuario");
        if (Viaje.getByKeyUsuario(key_usuario) != null) {
            throw new Exception("Ya existe un viaje para este usuario.");
        }

        JSONObject params = SPG.all_object("parametros_viaje", "key", "estado = 1");

        JSONArray destinos = viaje.getJSONArray("destinos");
        viaje.remove("destinos");
        viaje.put("key", this.viaje.getKey());
        viaje.put("estado", 1);
        viaje.put("fecha_on", SUtil.now());
        viaje.put("state", this.code);
        viaje.put("key_usuario", key_usuario);
        viaje.put("params", params);
        SPGConect.insertObject("viaje", viaje);
        int index = 0;
        for (Object o : destinos) {
            JSONObject destino = (JSONObject) o;
            destino.put("key", SUtil.uuid());
            destino.put("key_viaje", viaje.get("key"));
            destino.put("estado", 1);
            destino.put("tipo", index);
            destino.put("fecha_on", SUtil.now());
            SPGConect.insertObject("direccion", destino);
            index++;
        }
        this.viaje.syncDB();
        this.viaje.changeState(ViajeStateType.buscando_conductor);

    }

    @Override
    public void buscar_conductor(JSONObject obj) throws Exception {
        this.not_permited();
    }

    @Override
    public void cancelar(JSONObject obj) throws Exception {
        this.not_permited();
    }

    @Override
    public void negociar_conductor(JSONObject obj) throws Exception {
        this.not_permited();
    }

    @Override
    public void aceptar_negociacion(JSONObject obj) throws Exception {
        this.not_permited();
    }

    @Override
    public void denegar_negociacion(JSONObject obj) throws Exception {
        this.not_permited();
    }
}
