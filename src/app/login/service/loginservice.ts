import bcrypt from 'bcryptjs';
import { User } from "../../model/interfaces";
import loginDao from '../dao/loginDao';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


class LoginService {


    public async validarUsuarioService(parametros: User) {

        const usuariobd = await loginDao.validarUsuarioDao(parametros);

        if (usuariobd !== null) {
            const valida = await bcrypt.compare(parametros.contrasena, usuariobd?.contrasena);
            if (valida == true) {
                //generar jwt
                const clave = process.env.SECRET_KEY;

                const payload = {
                    nombre: usuariobd.nombre,
                    correo: usuariobd.correo,
                    codUsuario: usuariobd.cod_usuario,
                    rol: usuariobd.rol
                };
                if (!clave) {
                    console.log('SECRET_KEY no definida');
                } else {
                    const token = jwt.sign(payload, clave, { expiresIn: '10m' });
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
const loginService = new LoginService();
export default loginService;