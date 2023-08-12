package model.viaje.states;

import org.json.JSONObject;
import model.viaje.Viaje;
import model.viaje.ViajeState;
import model.viaje.ViajeStateFactory.ViajeStateType;

public class conductor_llego extends ViajeState {

    public conductor_llego(Viaje viaje, String code) {
        super(viaje, code, "Conductor llego");
        //this.viaje.data.put("estado", 0);
        //Viaje.INSTANCES.remove(viaje.getKey());
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
    public void inicio_viaje(JSONObject obj) throws Exception {
        this.viaje.changeState(ViajeStateType.inicio_viaje, null);
        this.viaje.notifyChange(this.viaje.data.getString("key_conductor"));
    }

    @Override
    public void fin_viaje(JSONObject obj) throws Exception {
        this.viaje.data.put("estado", 0);
        this.viaje.changeState(ViajeStateType.fin_viaje, null);
        this.viaje.notifyChange(this.viaje.data.getString("key_conductor"));
    }
    
}