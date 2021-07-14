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
    public static double distanciaCoord(double lat1, double lng1, double lat2, double lng2) {  
        //double radioTierra = 3958.75;//en millas  
        double radioTierra = 6371;//en kilómetros  
        double dLat = Math.toRadians(lat2 - lat1);  
        double dLng = Math.toRadians(lng2 - lng1);  
        double sindLat = Math.sin(dLat / 2);  
        double sindLng = Math.sin(dLng / 2);  
        double va1 = Math.pow(sindLat, 2) + Math.pow(sindLng, 2)  
                * Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2));  
        double va2 = 2 * Math.atan2(Math.sqrt(va1), Math.sqrt(1 - va1));  
        double distancia = radioTierra * va2;  
   
        return distancia*1000;  
    }  
}
