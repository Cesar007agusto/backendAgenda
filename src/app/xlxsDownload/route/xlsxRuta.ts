import { Router } from "express";
import xlsxControlador from '../controller/xlsxControlador'
import validarXlsx from "../../../middleware/verificarXlsx";
import seguridad from "../../../middleware/seguridad";

class XlsxRuta {

    public rutaXlsxAPI: Router;

    constructor() {
        this.rutaXlsxAPI = Router();
        this.configuracion();
    }

    

    public configuracion(): void {
        //http://localhost:3000/excel/getExcel
        this.rutaXlsxAPI.get("/getExcel",seguridad.verificarToken, xlsxControlador.downloadXlsxControlador);
        //http://localhost:3000/excel/uploadExcel
        this.rutaXlsxAPI.post("/uploadExcel",seguridad.verificarToken,validarXlsx.validarFile(),xlsxControlador.uploadXlsxControlador);

    }

}
const xlsxRuta = new XlsxRuta();
export default xlsxRuta.rutaXlsxAPI;