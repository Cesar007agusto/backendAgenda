import { SQL_xlxs } from '../repository/xlsx_sql'
import pool from '../../../config/connexion/connexionDB'
import { Tarea } from '../../model/interfaces'
import MetodosLogic from '../../tareas/controller/metodos.logic';
import { Excel } from '../../model/interfaces';

class XlsxDao {

    protected static async obtenerTareasDao(): Promise<Tarea[]> {

        return pool.task(async (consulta) => {

            let tareas = await consulta.query(SQL_xlxs.OBTENER_TAREAS);

            tareas.map((tarea: Tarea) => {

                tarea.fecha = MetodosLogic.quitarHora(tarea.fecha);
                tarea.fecha = MetodosLogic.formatoFecha(tarea.fecha);
                return tarea;
            });

            return tareas;


        });


    }

    protected static async guardarExcelDao(parametros:any){
        for(const p of parametros ){
            await pool.none(SQL_xlxs.INSERTAR_EXCEL,[p.nombre,p.fecha,p.estado]);
            console.log("parametro dao",p.nombre,p.fecha,p.estado);

        }


    }


}
export default XlsxDao;
