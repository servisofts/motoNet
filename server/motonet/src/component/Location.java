package component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import conexion.*;
import Router.Router;
import SocketCliente.SocketCliete;
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

    public Location(JSONObject data, Router router) {
        switch (data.getString("type")) {
                
            default:
                defaultType(data, router);
        }
    }


    public void defaultType(JSONObject obj, Router router) {
        System.out.println(obj.toString());
        // SocketCliete.send("usuario", obj, router);

    }
}