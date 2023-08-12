package model.viaje;

import org.json.JSONObject;

public abstract class ViajeState extends Thread implements ViajeStateInterface{
    public Viaje viaje;
    public String type;
    public String code;

    public ViajeState(Viaje viaje, String code, String type) {
        this.viaje = viaje;
        this.type = type;
        this.code = code;
    }

    @Override
    public JSONObject toJson() {
        JSONObject obj = new JSONObject();
        obj.put("type", this.type);
        obj.put("code", this.code);
        return obj;
    }

    @Override
    public void llegue(JSONObject obj) throws Exception {
        this.not_permited();
    }
    @Override
    public void inicio_viaje(JSONObject obj) throws Exception {
        this.not_permited();
    }

    @Override
    public void fin_viaje(JSONObject obj) throws Exception {
        this.not_permited();
    }

    public void not_permited() throws Exception {
        throw new Exception("Action not permited in state " + this.code);
    }
    @Override
    public void run() {
        // TODO Auto-generated method stub
        
    }
}
