package Viaje;

import java.sql.SQLException;

import org.json.JSONObject;

import conexion.Conexion;

public class LatLng {

    public static JSONObject buscarLatLng(double lat, double lng, int radio, String table_name) throws SQLException {
        String consulta = "SELECT to_json(calculo.*) as json FROM (\n" + "SELECT \n" + "|/ (((" + lat + " - ver.latitude) ^ 2) + (("
                + lng + " - ver.longitude) ^ 2)) AS resultado,\n" + "ver.*\n" + "FROM\n" + table_name+" ver) calculo\n"
                + "WHERE\n" + "calculo.resultado <= ((0.000009) * (" + radio + ")) limit 1";
        return Conexion.ejecutarConsultaObject(consulta);
    }
    
}
