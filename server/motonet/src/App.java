import Config.Config;
import SSL.SSL;
import SocketCliente.SocketCliete;
import conexion.Conexion;

public class App {
    
    public static void main(String[] args) throws Exception {
        System.out.println("Iniciando server servisofts");
        if (!Config.validate()) {
            System.out.println("Server closed.");
            return;
        }
        SSL.getKeyStore();

        // Registrar mi certificado default si no existe
        if (!SSL.defaultCert()) {
            System.out.println("Server closed.");
            return;
        }

        //Cargar el pem del servidor
        if (!SSL.servicioCert()) {
            System.out.println("Server closed.");
            return;
        }
        System.out.println(SSL.getPem(SSL.getCert("motonet")));
        SocketCliete.enableReconect(true);
        SocketCliete.Start(Config.getJSON("socket_client").getJSONObject("servicio"));
        Conexion.setConexion(Config.getJSON("data_base"));
    }
}
