package model.viaje.states;

import org.json.JSONObject;

import Component.Direccion;
import Servisofts.SUtil;
import model.viaje.Viaje;
import model.viaje.ViajeState;
import model.viaje.ViajeStateFactory.ViajeStateType;

public class inicio_viaje extends ViajeState {

    public inicio_viaje(Viaje viaje, String code) {
        super(viaje, code, "Buscando conductor disponible");
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
        this.viaje.changeState(ViajeStateType.cancelado, null);
    }

    @Override
    public void cancelar_conductor(JSONObject obj) throws Exception {
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

    @Override
    public void llegue(JSONObject obj) throws Exception {
        if(obj.getJSONObject("data").has("key_direccion")){
            Direccion.conductorLlego(obj.getJSONObject("data").getString("key_direccion"));
            this.viaje.changeState(ViajeStateType.conductor_llego, null);
            this.viaje.notifyChange(this.viaje.data.getString("key_conductor"));
        }
        
    }
}
