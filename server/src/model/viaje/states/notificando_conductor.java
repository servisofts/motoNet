package model.viaje.states;

import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import Servisofts.SConsole;
import Servisofts.SPG;
import model.viaje.Viaje;
import model.viaje.ViajeState;
import model.viaje.ViajeStateFactory.ViajeStateType;

public class notificando_conductor extends ViajeState {

    boolean isRun;
    int timeAllow = 10000;
    JSONObject conductor;

    public notificando_conductor(Viaje viaje, String code) {
        super(viaje, code, "Notificando conductor disponible");
    }

    @Override
    public void run() {
        try {
            JSONObject params = viaje.data.getJSONObject("params");
            String valor = params.getJSONObject("time_to_accept_driver").getString("valor");
            this.timeAllow = Integer.parseInt(valor) * 1000;

            JSONObject lastMov = viaje.getUltimoMovimiento();
            conductor = lastMov.getJSONObject("data");
            System.out.println(lastMov);
            // System.out.println("Notificando a conductor");
            JSONObject notifi = new JSONObject();
            notifi.put("component", "viaje");
            notifi.put("type", "solicitar_viaje_conductor");
            notifi.put("estado", "exito");
            notifi.put("timeAllow", timeAllow);
            notifi.put("data", viaje.toJson());
            SSServerAbstract.sendUser(notifi, conductor.getString("key"));
            // Thread.sleep(timeAllow);
            // if (!isRun)
            // return;
            // if (!viaje.state.code.equals(code)) {
            // return;
            // }
            // }
            Thread.sleep(timeAllow);
            viaje.changeState(ViajeStateType.buscando_conductor, null);
            this.viaje.notifyChange(conductor.getString("key"));
        } catch (Exception e) {
            e.printStackTrace();
        }
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
        viaje.changeState(ViajeStateType.buscando_conductor, null);
    }

    @Override
    public void negociar_conductor(JSONObject obj) throws Exception {
        String key_conductor = obj.getJSONObject("data").getString("key_conductor");
        if (this.conductor.getString("key").equals(key_conductor)) {
            this.viaje.data.put("key_conductor", key_conductor);
            this.viaje.changeState(ViajeStateType.en_negociacion, obj.getJSONObject("data"));
            return;
        }
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
