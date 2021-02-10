package component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import conexion.*;
import Router.Router;
import Seguimiento.SeguimientoHilo;
import SocketCliente.SocketCliete;
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

    public SeguimientoConductor(JSONObject data, Router router) {
        switch (data.getString("type")) {
            case "startAll":
                startAll(data, router);
                break;
            case "stopAll":
                stopAll(data, router);
                break;
        }
    }

    public void startAll(JSONObject obj, Router router) {
        SeguimientoHilo.setEscucha((((SocketWeb.Session) router.getSession()).getId()));

        // SocketCliete.send("usuario", obj, router);
    }
    public void stopAll(JSONObject obj, Router router) {
        SeguimientoHilo.removeEscucha((((SocketWeb.Session) router.getSession()).getId()));
        // SocketCliete.send("usuario", obj, router);

    }


}