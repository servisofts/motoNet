package model.viaje;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import Servisofts.SPG;

public class ViajeActions {

    public static void resume() throws Exception {
        getActivos();
    }

    public static List<Viaje> getActivos() throws Exception {
        return jsonToList(SPG.all_array(Viaje.VIEW, "estado > 0"));
    }

    public static List<Viaje> getAllByState(String state) throws Exception {
        return jsonToList(SPG.all_array(Viaje.VIEW, "state = '" + state + "'"));
    }

    // METHODS TO PARSER
    private static List<Viaje> jsonToList(JSONArray arr) throws Exception {
        List<Viaje> lista = new ArrayList<>();
        for (int i = 0; i < arr.length(); i++) {
            JSONObject viaje = arr.getJSONObject(i);
            if (viaje.has("key")) {
                lista.add(Viaje.getInstance(viaje.getString("key"), viaje));
            }
        }
        return lista;
    }
}
