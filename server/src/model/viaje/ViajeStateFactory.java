package model.viaje;

import model.viaje.states.*;

public class ViajeStateFactory {

    public static enum ViajeStateType {
        no_registrado,
        buscando_conductor,
        notificando_conductor,
        cancelado,
        no_conductor_disponible,
        en_negociacion,
        inicio_viaje,
        fin_viaje,
        conductor_llego
    }

    public static Class[] clases = new Class[] {
            no_registrado.class,
            buscando_conductor.class,
            notificando_conductor.class,
            cancelado.class,
            no_conductor_disponible.class,
            en_negociacion.class,
            inicio_viaje.class,
            fin_viaje.class,
            conductor_llego.class
    };

    public static ViajeState create(Viaje pedido, ViajeStateType state) throws Exception {
        for (Class class1 : clases) {
            if (state.name().equals(class1.getSimpleName())) {
                return (ViajeState) class1.getConstructors()[0].newInstance(pedido, class1.getSimpleName());
            }
        }
        throw new Exception("State not found, verify if your state exist");
    }
}
