package model.viaje.states;

import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import Servisofts.SConsole;
import Servisofts.SPG;
import model.viaje.Viaje;
import model.viaje.ViajeState;
import model.viaje.ViajeStateFactory.ViajeStateType;

public class buscando_conductor extends ViajeState {

    boolean isRun;
    int timeAllow = 10000;

    public buscando_conductor(Viaje viaje, String code) {
        super(viaje, code, "Buscando conductor disponible");
        JSONObject params = viaje.data.getJSONObject("params");
        String valor = params.getJSONObject("time_to_accept_driver").getString("valor");
        this.timeAllow = Integer.parseInt(valor)*1000;
        this.startThread();
    }

    public void startThread() {
        this.isRun = true;
        Thread t = new Thread() {
            @Override
            public void run() {
                try {
                    Thread.sleep(1000);
                    JSONArray conductores = SPG.all_array("background_location", "estado > 0" , "fecha_last > now() - interval '1 hour'");
                    for (int i = 0; i < conductores.length(); i++) {
                        System.out.println("Notificando a conductor");
                        JSONObject conductor = conductores.getJSONObject(i);
                        JSONObject notifi = new JSONObject();
                        notifi.put("component", "viaje");
                        notifi.put("type", "solicitar_viaje_conductor");
                        notifi.put("estado", "exito");
                        notifi.put("timeAllow", timeAllow);
                        notifi.put("data", viaje.toJson());
                        SSServerAbstract.sendUser(notifi, conductor.getString("key"));
                        Thread.sleep(timeAllow);
                        if (!isRun)
                            return;
                        if (!viaje.state.code.equals(code)) {
                            return;
                        }
                    }
                    viaje.changeState(ViajeStateType.no_conductor_disponible);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            };
        };
        t.start();

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
        this.viaje.changeState(ViajeStateType.cancelado);
    }

    @Override
    public void negociar_conductor(JSONObject obj) throws Exception {
        this.isRun = false;
        this.viaje.data.put("key_conductor", obj.getJSONObject("data").getString("key_conductor"));
        this.viaje.changeState(ViajeStateType.en_negociacion);
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
