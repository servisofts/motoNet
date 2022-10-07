package model.Validators;

import org.json.JSONObject;

import Servisofts.SConsole;
import model.viaje.Viaje;
import Servisofts.SLog;

public class Validator extends Thread {
    long timeSleep;
    boolean isRun;

    public Validator() {
        isRun = true;
        timeSleep = 5000;
        this.start();
    }

    public void _stop() {
        this.isRun = false;
        SConsole.error("Validator Thread is stoped");
    }

    @Override
    public void run() {
        try {
            while (this.isRun) {
                Thread.sleep(this.timeSleep);
                JSONObject estados = new JSONObject();
                SLog.put("Viajes.activos", Viaje.INSTANCES.size());
                Viaje.INSTANCES.values().iterator().forEachRemaining(viaje -> {
                    Viaje v = viaje;
                    if (estados.has(v.state.code)) {
                        estados.put(v.state.code, estados.getInt(v.state.code) + 1);
                    } else {
                        estados.put(v.state.code, 1);
                    }
                });
                SLog.put("Viajes.states", estados);
            }
        } catch (InterruptedException e) {
            this._stop();
        }
    }

}
