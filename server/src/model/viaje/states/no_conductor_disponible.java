package model.viaje.states;

import org.json.JSONObject;

import Servisofts.SConsole;
import model.viaje.Viaje;
import model.viaje.ViajeState;
import model.viaje.ViajeStateFactory.ViajeStateType;

public class no_conductor_disponible extends ViajeState {

    boolean isRun;

    public no_conductor_disponible(Viaje viaje, String code) {
        super(viaje, code, "No hay conductor disponible");
    }

    @Override
    public void registro(JSONObject obj) throws Exception {
        this.not_permited();
    }

    @Override
    public void buscar_conductor(JSONObject obj) throws Exception {
        this.viaje.changeState(ViajeStateType.buscando_conductor, null);
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
}
