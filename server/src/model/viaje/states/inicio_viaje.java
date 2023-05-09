package model.viaje.states;

import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import Servisofts.SConsole;
import Servisofts.SPG;
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
        this.viaje.notifyChange(this.viaje.data.getString("key_conductor"));
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
}
