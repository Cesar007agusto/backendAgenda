import { Router } from "express";
import xlsxControlador from '../controller/xlsxControlador'
import multer from 'multer';

class XlsxRuta {

    public rutaXlsxAPI: Router;


    private upload = multer({ storage: multer.memoryStorage(),fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          cb(null, true); // Aceptar archivo .xlsx
        } else {
          cb(new Error('Solo se permiten archivos .xlsx'));
        }
      } });

    constructor() {
        this.rutaXlsxAPI = Router();
        this.configuracion();
    }

    

    public configuracion(): void {
        //http://localhost:3000/excel/getExcel
        this.rutaXlsxAPI.get("/getExcel", xlsxControlador.downloadXlsxControlador);
        //http://localhost:3000/excel/uploadExcel
        this.rutaXlsxAPI.post("/uploadExcel",this.upload.single('archivo.xlsx'),xlsxControlador.uploadXlsxControlador);

    }

}
const xlsxRuta = new XlsxRuta();
export default xlsxRuta.rutaXlsxAPI;