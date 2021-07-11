package Viaje;

import java.util.HashMap;
import org.json.JSONObject;

public class ViajeHilo {

    private static HashMap<String, BuscandoViaje> VIAJES_EN_CURSO = new HashMap<>();

    public static void buscar(JSONObject objViaje) {
        BuscandoViaje bv = new BuscandoViaje(objViaje);
        VIAJES_EN_CURSO.put(bv.getKey(), bv);
    }

    public static void removerViaje(String key) {
        VIAJES_EN_CURSO.remove(key);
    }
    public static void actualizarViaje(JSONObject objViaje) {
        VIAJES_EN_CURSO.get(objViaje.getString("key")).setViaje(objViaje);
    }

}
