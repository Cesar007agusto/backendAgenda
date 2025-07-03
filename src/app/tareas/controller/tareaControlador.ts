import { Request, Response } from "express";
import MetodosLogic from "../controller/metodos.logic";
import TareasDao from "../dao/tareasDao";
import { CustomRequest } from "../../../doc/@types/customRequest";


class TareaController extends TareasDao {

  public async mostrarTareas(req: CustomRequest, res: Response): Promise<void> {
    const codUsuario =req.body.usuario.codUsuario;


    try {
      const tareas = await TareaController.obtenerTareasDao(codUsuario);

      tareas.map((tarea: any) => {

        tarea.fecha = MetodosLogic.quitarHora(tarea.fecha);
        tarea.fecha = MetodosLogic.formatoFecha(tarea.fecha);
        return tarea;
      });
      
      res.status(200).json({ tareas });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "error en la respuestass" });
    }

  }

  public async crearTarea(req: CustomRequest, res: Response): Promise<void> {

    const name = req.body.nombre;
    const date = req.body.fecha;
    const state = req.body.estado;

    const codUser=req.body.usuario.codUsuario;
    
    const parametros = [name, date, state,codUser];


    try {
      const resultado = await TareaController.crearTareaDao(parametros);
      res.status(200).json({ Respuesta: `La Tarea con nombre  ${resultado[0].nombre} fue registrada con exito`,mensaje:1 });

    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "error al crear el registro",mensaje:0 });
    }

  }

  public async eliminarTarea(req: Request, res: Response) {
    try {
      const codTarea = Number(req.params.codTarea);
      const nombreTarea = await TareaController.eliminartareaDao(codTarea);

      res.status(200).json({ Message: 'Tarea eliminada con éxito desde el back', Name: nombreTarea.nombre,respuesta:1});

    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "error al eliminar la Tarea",respuesta:0 });
    }

  }

  public async actualizarTarea(req: Request, res: Response) {
    const nombre = req.body.nombre;
    const fecha = req.body.fecha;
    const estado = req.body.estado;
    const codTarea = req.body.codTarea;
    console.log("cod tarea en controller ",codTarea);
    const parametros = [nombre, fecha, estado, codTarea];
    try {
      await TareaController.actualizarTareaDao(parametros);
      res.status(200).json({ mensaje: `Se actualizo la tarea ${nombre}`,respuesta:1 });

    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "error al actualizar la Tarea",respuesta:0 });
    }

  }

  public async notificaciones(req: CustomRequest, res: Response){
    const codUser= req.body.usuario.codUsuario;
    try {
      const registros = await TareaController.notificacionesDao(codUser);
      res.status(200).json(registros);

    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "error al obtener las notificaciones" });
    }

  }




}
const tareaController = new TareaController();
export default tareaController;