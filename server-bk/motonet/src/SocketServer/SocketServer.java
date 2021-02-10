package SocketServer;

import java.io.IOException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.net.ssl.HandshakeCompletedEvent;
import javax.net.ssl.HandshakeCompletedListener;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLServerSocket;
import javax.net.ssl.SSLServerSocketFactory;
import javax.net.ssl.SSLSocket;

import org.json.JSONObject;

import Config.Config;
import SSL.SSL;
import util.console;

public class SocketServer {

    public static HashMap<String, Session> Sessiones = new HashMap<>();
    public static HashMap<String, ArrayList<String>> Usuarios = new HashMap<>();
    
    public static void setUserSession(String keyUser, String KeySession){
        ArrayList<String> usuarios=  Usuarios.get(keyUser);
        if(usuarios==null){
            usuarios=new ArrayList<>();
        }
        usuarios.add(KeySession);
        Usuarios.put(keyUser, usuarios);
    }


    static int puerto;

    public static void Start(int puerto) {
        SocketServer.puerto = puerto;
        try {
            Thread t = new Thread() {
                @Override
                public void run() {
                    try {
                        
                        console.log(console.ANSI_GREEN,"** Iniciando socket " + Config.getJSON().getString("ss") + " en el puerto "
                                + puerto + " **");
                        SSLContext ss = SSL.getSSLContext();
                        SSLServerSocketFactory ssf = ss.getServerSocketFactory();
                        SSLServerSocket s;

                        s = (SSLServerSocket) ssf.createServerSocket(SocketServer.puerto);

                        console.log(console.ANSI_GREEN,"Socket iniciado esperando conexion...");
                        while (true) {
                            SSLSocket socket = (SSLSocket) s.accept();
                            String idSession = socket.getRemoteSocketAddress().toString();
                            Session session = null;
                            session = new Session(idSession, socket);
                            if (session != null) {
                                Sessiones.put(idSession + "", session);
                                // sendMEnsaje(session,"Te has conectado al socket servicio:"+puerto );
                            }
                        }
                    } catch (IOException e) {
                        console.log(console.ANSI_GREEN,"Error socket server");
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                }
            };
            t.start();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private void sendMEnsaje(Session sess, String mensaje) {
        sess.send(mensaje);
    }

    public static void sendAll(String mensaje) {
        for (Map.Entry me : Sessiones.entrySet()) {
            Sessiones.get(me.getKey()).send(mensaje);
        }
    }

    public static void sendUser(String mensaje,String key_usr) {
        Thread t = new Thread() {
            @Override
            public void run() {
                ArrayList<String> sessions= Usuarios.get(key_usr);
                if(sessions==null){
                    return;
                }
                for (String idSession : sessions) {
                    if(Sessiones.get(idSession)!=null){
                        Sessiones.get(idSession).send(mensaje);
                    }
                }
            }
        };
        t.start();
    }
    // public static void main(String args[]) {
    // new TLSServer(10001, "servicio");
    // }

}