package Router;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;

public class Router {

    public static final int TIPO_HTTP = 1;
    public static final int TIPO_WS = 2;
    public static final int TIPO_TCPS = 3;

    public static HashMap<String,Router> peticiones = new HashMap<>();
    public static HashMap<String,JSONArray> Times = new HashMap<>();
    private int tipo;

    // private javax.servlet.http.HttpServletResponse http_Session;
    // private javax.websocket.Session ws_Session;
    // private com.servisofts.glup.SocketServer.Session tcps_Session;
    private Object session;
    private Long fecha;

    public Router(int tipo, Object session) {
        this.fecha = new Date().getTime();
        this.session = session;
        this.tipo = tipo;
    }

    /**
     * @return the tipo
     */
    public int getTipo() {
        return tipo;
    }

    /**
     * @return the session
     */
    public Object getSession() {
        return session;
    }

    public Long getPromedio(String key) {
        JSONArray arr = Times.get(key);
        Long suma = (long) 0;

        if(arr.length()<=0){
            return suma;
        }
        for (int i = 0; i < arr.length(); i++) {
            suma+=arr.getLong(i);
        }
        return suma/arr.length();
    }

    public void sendRespuesta(JSONObject data) {

        if(data.has("component")&&data.has("type")){
            String key = data.getString("component")+","+data.getString("type");
                JSONArray arr = Times.get(key);
                if(arr==null){
                    Times.put(key, new JSONArray());
                }
                Long tiempo = new Date().getTime()-this.fecha;
                System.out.println("Peticion -> "+key+" Ping:"+tiempo+"ms"+" Promedio: "+getPromedio(key)+"ms");
                Times.get(key).put(tiempo);
        }
        switch (this.getTipo()) {
            case Router.TIPO_TCPS:
                ((SocketServer.Session) (this.getSession())).send(data.toString());
                break;
        }
        Router.peticiones.remove(data.getString("router"));
    }



    public static String setPeticion(Router router){
        String uid = UUID.randomUUID().toString();
        Router.peticiones.put(uid, router);
        return uid;
    }
    
}