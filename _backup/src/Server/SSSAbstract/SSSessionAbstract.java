package Server.SSSAbstract;

import org.json.JSONObject;

import FireBase.FireBase;
import Server.SSSInterface.SSSessionInterface;
import component.Manejador;

public abstract class SSSessionAbstract implements SSSessionInterface {

    private String idSession;
    private String keyUsuario;
    private String keyDevice;
    private String tokenFb;
    private String appFb;
    private JSONObject usuario;
    private SSServerAbstract Server;

    private JSONObject pendiente;

    public SSSessionAbstract(Object session, String id, SSServerAbstract server) {
        this.idSession = id;
        this.Server = server;
        server.setSession(this);
    }

    public String getIdSession() {
        return idSession;
    }

    public void onOpen() {
        JSONObject data = new JSONObject();
        data.put("id", getIdSession());
        data.put("socket", "motonet");
        data.put("component", "servicio");
        data.put("type", "init");
        data.put("data", "Bienvenido al servidor servisofts. Aganos el favor de identificarse.");
        send(data.toString());
    }

    public void onMenssage(JSONObject data) {
        data.put("id", getIdSession());
        data.put("noSend", false);
        // Router router = new Router(Router.TIPO_WS, this);
        new Manejador(data, this);
        if (!data.getBoolean("noSend")) {
            send(data.toString());
        }
    }

    public void sendFireBase(String mensaje) {
        System.out.println("Enviando por fb");
        FireBase.send(this.getTokenFb(), this.getAppFb(), mensaje);
    }

    public void onClose(JSONObject data) {
        SSServerAbstract.closeSession(getIdSession());
    }

    public SSServerAbstract getServer() {
        return Server;
    }

    public String getKeyDevice() {
        return keyDevice;
    }

    public String getKeyUsuario() {
        return keyUsuario;
    }

    public void setUsuario(JSONObject usuario) {
        this.usuario = usuario;
    }

    public JSONObject getUsuario() {
        return usuario;
    }

    public void setTokenFb(String tokenFb) {
        this.tokenFb = tokenFb;
    }

    public String getTokenFb() {
        return tokenFb;
    }

    public void setAppFb(String appFb) {
        this.appFb = appFb;
    }

    public String getAppFb() {
        return appFb;
    }

    public void setKeyDevice(String keyDevice) {
        this.keyDevice = keyDevice;
        SSServerAbstract.setDeviceSession(keyDevice, getIdSession());
    }

    public void setKeyUsuario(String keyUsuario) {
        this.keyUsuario = keyUsuario;
        SSServerAbstract.setUserSession(keyUsuario, getKeyDevice());
    }

    public void setPendiente(String key, JSONObject pendiente) {
        if (this.pendiente == null) {
            this.pendiente = new JSONObject();
        }
        this.pendiente.put(key, pendiente);
    }

    public JSONObject getPendiente(String key) {
        if (this.pendiente == null) {
            return null;
        }
        return this.pendiente.getJSONObject(key);
    }

}
