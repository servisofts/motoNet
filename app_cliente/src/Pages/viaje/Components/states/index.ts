import cancelado from "./cancelado"
import no_conductor_disponible from "./no_conductor_disponible"
import buscando_conductor from "./buscando_conductor"
import en_negociacion from "./en_negociacion"
import inicio_viaje from "./inicio_viaje"
export default {
    cancelado,
    no_conductor_disponible,
    buscando_conductor,
    "notificando_conductor":buscando_conductor,
    en_negociacion,
    inicio_viaje
}