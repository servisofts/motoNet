package Seguimiento;

import java.util.HashMap;
import java.util.Map.Entry;

import org.json.JSONObject;

import Router.Router;
import SocketWeb.SocketWeb;
import conexion.Conexion;

public class SeguimientoHilo extends Thread {
    private static HashMap<String, String> ESCUCHAS = new HashMap<>();
    public static boolean isRun = false;

    
    public static void setEscucha(String key) {
        if(!isRun){
            new SeguimientoHilo();
        }
        ESCUCHAS.put("key", key);
    }

    public static void removeEscucha(String key) {
        ESCUCHAS.remove(key);
    }

    public SeguimientoHilo(){
        isRun = true;
        this.start();
    }

    @Override
    public void run() {
        try {
            String eventos;
            while (isRun) {
                if(ESCUCHAS.entrySet().size()<=0){
                    this.isRun =false;
                    return;
                }
                JSONObject obj = new JSONObject();
                obj.put("component", "seguimientoConductor");
                obj.put("type", "changePosition");
                obj.put("estado", "exito");
                JSONObject objResp = Conexion.ejecutarFuncionObject("select get_conductores_activos_cercanos() as json");
                obj.put("data", objResp);
                for (Entry<String, String> me : ESCUCHAS.entrySet()) {
                    SocketWeb.sessiones.get(me.getValue()).send(obj.toString());
                }
                Thread.sleep(5000);
            }
        } catch (Exception ex) {
            this.isRun = false;
        }
    }
}
