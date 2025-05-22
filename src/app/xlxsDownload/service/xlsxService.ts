import XlsxDao from '../dao/xlsxDao';
import ExcelJS from 'exceljs'
import { Excel } from '../../model/interfaces';



class XlsxService extends XlsxDao {



    protected static async generarXlsx(): Promise<Buffer> {

        let tareas = await XlsxDao.obtenerTareasDao();

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
            }

        });

        const arrayBuffer = await workbook.xlsx.writeBuffer();
        const buffer = Buffer.from(arrayBuffer)
        return buffer


    }

    protected static async saveXlsxDb(archivo: Express.Multer.File) {
        const registros: Excel[] = [];

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(archivo.buffer as any);
        const hoja = workbook.worksheets[0];

        hoja.eachRow((row, rowNumber) => {

            if (rowNumber > 1) {
                const Nombre = row.getCell(1).value;
                const Fecha = row.getCell(2).value;
                const Estado = row.getCell(3).value;
            
                registros.push({nombre:Nombre,fecha:Fecha,estado:Estado});
            }

        });

        //console.log("registros",registros);

        XlsxDao.guardarExcelDao(registros);

    }





}
export default XlsxService;

