package model.viaje.states;

import org.json.JSONObject;
import model.viaje.Viaje;
import model.viaje.ViajeState;
import model.viaje.ViajeStateFactory.ViajeStateType;

public class llegue extends ViajeState {

    public llegue(Viaje viaje, String code) {
        super(viaje, code, "llegue");
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
        this.not_permited();
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
        this.viaje.changeState(ViajeStateType.conductor_llego, null);
        this.viaje.notifyChange(this.viaje.data.getString("key_conductor"));
    }

    

}
