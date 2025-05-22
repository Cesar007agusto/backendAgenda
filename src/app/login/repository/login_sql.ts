export const SQL_LOGIN = {

    VERIFICAR_USER:
        `SELECT nombre,correo,contrasena FROM usuarios
        WHERE correo = \${correo} `


}