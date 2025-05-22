import { Request, Response } from "express";
import XlsxService from "../service/xlsxService";


class XlsxController extends XlsxService {

    public async downloadXlsxControlador(req: Request, res: Response) {
        try {


            const archivoExcelBuffer = await XlsxController.generarXlsx();
            res.setHeader('Content-Disposition', 'attachment; filename="fileTareas.xlsx"'); // Nombre del archivo para descargar
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo de archivo Excel
            res.status(200).send(archivoExcelBuffer);



        } catch (error) {
            res.status(400).json({ err: error })
        }

    }

    public async uploadXlsxControlador(req: Request, res: Response) {
        try {
            const archivo = req.file;
            if (!archivo) {
                res.status(400).json({ mensaje: 'No se recibió el archivo.',succes:0 });
                return;
            }else{
                XlsxController.saveXlsxDb(archivo);
                res.status(200).json({mensaje:'archivo recibido',succes:1});

                
            }


        } catch (error) {
            res.status(400).json({ err: error })
        }

    }



}
const xlsxController = new XlsxController();
export default xlsxController;