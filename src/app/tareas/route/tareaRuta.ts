import { Router } from "express";
import tareaControlador from "../controller/tareaControlador";
import seguridad from "../../../middleware/seguridad";

class TareaRuta {

    public rutaTareaAPI: Router;

    constructor() {
        this.rutaTareaAPI = Router();
        this.configuracion();
    }


    public configuracion(): void {
        //http://localhost:3000/tareas/paginate
        this.rutaTareaAPI.get("/paginate",tareaControlador.mostrarTareas);

        // http://localhost:3000/tareas/create
        this.rutaTareaAPI.post("/create",tareaControlador.crearTarea);

        //http://localhost:3000/tareas/delete
        this.rutaTareaAPI.delete("/delete/:codTarea", tareaControlador.eliminarTarea);

        //http://localhost:3000/tareas/update
        this.rutaTareaAPI.put("/update",tareaControlador.actualizarTarea);

        //http://localhost:3000/tareas/notificaciones
        this.rutaTareaAPI.get("/notificaciones",tareaControlador.notificaciones);


    }

}
const tareaRuta = new TareaRuta();
export default tareaRuta.rutaTareaAPI;