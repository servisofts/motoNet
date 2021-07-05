package component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import conexion.*;
import Server.SSSAbstract.SSSessionAbstract;
import util.*;

import org.json.JSONArray;
import org.json.JSONException;
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