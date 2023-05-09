package model.viaje;

import org.json.JSONObject;

public interface ViajeStateInterface {

    public JSONObject toJson();

    public void registro(JSONObject obj) throws Exception;

    public void buscar_conductor(JSONObject obj) throws Exception;

    public void negociar_conductor(JSONObject obj) throws Exception;

    public void aceptar_negociacion(JSONObject obj) throws Exception;

    public void denegar_negociacion(JSONObject obj) throws Exception;

    public void cancelar(JSONObject obj) throws Exception;

    public void cancelar_conductor(JSONObject obj) throws Exception;
}
