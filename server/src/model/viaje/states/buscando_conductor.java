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

    public buscando_conductor(Viaje viaje, String code) {
        super(viaje, code, "Buscando conductor disponible");
    }

    @Override
    public void run() {
        try {
            Thread.sleep(1000);
            JSONArray keys_conductores_notificados = new JSONArray();
            JSONArray movimientos = this.viaje.data.getJSONArray("movimientos");
            movimientos.iterator().forEachRemaining(o -> {
                JSONObject obj = (JSONObject) o;
                if (obj.getString("tipo").equals("notificando_conductor")) {
                    if (!obj.isNull("data")) {
                        keys_conductores_notificados.put(obj.getJSONObject("data").getString("key"));
                    }
                }
            });
            JSONArray conductores = SPG.all_array("background_location", "estado > 0",
                    "fecha_last > now() - interval '3 hour'", "key NOT IN (select * from json_array_elements_text('"
                            + keys_conductores_notificados.toString() + "'))");
            if (conductores.length() > 0) {
                JSONObject conductor = conductores.getJSONObject(0);
                viaje.changeState(ViajeStateType.notificando_conductor, conductor);
            } else {
                viaje.changeState(ViajeStateType.no_conductor_disponible, null);
            }
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
