export const SQL_xlxs = {
    
    OBTENER_TAREAS:
        `SELECT t.cod_tarea,t.cod_usuario,t.nombre,t.fecha,t.estado
        FROM tareas t 
        ORDER BY fecha ASC `,

    INSERTAR_EXCEL:
    `INSERT INTO tareas (nombre, fecha, estado)
    VALUES ($1,$2,$3)`


}
