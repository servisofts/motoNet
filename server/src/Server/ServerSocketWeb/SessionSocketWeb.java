package Server.ServerSocketWeb;

import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import component.MensajeSocket;

public class SessionSocketWeb extends SSSessionAbstract {

    private org.eclipse.jetty.websocket.api.Session miSession;

    public SessionSocketWeb(Object session) {
        super(session, ((org.eclipse.jetty.websocket.api.Session) session).getRemoteAddress().toString(),
                SSServerAbstract.getServer(SSServerAbstract.TIPO_SOCKET_WEB));
        this.miSession = (org.eclipse.jetty.websocket.api.Session) session;
        onOpen();

    }

    @Override
    public void onMessage(String mensaje) {
        JSONObject data = new JSONObject(mensaje);
        onMenssage(data);
    }

    @Override
    public void onClose(JSONObject obj) {
        miSession.close();
        super.onClose(obj);

    }

    @Override
    public void onError(JSONObject obj) {
        // TODO Auto-generated method stub
        System.out.println("asasn ");
    }

    @Override
    public void send(String mensaje) {
        try {
            Future<Void> fut;
            fut = this.miSession.getRemote().sendStringByFuture(mensaje);
            fut.get(2, TimeUnit.SECONDS); // wait for send to complete.
        } catch (Exception e) {
            // e.printStackTrace();
            System.out.println("Error al enviar mensaje ws");
            miSession.close();

        }
    }

    @Override
    public void printLog(String mensaje) {
        System.out.println(getIdSession() + ": " + mensaje);

    }

    @Override
    public void send(String mensaje, MensajeSocket mensajeSocket) {
        // TODO Auto-generated method stub

    }

}
