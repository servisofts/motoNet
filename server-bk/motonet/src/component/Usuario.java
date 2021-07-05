package component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import conexion.*;
import SocketCliente.SocketCliete;
import TipoDato.TipoDato;
import util.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;

public class Usuario {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public Usuario(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "registro":
                registro(data, session);
                break;
            case "insertarDato":
                insertarDato(data, session);
                break;
            case "identificacion":
                identificaion(data, session);
                break;
            case "recuperarPass":
                recuperarPass(data, session);
                break;
            default:
                defaultType(data, session);
        }
    }

    public void identificaion(JSONObject obj, SSSessionAbstract session) {
        System.out.println(obj.toString());
        obj.put("estado", "exito");
        String deviceKey = obj.getString("deviceKey");
        session.setKeyDevice(deviceKey);
        try {
            JSONObject data = obj.getJSONObject("data");
            session.setKeyUsuario(data.getString("key"));    
        } catch (Exception e) {
            System.out.println("INICIADO SIN USR");
        }
    }
    public void recuperarPass(JSONObject obj, SSSessionAbstract session) {
        String texto  = obj.getString("data");
        JSONObject data = new JSONObject();
        data.put("key", "sa323-23r2r-2r-23r-23r");
        obj.put("data",data);
        obj.put("estado", "exito");
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        JSONArray data = obj.getJSONArray("data");
        JSONObject objData;
        
        for (int i = 0; i < data.length(); i++) {
            objData = data.getJSONObject(i);
            String insertarTipoDato = TipoDato.insertarTipo(objData, session);
            objData.put("data", insertarTipoDato);
        }
        SocketCliete.send("usuario", obj, session);
    }

    public void insertarDato(JSONObject obj, SSSessionAbstract session) {
        JSONArray data = obj.getJSONArray("data");
        JSONObject objData;
        for (int i = 0; i < data.length(); i++) {
            objData = data.getJSONObject(i);
            objData.put("key_usuario", obj.getString("key_usuario"));
            String insertarTipoDato = TipoDato.insertarTipo(objData, session);
            objData.put("data", insertarTipoDato);
        }
        SocketCliete.send("usuario", obj, session);

    }

    public void defaultType(JSONObject obj, SSSessionAbstract session) {

        SocketCliete.send("usuario", obj, session);

    }
}