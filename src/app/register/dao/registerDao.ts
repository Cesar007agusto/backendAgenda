import { SQL_REGISTER } from "../repository/register_sql";
import pool from "../../../config/connexion/connexionDB";
import { User } from '../../model/interfaces';


class RegisterDao {

    public  async registrarUsuarioDao(parametros: User): Promise<any> { 
        const objetoValidations = {
            correo: "",
            nombre: "",
            succes: ""
        };

        const correoResult = await pool.oneOrNone(SQL_REGISTER.EXISTE_CORREO, parametros);
        const nombreResult = await pool.oneOrNone(SQL_REGISTER.EXISTE_NOMBRE, parametros);

        if (correoResult || nombreResult !== null) {

            if (correoResult !== null) {
                //console.log("el correo ya existe");

                objetoValidations.correo = "el correo ya existe";

            } if (nombreResult !== null) {
                //console.log("el nombre de usuario ya existe");

                objetoValidations.nombre = "el nombre de usuario ya existe";

            }
            return objetoValidations;

        } else {
            pool.none(SQL_REGISTER.REGISTRAR_USUARIO, parametros);
            //console.log("User registered");
            objetoValidations.succes = " Nuevo Usuario Creado";

            return objetoValidations;
        }

    }

}
const registerDao = new RegisterDao();
export default registerDao;