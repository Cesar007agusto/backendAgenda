import { SQL_TAREAS } from "./../repository/tareas_sql";
import pool from "../../../config/connexion/connexionDB";


class TareasDao {
  //obtener registros
  public async obtenerTareasDao(parametros:any): Promise<any> {
    

    const salida = await pool.task(async (consulta) => {

      const registros = await consulta.result(SQL_TAREAS.OBTENER_TAREAS,parametros);

      // Aquí extraemos solo las filas (registros) que contienen los datos de las tareas, se eliminan metadatos
      const tareas = registros.rows.map((tarea: any) => ({
        nombre: tarea.nombre,
        fecha: tarea.fecha,
        estado: tarea.estado,
        codTarea: tarea.cod_tarea,
        codUsuario: tarea.cod_usuario,
      }));

      return tareas;
    });
    return salida;

  }


  public  async crearTareaDao(parametros: any): Promise<any> {
    const salida: any = [];
    await pool.task(async (Query) => {
      const nombre = await Query.one(SQL_TAREAS.INSERTAR_TAREA, parametros);
      salida.push(nombre);

    })

    return salida;

  }

  public  async eliminartareaDao(codTarea: number): Promise<{ nombre: string }> {

    return  pool.task((Query) => {
      return  Query.one(SQL_TAREAS.ELIMINAR_TAREA, codTarea);

    })
  }


  public  async actualizarTareaDao(parametros:any): Promise<any> {
    return pool.task((Query)=>{
      return Query.one(SQL_TAREAS.ACTUALIZAR_TAREA,parametros);
    });


  }

  public  async notificacionesDao(parametros:any):Promise<any>{
    return pool.task(async (Query)=>{

      await Query.query("SET TIME ZONE 'America/Bogota'");
      return Query.manyOrNone(SQL_TAREAS.TAREAS_PARA_HOY,parametros);

    });

  }



}

const tareasDao = new TareasDao();
export default tareasDao;