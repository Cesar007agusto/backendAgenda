import { Request, Response } from "express";
import xlsxService from "../service/xlsxService";
import { CustomRequest } from "../../../doc/@types/customRequest";


class XlsxController  {

    public async downloadXlsxControlador(req: CustomRequest, res: Response) {
        
        const codUsuario =req.usuario.codUsuario;
        
        
        try {


            const archivoExcelBuffer = await xlsxService.generarXlsx(codUsuario);
            res.setHeader('Content-Disposition', 'attachment; filename="fileTareas.xlsx"'); // Nombre del archivo para descargar
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo de archivo Excel
            res.status(200).send(archivoExcelBuffer);



        } catch (error) {
            res.status(400).json({ err: error })
        }

    }

    public async uploadXlsxControlador(req: CustomRequest, res: Response) {
        const codUsuario =req.usuario.codUsuario;
        
        try {
            const archivo = req.file;
            if (!archivo) {
                res.status(400).json({ mensaje: 'No se recibió el archivo.',succes:0 });
                return;
            }else{
                xlsxService.saveXlsxDb(archivo,codUsuario);
                res.status(200).json({mensaje:'archivo recibido',succes:1});

                
            }


        } catch (error) {
            res.status(400).json({ err: error })
        }

    }



}
const xlsxController = new XlsxController();
export default xlsxController;