import multer, { FileFilterCallback } from 'multer';
import { Request, Response, NextFunction } from "express";

class ValidarXlsx {

    public validarFile() {
        const storage = multer.memoryStorage();

        const fileFilter = (req: Request,file: Express.Multer.File,cb: FileFilterCallback) => {
            if (
                file.mimetype ==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                cb(null, true); // Aceptado
            } else {
                cb(new Error('Solo se permiten archivos .xlsx'));
            }
        };

        const upload = multer({ storage, fileFilter });
        return upload.single('archivo');


    }



}
const validarXlsx = new ValidarXlsx();
export default validarXlsx;