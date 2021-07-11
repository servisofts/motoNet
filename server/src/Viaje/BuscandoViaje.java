package Viaje;

import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import component.Viaje;
import conexion.Conexion;

public class BuscandoViaje extends Thread {

    private JSONObject viaje;
    private JSONArray conductores_cercanos;
    private boolean isRun;
    private int cantidadIntentos;

    public BuscandoViaje(JSONObject viaje) {
        this.viaje = viaje;
        this.iniciarBuscar();
    }

    public void setViaje(JSONObject viaje) {
        this.viaje = viaje;
    }

    public String getKey() {
        return viaje.getString("key");
    }

    public int getParametro(String key) {
        return viaje.getJSONObject("parametros").getInt(key);
    }

    public boolean existeMovimiento(String key) {
        return viaje.getJSONObject("movimientos").has(key);
    }

    public JSONObject getMovimiento(String key) {
        return viaje.getJSONObject("movimientos").getJSONObject(key);
    }

    public void iniciarBuscar() {
        this.isRun = true;
        this.cantidadIntentos = getParametro("Cantidad de intentos busqueda");
        this.start();
    }

    public void updateViaje() {
        try {
            this.viaje = Viaje.getViajeFormat(this.getKey());
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }

    public void notificarConductorNoEncontrado() {
        try {
            this.updateViaje();
            while (this.existeMovimiento(Viaje.TIPO_NEGOCIACION_CONDUCTOR)
                    && !this.existeMovimiento(Viaje.TIPO_INICIO_VIAJE) && this.viaje.getInt("estado") == 1) {
                System.out.println("EL VIAJE SE ENCUENTRA EN UNA OFERTA ESPERANDO");
                this.sleep(2);
                this.updateViaje();
            }
            if (!this.existeMovimiento(Viaje.TIPO_INICIO_VIAJE)
                    && !this.existeMovimiento(Viaje.TIPO_CANCELO_BUSQUEDA)) {
                Viaje.nuevoMovimientoViaje(this.viaje.getString("key"), Viaje.TIPO_SIN_CONDUCTOR,
                        this.viaje.getString("key_usuario"));
                Conexion.ejecutarUpdate(
                        "UPDATE viaje SET estado = 0 WHERE key = '" + this.viaje.getString("key") + "'");
                this.updateViaje();
                JSONObject objAlert = new JSONObject();
                objAlert.put("component", "viaje");
                objAlert.put("type", "sinConductores");
                objAlert.put("data", this.viaje);
                objAlert.put("estado", "exito");
                SSServerAbstract.sendUser(objAlert.toString(), this.viaje.getString("key_usuario"));
                System.out.println("NO SE ENCONTRO CONDUCTOR ");
            }
        } catch (JSONException | SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public void solicitarViajeConductor(JSONObject conductor) {
        try {
            Viaje.nuevoMovimientoViaje(this.getKey(), Viaje.TIPO_NOTIFICO_CONDUCTOR,
                    conductor.getString("key_usuario"));
            this.updateViaje();
            JSONObject objSend = new JSONObject();
            objSend.put("component", "viaje");
            objSend.put("type", "viajeEntrante");
            objSend.put("estado", "exito");
            objSend.put("data", this.viaje);
            SSServerAbstract.sendUser(objSend.toString(), conductor.getString("key_usuario"));
            System.out.println("SE NOTIFICO AL CONDUCTOR " + conductor.getString("key_usuario"));
        } catch (JSONException | SQLException e) {
            e.printStackTrace();
        }
    }

    public JSONArray getConductoresCercanos(JSONObject direccion) {
        try {
            int LIMITE = 10;
            int radioDeBusqueda = getParametro("Distancia minima permitida para recibir viaje como conductor");
            String consulta = "SELECT array_to_json(array_agg(calculo.*)) as json FROM (\n" + "SELECT \n" + "|/ ((("
                    + direccion.getDouble("latitude") + " - ver.latitude) ^ 2) + ((" + direccion.getDouble("longitude")
                    + " - ver.longitude) ^ 2)) AS resultado,\n" + "ver.*\n" + "FROM conductor_activo ver) calculo\n"
                    + "WHERE\n" + "calculo.resultado <= ((0.000009) * (" + radioDeBusqueda + ")) limit " + LIMITE;

            return Conexion.ejecutarConsultaArray(consulta);
        } catch (Exception e) {
            System.out.println("error la optener conductores cercanos");
            return null;
        }
    }

    @Override
    public void run() {
        while (isRun) {
            if (this.cantidadIntentos > 0) {
                this.cantidadIntentos -= 1;
            } else {
                isRun = false;
                continue;
            }
            System.out.println("Iniciando intento #" + this.cantidadIntentos);
            this.conductores_cercanos = getConductoresCercanos(this.viaje.getJSONObject("direccion_inicio"));
            JSONObject conductor;
            for (int i = 0; i < this.conductores_cercanos.length(); i++) {
                this.updateViaje();
                while (this.existeMovimiento(Viaje.TIPO_NEGOCIACION_CONDUCTOR)
                        && !this.existeMovimiento(Viaje.TIPO_INICIO_VIAJE) && this.viaje.getInt("estado") == 1) {
                    System.out.println("EL VIAJE SE ENCUENTRA EN UNA OFERTA ESPERANDO");
                    this.sleep(2);
                }
                if (this.existeMovimiento(Viaje.TIPO_CANCELO_BUSQUEDA)) {
                    isRun = false;
                    System.out.println("La busqueda fue cancelada kill hilo");
                    i = this.conductores_cercanos.length();
                    continue;
                }
                if (this.existeMovimiento(Viaje.TIPO_INICIO_VIAJE)) {
                    isRun = false;
                    System.out.println("EL viaje ya fue confirmado");
                    i = this.conductores_cercanos.length();
                    continue;
                }
                conductor = this.conductores_cercanos.getJSONObject(i);
                this.solicitarViajeConductor(conductor);
                this.sleep(this.getParametro("Tiempo permitido para aceptar viaje conductor"));

            }
        }
        this.notificarConductorNoEncontrado();
        ViajeHilo.removerViaje(this.getKey());

    }

    public void sleep(int time) {
        try {
            Thread.sleep(time * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
