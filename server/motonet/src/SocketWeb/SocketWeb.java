package SocketWeb;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.websocket.server.WebSocketHandler;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

import Config.Config;
import util.console;

public class SocketWeb {
    
    public static HashMap<String, Session> sessiones = new HashMap<>();
    public static HashMap<String, ArrayList<String>> Usuarios = new HashMap<>();

    public static void setUserSession(String keyUser, String KeySession){
        ArrayList<String> usuarios=  Usuarios.get(keyUser);
        if(usuarios==null){
            usuarios=new ArrayList<>();
        }
        usuarios.add(KeySession);
        Usuarios.put(keyUser, usuarios);
    }

    public static void sendAll(String mensaje) {
        for (Map.Entry me : sessiones.entrySet()) {
            sessiones.get(me.getKey()).send(mensaje);
        }
    }

    public static void Start(int puerto) {
        int portNumber = puerto;
        Thread t = new Thread() {
            @Override
            public void run() {
                try {
                    Server server = new Server(portNumber);
                    console.log(console.ANSI_BLUE,
                            "** Iniciando Web-socket " + Config.getJSON().getString("ss") + " en el puerto " + puerto + " **");
        
                    WebSocketHandler wsHandler = new WebSocketHandler() {
                        @Override
                        public void configure(WebSocketServletFactory factory) {
                            factory.register(Session.class);
                        }
                    };
                    server.setHandler(wsHandler);
                    server.start();
                    server.join();
                    console.log(console.ANSI_BLUE, "Esperando conexion WebSocket puerto " + portNumber);
                } catch (Exception e) {
                    // TODO Auto-generated catch block'
                    console.log(console.ANSI_BLUE, "Error en el cliente webSocket");
                }
            }
        };
        t.start();
       
    }

}