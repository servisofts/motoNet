SELECT
    viaje.*,
    viaje_movimiento.obj as movimientos,
    direccion.obj as destinos
FROM
    viaje
    LEFT JOIN (
        SELECT
            key_viaje,
            array_to_json(array_agg(viaje_movimiento.* ORDER BY viaje_movimiento.fecha_on DESC)) as obj
        FROM
            viaje_movimiento
        GROUP BY
            (key_viaje)) viaje_movimiento ON viaje.key = viaje_movimiento.key_viaje
    LEFT JOIN (
        SELECT
            key_viaje,
            array_to_json(array_agg(direccion.* ORDER BY direccion.tipo DESC)) as obj
        FROM
            direccion
        GROUP BY
            (key_viaje)) direccion ON viaje.key = direccion.key_viaje
