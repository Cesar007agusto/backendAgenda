export const SQL_xlxs = {
    
    OBTENER_TAREAS:
        `SELECT t.cod_tarea,t.cod_usuario,t.nombre,t.fecha,t.estado
        FROM tareas t
        WHERE cod_usuario =$1
        ORDER BY fecha ASC
        `,

    INSERTAR_EXCEL:
    `INSERT INTO tareas (nombre, fecha, estado,cod_usuario)
    VALUES ($1,$2,$3,$4)`


}
