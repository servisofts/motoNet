package component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import conexion.*;
import Seguimiento.SeguimientoHilo;
import Server.SSSAbstract.SSSessionAbstract;
import util.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class SeguimientoConductor {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public SeguimientoConductor(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "startAll":
                startAll(data, session);
                break;
            case "stopAll":
                stopAll(data, session);
                break;
        }
    }

    public void startAll(JSONObject obj, SSSessionAbstract session) {
        SeguimientoHilo.setEscucha(session);

        // SocketCliete.send("usuario", obj, router);
    }
    public void stopAll(JSONObject obj, SSSessionAbstract session) {
        SeguimientoHilo.removeEscucha(session);
        // SocketCliete.send("usuario", obj, router);

    }


}