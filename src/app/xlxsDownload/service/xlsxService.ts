
import ExcelJS from 'exceljs'
import { Excel } from '../../model/interfaces';
import xlsxDao from '../dao/xlsxDao';
import { CustomRequest } from '../../../doc/@types/customRequest';


class XlsxService {



    public async generarXlsx(parametros:any): Promise<Buffer> {

        let tareas = await xlsxDao.obtenerTareasDao(parametros);
        console.log("en seervice ",tareas);

        // Crear un nuevo libro
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Hoja1');

        // Agregar columnas
        worksheet.columns = [
            { header: 'Nombre', key: 'nombre', width: 20 },
            { header: 'Fecha', key: 'fecha', width: 20 },
            { header: 'Estado', key: 'estado', width: 10 },
        ];

        tareas.forEach((tarea, index) => {

            if (tarea.estado === '0') {
                worksheet.addRow({ nombre: tarea.nombre, fecha: tarea.fecha, estado: 'Sin estado' });
            } else if (tarea.estado === '1') {
                worksheet.addRow({ nombre: tarea.nombre, fecha: tarea.fecha, estado: 'Pendiente' });
            } else if (tarea.estado === '2') {
                worksheet.addRow({ nombre: tarea.nombre, fecha: tarea.fecha, estado: 'En proceso' });
            } else if (tarea.estado === '3') {
                worksheet.addRow({ nombre: tarea.nombre, fecha: tarea.fecha, estado: 'Terminado' });
            }else{
                worksheet.addRow({ nombre: tarea.nombre, fecha: tarea.fecha, estado: 'Sin estado' });
            }

        });

        const arrayBuffer = await workbook.xlsx.writeBuffer();
        const buffer = Buffer.from(arrayBuffer)
        return buffer


    }

    public async saveXlsxDb(archivo: Express.Multer.File,codUser:any) {
        const registros: Excel[] = [];
    
        

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(archivo.buffer as any);
        const hoja = workbook.worksheets[0];

        hoja.eachRow((row, rowNumber) => {

            if (rowNumber > 1) {
                const Nombre = row.getCell(1).value;
                const Fecha = row.getCell(2).value;
                const Estado = row.getCell(3).value;
            
                registros.push({nombre:Nombre,fecha:Fecha,estado:Estado,cod_usuario:codUser});
            }

        });

        //console.log("registros",registros);

        xlsxDao.guardarExcelDao(registros);

    }





}
const xlsxService = new XlsxService();
export default xlsxService;

