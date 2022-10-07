package model.viaje.states;

import org.json.JSONObject;

import model.viaje.Viaje;
import model.viaje.ViajeState;
import model.viaje.ViajeStateFactory.ViajeStateType;

public class en_negociacion extends ViajeState {

    public en_negociacion(Viaje viaje, String code) {
        super(viaje, code, "En negociacion");
    }

    @Override
    public void registro(JSONObject obj) throws Exception {
        this.not_permited();
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
        this.viaje.changeState(ViajeStateType.inicio_viaje);
    }

    @Override
    public void denegar_negociacion(JSONObject obj) throws Exception {
        this.viaje.data.put("key_conductor", "");
        this.viaje.changeState(ViajeStateType.buscando_conductor);
    }
}
