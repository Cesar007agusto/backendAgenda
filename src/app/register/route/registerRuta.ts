import { Router } from "express";
import registercontroller from "../controller/registerControlador";

class RegisterRuta{

    public rutaRegisterApi: Router;

    constructor(){
        this.rutaRegisterApi= Router();
        this.configuracion();
    }

    configuracion():void{
        //http://localhost:3000/register/registro
        this.rutaRegisterApi.post("/registro",registercontroller.registerUserController);


    }

}
const registerRuta = new RegisterRuta();
export default registerRuta.rutaRegisterApi;
