package SocketServer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.cert.X509Certificate;
import java.sql.SQLException;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.net.ssl.HandshakeCompletedEvent;
import javax.net.ssl.HandshakeCompletedListener;
import javax.net.ssl.SSLSocket;

import org.json.JSONArray;
import org.json.JSONObject;

import Router.Router;
import SSL.SSL;
import component.Manejador;
import util.console;



public class Session extends Thread {

    private String id;
    private SSLSocket socket;
    private PrintWriter outpw = null;
    private X509Certificate cer;
    
    private JSONObject servicio = null;
    JSONObject reintent;
    boolean firstTime = true;

    public Session(String id, SSLSocket socket) {
        try {
            this.id = id;
            this.socket = socket;
            this.socket.addHandshakeCompletedListener(new HandshakeCompletedListener() {
                @Override
                public void handshakeCompleted(HandshakeCompletedEvent event) {
                    X509Certificate cerx = (X509Certificate) event.getLocalCertificates()[0];
                    cer = cerx;
                    System.out.println("Certificado: " + cer.getSubjectX500Principal().getName());
                }
            });
            outpw = new PrintWriter(socket.getOutputStream(), true);
            this.start();
        } catch (Exception e) {
            setLog("Error", "Error en el certificado del cliente " + id);
            System.out.println("Error en el certificado del cliente " + id);

        }

    }

    /**
     * @return the id
     */
    public String getIdString() {
        return id;
    }
    public void send(String mensaje) {
        outpw.println(mensaje);
        outpw.flush();
    }

    public void setId(String id) {
        this.id = id;
    }

    public Socket getSocket() {
        return socket;
    }

    public void setSocket(SSLSocket socket) {
        this.socket = socket;
    }

    public void setCer(X509Certificate cer) {
        this.cer = cer;
    }

    @Override
    public void run() {
        setId(id);
        console.log(console.ANSI_GREEN,"Nueva session desde " + id);
        InputStream inp = null;
        BufferedReader brinp = null;
        try {
            inp = socket.getInputStream();
            brinp = new BufferedReader(new InputStreamReader(inp));
            JSONObject data = new JSONObject();
            data.put("id", id);
            data.put("socket", "usuario");
            data.put("component", "servicio");
            data.put("type", "init");
            data.put("data", "Bien venido al socket usuario");
            send(data.toString());
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }
        String line;
        boolean isRun = true;
        while (isRun) {
            try {
                line = brinp.readLine();
                if ((line == null) || line.equalsIgnoreCase("QUIT")) {
                    socket.close();
                    console.log(console.ANSI_GREEN,"Conexion cerrada: ip = " + id + " );");
                    setLog("Close", "Conexion cerrada: ip = " + id + " )");
                  
                    return;
                } else {
                    if (line.length() > 0) {
                        JSONObject data = new JSONObject(line);
                        data.put("id", id);
                        data.put("noSend", false);
                        if(servicio!=null){
                            data.put("servicio", servicio);
                        }
                        Router router = new Router(Router.TIPO_TCPS, this);
                        new Manejador(data, router);

                        if (!data.getBoolean("noSend")) {
                            if(data.has("servicio")){
                                data.remove("servicio");
                            }
                            send(data.toString());
                        }
                    }
                }
            } catch (Exception e) {
                Pattern p = Pattern.compile(".*?onnection.has.closed.*");
                if (e.getMessage() != null) {
                    Matcher m = p.matcher(e.getMessage());
                    boolean b = m.matches();
                    if (b) {
                        isRun = false;
                    }
                    console.log(console.ANSI_GREEN,"Error en el cliente " + this.id + " ->\n " + e.getLocalizedMessage());

                } else {
                    isRun = false;
                }
            }
        }
    }

    public void setLog(String tipo, String descripcion) {

        // try {
            JSONObject objLog = new JSONObject();
            objLog.put("key", UUID.randomUUID().toString());
            objLog.put("estado", "1");
            objLog.put("fecha_on", "now()");
            objLog.put("tipo", tipo);
            objLog.put("descripcion", descripcion);
            if (servicio.has("key")) {
                objLog.put("key_servicio", servicio.getString("key"));
            }

           // Conexion.insertArray("servicio_log", new JSONArray().put(objLog));
        // } catch (SQLException e) {
        //     // TODO Auto-generated catch block
        //     e.printStackTrace();
        // }
    }

    public JSONObject getServicio() {
        return servicio;
    }

    public void setServicio(JSONObject servicio) {
        this.servicio = servicio;
    }
}