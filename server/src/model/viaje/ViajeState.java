package model.viaje;

import org.json.JSONObject;

import Component.viaje;

public abstract class ViajeState implements ViajeStateInterface {
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
    

    public void not_permited() throws Exception {
        throw new Exception("Action not permited in state " + this.code);

    }
}
