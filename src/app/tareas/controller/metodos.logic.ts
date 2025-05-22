export default class MetodosLogic {
    //metodo quitar la hora
    public static quitarHora(fecha: string): string {
        const fechaObjeto = new Date(fecha); // Convertimos la cadena en un objeto Date
        const fechaISO = fechaObjeto.toISOString().split("T")[0]; // Convertimos a string en formato YYYY-MM-DD
        return fechaISO;
    }

    //metodo formatear fecha
    public static formatoFecha(fecha: string): string {
        const fechaPartes = fecha.split("-"); // Dividimos la fecha en [YYYY, MM, DD]
        return `${fechaPartes[2]}/${fechaPartes[1]}/${fechaPartes[0]}`; // Formato DD/MM/YYYY
    }

}