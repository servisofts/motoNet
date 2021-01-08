package SocketWeb;

import java.io.IOException;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import org.eclipse.jetty.websocket.api.StatusCode;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketError;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;
import org.json.JSONObject;

import Router.Router;
import component.Manejador;
import util.console;

@WebSocket
public class Session {

    private CountDownLatch closeLatch;
    private org.eclipse.jetty.websocket.api.Session socket;
    private String id;

    public void SimpleEchoSocket() {
        this.closeLatch = new CountDownLatch(1);
    }

    public boolean awaitClose(int duration, TimeUnit unit) throws InterruptedException {
        return this.closeLatch.await(duration, unit);
    }

    public String getId() {
        return id;
    }
    @OnWebSocketClose
    public void onClose(int statusCode, String reason) {
        socket.close();;
        console.log(console.ANSI_BLUE, "Conexion cerrada: ip = " + id);
        this.socket = null;
        SocketWeb.sessiones.remove(id);
        // this.closeLatch.countDown(); // trigger latch
    }

    @OnWebSocketConnect
    public void onConnect(org.eclipse.jetty.websocket.api.Session session) {
        String idSession = session.getRemoteAddress().toString();
        SocketWeb.sessiones.put(idSession, this);
        this.id = idSession;
        this.socket = session;
        try {
            console.log(console.ANSI_BLUE, "WebSocket -> Nueva conexion : " + id);
            send("welcome");
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }

    @OnWebSocketMessage
    public void onMessage(String msg) {
        JSONObject data = new JSONObject(msg);
        data.put("id", id);
        data.put("noSend", false);
        Router router = new Router(Router.TIPO_WS, this);
        new Manejador(data, router);
        if (!data.getBoolean("noSend")) {
            send(data.toString());
        }
    }

    @OnWebSocketError
    public void onError(Throwable cause) {
        console.log(console.ANSI_BLUE, "WebSocket Error: -> " + cause.getLocalizedMessage());
        //cause.printStackTrace(System.out);
    }

    public void send(String data) {
        try {

            Future<Void> fut;
           
            fut = socket.getRemote().sendStringByFuture(data.toString());
            fut.get(2, TimeUnit.SECONDS); // wait for send to complete.
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (ExecutionException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (TimeoutException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }
}