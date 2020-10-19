package SocketCliente;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import conexion.*;
import SocketCliente.SocketCliete;
import SocketServer.SocketServer;
import SocketWeb.SocketWeb;
import util.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import Router.Router;

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
            case "loginFacebook": {
                loginFacebook(data);
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
            case "getCi": {
                getCi(data);
                break;
            }
            case "confirmarDatos": {
                confirmarDatos(data);
                break;
            }

        }
    }

    public void login(JSONObject obj) {
        System.out.println(obj.toString());
        if (obj.getString("estado").equals("exito")) {
            if (obj.has("router")) {
                JSONObject data = obj.getJSONObject("data");
                Router router = Router.peticiones.get(obj.getString("router"));
                router.setKeyUsuario(data.getString("key"));
            }
        }
    }
    public void loginFacebook(JSONObject obj) {
        System.out.println(obj.toString());
        if (obj.getString("estado").equals("exito")) {
            if (obj.has("router")) {
                JSONObject data = obj.getJSONObject("data");
                Router router = Router.peticiones.get(obj.getString("router"));
                router.setKeyUsuario(data.getString("key"));
            }
        }
    }

    public void registro(JSONObject obj) {
        if (obj.getString("estado").equals("exito")) {
            System.out.println("ENIO EL CORREO");
            new EmailRegistroUsr(obj.getJSONObject("data")).start();
            System.out.println("NOTIFICAR QUE SE REGISTRO UN NUEVO USUARIO");
        }
        JSONObject objNotificacion = new JSONObject(obj.toString());
        objNotificacion.put("component", "notificacion");
        objNotificacion.put("type", "nuevoUsuario");
        objNotificacion.put("data", "TODAVIA NO EXISTE");
       SocketWeb.sendAll(objNotificacion.toString());
    }
    public void getCi(JSONObject obj) {
        if (obj.getString("estado").equals("exito")) {
            System.out.println("llego IMAGEN");
            // System.out.println(obj.toString());
        }
       
    }
    public void confirmarDatos(JSONObject obj) {
        if (obj.getString("estado").equals("exito")) {
            String key_usuario = obj.getString("key_usuario_modificado");
            SocketServer.sendUser(obj.toString(), key_usuario);
            // System.out.println(obj.toString());
        }
       
    }
}