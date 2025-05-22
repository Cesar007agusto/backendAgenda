
declare module 'xlsx-populates' {
    interface Cell {
      value(): any;
      value(val: any): Cell;
    }
  
    interface Sheet {
      cell(ref: string): Cell;
    }
  
    interface Workbook {
      sheet(index: number): Sheet;
      toFileAsync(path: string): Promise<void>;
      outputAsync(): Promise<Buffer>;
    }
  
    interface XlsxPopulate {
      fromBlankAsync(): Promise<Workbook>;
      fromFileAsync(path: string): Promise<Workbook>;
    }
  
    const XlsxPopulate: XlsxPopulate;
    export default XlsxPopulate;
  }