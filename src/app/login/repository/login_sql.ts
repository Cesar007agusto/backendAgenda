export const SQL_LOGIN = {

    VERIFICAR_USER:
        `SELECT nombre,correo,contrasena,cod_usuario,rol
        FROM usuarios
        WHERE correo = \${correo} `


}