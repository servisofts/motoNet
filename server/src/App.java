import Servisofts.Servisofts;
import model.Validators.Validator;
import model.viaje.ViajeActions;

public class App {
    public static void main(String[] args) {
        try {
            Servisofts.DEBUG = false;
            Servisofts.ManejadorCliente = ManejadorCliente::onMessage;
            Servisofts.Manejador = Manejador::onMessage;
            Servisofts.initialize();
            ViajeActions.resume();
            new Validator();
        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}