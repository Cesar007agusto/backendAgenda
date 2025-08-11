export interface Tarea {
    cod_tarea: number;
    cod_usuario:number;
    nombre: string;
    fecha: string;
    estado: string;
}

export interface Excel{
    nombre:any;
    fecha:any;
    estado:any;
    cod_usuario:any;
    
}

export interface User {
    nombre: string;
    correo: string;
    contrasena: string;
}
