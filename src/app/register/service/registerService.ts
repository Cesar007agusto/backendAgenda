import bcrypt from 'bcryptjs';
import { User } from '../../model/interfaces';
import RegisterDao from '../dao/registerDao';


class RegisterService extends RegisterDao {

    protected static async registroservice(parametros: User) {

        const contrasenaHash = await bcrypt.hash(parametros.contrasena, 10);
        parametros.contrasena = contrasenaHash;

        return await RegisterDao.registrarUsuarioDao(parametros);

    }

}
export default RegisterService;
