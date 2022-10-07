-- View: public.view_tipo_viaje

DROP VIEW IF EXISTS public.view_viaje;
DROP VIEW IF EXISTS public.view_tipo_viaje;

CREATE OR REPLACE VIEW public.view_tipo_viaje
 AS
 SELECT tipo_viaje.key,
    tipo_viaje.descripcion,
    tipo_viaje.fecha_on,
    tipo_viaje.estado,
    jsonb_object_agg(tipo_tarifa.descripcion, to_json(tipo_viaje_tipo_tarifa.*)) AS tarifas
   FROM tipo_viaje
     LEFT JOIN tipo_viaje_tipo_tarifa ON tipo_viaje.key::text = tipo_viaje_tipo_tarifa.key_tipo_viaje::text
     LEFT JOIN tipo_tarifa ON tipo_viaje_tipo_tarifa.key_tipo_tarifa::text = tipo_tarifa.key::text
  WHERE tipo_viaje.estado > 0 AND tipo_viaje_tipo_tarifa.estado > 0 AND tipo_tarifa.estado > 0
  GROUP BY tipo_viaje.key
;

CREATE OR REPLACE VIEW public.view_viaje
 AS
   SELECT 
 		viaje.*, 
		array_to_json(array_agg(direccion.*)) as destinos
   FROM viaje
   LEFT JOIN direccion ON viaje.key = direccion.key_viaje
   group by viaje.key
;
