import { Request, Response } from "express";
import LoginService from "../service/loginservice";
import { User } from "../../model/interfaces";


class LoginController extends LoginService {

    public async validarUsuarioController(req: Request, res: Response) {

        const nombre = "";
        const correo = req.body.correo;
        const contrasena = req.body.contrasena;

        const objUser: User = { nombre, correo, contrasena };
        try {
            const respuesta = await LoginService.validarUsuarioService(objUser);
            console.log("respuesta en controller ", respuesta);
            if (typeof respuesta === "string") {

                res.status(200).json({token: respuesta});

            }else{
                res.status(401).json(respuesta);
            }



        } catch (error) {
            res.status(400).json({ mensaje: "error al logearse" });
        }

    }
}
const loginController = new LoginController();
export default loginController;
