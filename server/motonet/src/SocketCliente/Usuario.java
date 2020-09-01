package SocketCliente;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import conexion.*;
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

    public Usuario(JSONObject data) {
        switch (data.getString("type")) {
            case "login": {
                login(data);
                break;
            }
            case "registro": {
                registro(data);
                break;
            }
            case "registroFacebook": {
                registro(data);
                break;
            }
        }
    }

    public void login(JSONObject obj) {
        System.out.println(obj.toString());
        // obj.put("estado", "exito");
    }

    public void registro(JSONObject obj) {
        if (obj.getString("estado").equals("exito")) {
            System.out.println("ENIO EL CORREO");
            // new EmailRegistroUsr(obj.getJSONObject("usuario")).start();
            System.out.println("NOTIFICAR QUE SE REGISTRO UN NUEVO USUARIO");
            JSONObject objNotificacion = new JSONObject(obj.toString());
            objNotificacion.put("type", "nuevo");
            // websocketSession.sendAll(objNotificacion);
        }
    }
}