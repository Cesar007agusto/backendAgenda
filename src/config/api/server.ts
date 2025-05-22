
import express from "express";
import morgan from "morgan";
import apiTarea from "../../app/tareas/route/tareaRuta";
import apiXlsx from "../../app/xlxsDownload/route/xlsxRuta";
import apiRegister from "../../app/register/route/registerRuta";
import apiLogin from "../../app/login/route/loginRuta";


import cors from 'cors';
class Server{

    public app =express.application;

    

    constructor(){
        
        this.app=express();
        this.loadConfiguration();
        this.corsConfiguration();
        this.cargarRutas();
      
    }

    corsConfiguration(){
        this.app.use(cors({
            origin:'http://localhost:8099',// Permite solicitudes desde el frontend
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas

        }))
    }

    loadConfiguration(){
        this.app.set("PORT",3000);
        this.app.use(morgan("dev"));
        this.app.use(express.json());
    }

    public cargarRutas(): void {
        this.app.use("/tareas",apiTarea);
        this.app.use("/excel",apiXlsx);
        this.app.use("/register",apiRegister);
        this.app.use("/login",apiLogin);
    
    }

    public iniciarServidor(): void {

        this.app.listen(this.app.get("PORT"), () => {
            console.log("servidor funcionando en el puerto: ", this.app.get("PORT"));
          });
        
    }




}
export default Server;