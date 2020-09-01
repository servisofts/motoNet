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

public class Usuario {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public Usuario(JSONObject data, Router router) {
        switch (data.getString("type")) {
            case "registro":
                registro(data, router);
                break;
                
            default:
                defaultType(data, router);
        }
    }

    public void registro(JSONObject obj, Router router) {
   
        //obj.getJSONObject("data").put("pass", util.randomPass(6));
        SocketCliete.send("usuario", obj, router);

    }

    public void defaultType(JSONObject obj, Router router) {

        SocketCliete.send("usuario", obj, router);

    }
}