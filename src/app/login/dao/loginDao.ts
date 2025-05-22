import pool from "../../../config/connexion/connexionDB";
import { User } from "../../model/interfaces";
import { SQL_LOGIN } from "../repository/login_sql";


class LoginDao{

    static async validarUsuarioDao(parametros:User){

        const usuariobd = await pool.oneOrNone(SQL_LOGIN.VERIFICAR_USER,parametros);
        //si no hay datos es null. si hay me regresa el correo y contraseña en la bd
        //console.log("usuario en db ",usuariobd?.correo);
        return usuariobd;


    }

}
export default LoginDao;