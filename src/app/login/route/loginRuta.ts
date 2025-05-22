import { Router } from "express";
import loginController from "../controller/loginControlador";

class LoginRuta{
    public rutaLoginApi: Router;

    constructor(){
        this.rutaLoginApi=Router();
        this.configuracion();
    }

    configuracion():void{
        //http://localhost:3000/login/validar
        this.rutaLoginApi.post("/validar",loginController.validarUsuarioController);
    }

}
const loginRuta = new LoginRuta();
export default loginRuta.rutaLoginApi;