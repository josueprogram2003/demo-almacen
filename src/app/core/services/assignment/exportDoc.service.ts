import { Injectable } from '@angular/core';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import mammoth from 'mammoth';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { uuidv7 } from 'uuidv7';



@Injectable({
  providedIn: 'root'
})
export class ExportDocService {

  constructor() { }




  async loadFile(blob: Blob, data: any): Promise<Blob | null> {
    if (!blob || blob.type !== 'application/octet-stream') {
      console.error('El archivo no es un Blob válido o tiene un tipo inesperado');
      return null;
    }

    const reader = new FileReader();

    try {
      return await new Promise<Blob | null>((resolve, reject) => {
        reader.onload = async (e: any) => {
          try {
            const arrayBuffer = e.target.result;
            const modifiedBlob = await this.modifyDocx(arrayBuffer, data);
            if (modifiedBlob) {
              resolve(modifiedBlob);
            } else {
              console.error('No se pudo modificar el documento.');
              resolve(null);
            }
          } catch (error) {
            console.error('Error al modificar el documento:', error);
            reject(error);
          }
        };

        reader.onerror = (error) => {
          console.error('Error al leer el archivo:', error);
          reject(error);
        };

        reader.readAsArrayBuffer(blob);
      });
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
      return null;
    }
  }

  async modifyDocx(arrayBuffer: ArrayBuffer, data: any): Promise<Blob | null> {
    try {
      const zip = new PizZip(arrayBuffer);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: {
          start: '{{',
          end: '}}',
        },
      });

      await doc.renderAsync(data);

      const modifiedDocx = doc.getZip().generate({ type: 'blob' });

      return modifiedDocx;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al modificar el documento:', error.message);
      } else {
        console.error('Error desconocido al modificar el documento:', error);
      }
      return null;
    }
  }

  downloadDocx(blob: Blob) {
    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = 'PRESTAMO_DE_EQUIPOS.docx';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  prepareDocx(blob: Blob): File {
    const id = uuidv7();
    const docxFile = new File(
      [blob],
      `${id}.docx`,
      { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
    );
    return docxFile;
  }


  formatDate(date: Date): string {
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };





  async convertDocxToPdf(docxBlob: Blob): Promise<Blob> {
        const pdfMakeModule = await import('pdfmake/build/pdfmake');
  const pdfFontsModule = await import('pdfmake/build/vfs_fonts');

  (pdfMakeModule as any).vfs = pdfFontsModule.vfs;
    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.onload = (e: any) => {
        const arrayBuffer = e.target.result;

        // Extraer el texto del .docx usando Mammoth.js
        mammoth.extractRawText({ arrayBuffer: arrayBuffer })
          .then((result) => {
            const text = result.value; // Texto extraído del documento

            // Definir el contenido del PDF
            const docDefinition: TDocumentDefinitions = {
              content: text, // Agregar el texto extraído como contenido
            };

            // Crear un Blob del PDF usando pdfMake
            pdfMakeModule.createPdf(docDefinition).getBlob((pdfBlob: Blob) => {
              resolve(pdfBlob); // Resolver con el Blob del PDF
            });
          })
          .catch((err) => {
            reject('Error al procesar el archivo .docx: ' + err);
          });
      };

      // Leer el archivo como ArrayBuffer
      reader.readAsArrayBuffer(docxBlob);
    });
  }




}
