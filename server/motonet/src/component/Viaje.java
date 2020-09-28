package component;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import conexion.*;
import Router.Router;
import SocketCliente.SocketCliete;
import SocketServer.SocketServer;
import Viaje.ViajeHilo;
import util.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Viaje {

    // DATA TABLE = usuario

    // key CV
    // user CV
    // pass CV
    // key_persona CV
    // telefono CV
    // correo CV
    // estado INT

    public Viaje(JSONObject data, Router router) {
        switch (data.getString("type")) {
            case "buscar":
                buscar(data, router);
                break;
        }
    }

    public void buscar(JSONObject obj, Router router) {
        JSONObject data = obj.getJSONObject("data");
        System.out.println(data.toString());
        ViajeHilo.buscar(data);
        
        
  
    }

}