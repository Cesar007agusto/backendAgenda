export const SQL_REGISTER = {

    EXISTE_CORREO:
        `SELECT correo From usuarios
        WHERE correo = \${correo}`,


    EXISTE_NOMBRE:
        `SELECT nombre From usuarios
        WHERE nombre ILIKE \${nombre}`,

    REGISTRAR_USUARIO:
        `INSERT INTO usuarios (nombre,correo,contrasena) VALUES
        (\${nombre},\${correo},\${contrasena})`


}