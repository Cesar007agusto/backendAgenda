import { Request, Response } from "express";
import LoginService from "../service/loginservice";
import { User } from "../../model/interfaces";


class LoginController extends LoginService {

    validarUsuarioController(req: Request, res: Response) {

        const nombre = "";
        const correo = req.body.correo;
        const contrasena = req.body.contrasena;
        const objUser: User = { nombre, correo, contrasena };

        LoginService.validarUsuarioService(objUser);

        res.status(200).json({ mensaje: "Probando Usuario" });

    }
}
const loginController = new LoginController();
export default loginController;
