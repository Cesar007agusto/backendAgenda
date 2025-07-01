import bcrypt from 'bcryptjs';
import { User } from "../../model/interfaces";
import LoginDao from "../dao/loginDao";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


class LoginService extends LoginDao {


    static async validarUsuarioService(parametros: User) {

        const usuariobd = await LoginDao.validarUsuarioDao(parametros);

        if (usuariobd !== null) {
            const valida = await bcrypt.compare(parametros.contrasena, usuariobd?.contrasena);
            if (valida == true) {
                //generar jwt
                const clave = process.env.SECRET_KEY;

                const payload = {
                    nombre: usuariobd.nombre,
                    correo: usuariobd.correo
                };
                if (!clave) {
                    console.log('SECRET_KEY no definida');
                } else {
                    const token = jwt.sign(payload, clave, { expiresIn: '30m' });
                    console.log('Token generado:', token);
                    return token;
                }

            }else{
                console.log("contraseña incorrecta");
                return {mensaje:"contraseña incorrecta"};
            }

        } else {
            console.log("Usuario no existe");
            return {mensaje:"Usuario no existe"};
        }
    }


}
export default LoginService;