import { Response, NextFunction } from "express";
import { CustomRequest } from "../doc/@types/customRequest";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


class Seguridad {

    public verificarToken(req: CustomRequest, res: Response, next: NextFunction): any {
        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).json({
                mensaje: "Token no proporcionado",
            });
        }

        const token = header.startsWith("Bearer ")
            ? header.split(" ")[1]
            : header;

        try {
            const payload = jwt.verify(token, process.env.SECRET_KEY as string);
            req.body.usuario = payload;
            next();
        } catch (error) {
            return res.status(401).json({
                mensaje: "Token inválido o expirado",
            });
        }


    }

}
const seguridad = new Seguridad();
export default seguridad;
