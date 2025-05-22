export const SQL_TAREAS = {


  OBTENER_TAREAS:
    //Where cod_usuario =
    "SELECT t.cod_tarea,t.cod_usuario,t.nombre,t.fecha,t.estado\
      FROM tareas t \
      ORDER BY fecha ASC \
      ",

  INSERTAR_TAREA:
    `INSERT INTO tareas (nombre,fecha,estado)
      VALUES ($1,$2,$3)
      RETURNING nombre
      `,

  ELIMINAR_TAREA:
    `DELETE FROM tareas
      WHERE cod_tarea =$1
      RETURNING nombre
      `,

  ACTUALIZAR_TAREA:
    `UPDATE tareas
      SET nombre = $1, 
      fecha = $2, 
      estado = $3
      WHERE cod_tarea = $4 
      RETURNING nombre`,

  TAREAS_PARA_HOY:
  `SELECT *
   FROM tareas
   WHERE fecha = CURRENT_DATE`

}