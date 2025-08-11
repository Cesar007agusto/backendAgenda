import bcrypt from 'bcryptjs';
import { User } from '../../model/interfaces';
import registerDao from '../dao/registerDao';


class RegisterService {

    public  async registroservice(parametros: User) {

        const contrasenaHash = await bcrypt.hash(parametros.contrasena, 10);
        parametros.contrasena = contrasenaHash;

        return await registerDao.registrarUsuarioDao(parametros);

    }

}
const registerService = new RegisterService();
export default registerService;
