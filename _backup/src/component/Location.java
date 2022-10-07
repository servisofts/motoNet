package component;

import Server.SSSAbstract.SSSessionAbstract;
import org.json.JSONObject;

public class Location {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public Location(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "registro":
                registro(data, session);
                break;
            default:
                defaultType(data, session);
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        System.out.println(obj.toString());
        // SocketServer.sendAll(obj.toString());
        // SocketCliete.send("geolocation", obj, session);
    }

    public void defaultType(JSONObject obj, SSSessionAbstract session) {
        System.out.println(obj.toString());
        // SocketCliete.send("geolocation", obj, session);

    }
}