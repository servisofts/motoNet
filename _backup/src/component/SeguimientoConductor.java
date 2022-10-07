package component;

import Seguimiento.SeguimientoHilo;
import Server.SSSAbstract.SSSessionAbstract;
import conexion.Conexion;

import java.sql.SQLException;

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
            case "getAll":
                getAll(data, session);
                break;
            case "startAll":
                startAll(data, session);
                break;
            case "stopAll":
                stopAll(data, session);
                break;
        }
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject objResp = Conexion.ejecutarFuncionObject("select get_conductores_activos_cercanos() as json");
            obj.put("data", objResp);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
        }
    }

    public void startAll(JSONObject obj, SSSessionAbstract session) {
        // SeguimientoHilo.setEscucha(session);

        // SocketCliete.send("usuario", obj, router);
    }

    public void stopAll(JSONObject obj, SSSessionAbstract session) {
        // SeguimientoHilo.removeEscucha(session);
        // SocketCliete.send("usuario", obj, router);

    }

}