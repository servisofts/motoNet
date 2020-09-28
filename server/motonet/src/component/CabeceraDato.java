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

public class CabeceraDato {

    public CabeceraDato(JSONObject data, Router router) {
        switch (data.getString("type")) {
            default:
                defaultType(data, router);
        }
    }

    public void defaultType(JSONObject obj, Router router) {       
        SocketCliete.send("usuario", obj, router);
    }
}