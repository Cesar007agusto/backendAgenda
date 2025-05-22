import { Request, Response } from "express";
import RegisterService from "../service/registerService";
import { User } from '../../model/interfaces';

class RegisterController extends RegisterService {

    public async registerUserController(req: Request, res: Response) {
        try {
            const nombre = req.body.nombre;
            const correo = req.body.correo;
            const contrasena = req.body.contrasena;
            const parametros: User = { nombre, correo, contrasena };

            
            res.status(200).json(await RegisterService.registroservice(parametros));

        } catch (error) {
            console.error(error);
            res.status(400).json({ mensaje: "error en el controller" });
        }

    }


}
const registercontroller = new RegisterController();
export default registercontroller;
