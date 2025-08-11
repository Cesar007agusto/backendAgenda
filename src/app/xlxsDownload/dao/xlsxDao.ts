import { SQL_xlxs } from '../repository/xlsx_sql'
import pool from '../../../config/connexion/connexionDB'
import { Tarea } from '../../model/interfaces'
import MetodosLogic from '../../tareas/controller/metodos.logic';


class XlsxDao {

    public async obtenerTareasDao(parametros:any): Promise<Tarea[]> {
        

        return pool.task(async (consulta) => {

            let tareas = await consulta.query(SQL_xlxs.OBTENER_TAREAS,parametros);
        
            tareas.map((tarea: Tarea) => {

                tarea.fecha = MetodosLogic.quitarHora(tarea.fecha);
                tarea.fecha = MetodosLogic.formatoFecha(tarea.fecha);
                return tarea;
            });
            
            return tareas;


        });


    }

    public async guardarExcelDao(parametros:any){
        for(const p of parametros ){
            await pool.none(SQL_xlxs.INSERTAR_EXCEL,[p.nombre,p.fecha,p.estado,p.cod_usuario]);
            console.log("parametro dao",p.nombre,p.fecha,p.estado);

        }


    }


}
const xlsxDao = new XlsxDao();
export default xlsxDao;
