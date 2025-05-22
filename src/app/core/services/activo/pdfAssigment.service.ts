import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';




@Injectable({
  providedIn: 'root',
})
export class pdfAssigmentService {
  // public image = '../../assets/img/logo/logo-horizontal-default.png';
  public image = './assets/img/logo/logo_adra.png';
  public imageCv = '../../assets/img/cv.png';


  constructor(private http: HttpClient) {}

  private toDataURL(url: any, callback: any) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };

    xhr.open('GET', url);

    xhr.responseType = 'blob';
    xhr.send();
  }

  async viewPdfModal(res: any): Promise<string> {
     const pdfMakeModule = await import('pdfmake/build/pdfmake');
  const pdfFontsModule = await import('pdfmake/build/vfs_fonts');

  (pdfMakeModule as any).vfs = pdfFontsModule.vfs;
    var json = res;
    return new Promise<string>((resolve, reject) => {
      this.toDataURL(this.image, (dataUrl: any) => {
        let watermark = 'ADRA PERÚ';
        let colorWatermark = '#007b5f';
        const documentDefinition = {
          pageSize: 'A4',
          pageMargins: [30, 30, 25, 25],
          watermark: {
            text: watermark,
            color: colorWatermark,
            opacity: 0.1,
            bold: true,
            italics: false,
          },
          info: {
            title: `${res.serialNumber}`,
            author: 'ADRA',
          },
          content: this.contentPdf(dataUrl, json),
          footer: this.footerPdf(),
          styles: this.stylesPdf(),
        };
        pdfMakeModule
          .createPdf(documentDefinition as any)
          .getDataUrl((pdfDataUrl: string) => {
            resolve(pdfDataUrl);
          });
      });
    });
  }

  contentPdf(dataUrl: any, json: any) {
    return [
      {
        layout: 'noBorders',
        table: {
          widths: ['*', 300, '*'],
          body: [
            [
              [
                {
                  image: `data:image/png;${dataUrl}`,
                  width: 50,
                  alignment: 'left',
                },
              ],
              [
                {
                  layout: 'noBorders',
                  table: {
                    widths: ['*', '*'],
                    body: [
                      [
                        {
                          text: 'ADRA PERU',
                          style: ['bigTitle', 'nerita', 'horiAlignCenter'],
                          colSpan: 2,
                        },
                      ],
                      [
                        {
                          text: 'Av. Angamos Oeste 770, Miraflores 15074',
                          style: ['title', 'horiAlignCenter'],
                          colSpan: 2,
                        },
                      ],
                      [
                        {
                          text: 'EMAIL: logistica@adra.org.pe',
                          style: ['title', 'horiAlignCenter'],
                          colSpan: 2,
                        },
                      ],
                      [
                        {
                          text: 'TEL: (01) 712-7701',
                          style: ['title', 'horiAlignCenter'],
                          colSpan: 2,
                        },
                      ],
                    ],
                  },
                },
              ],
              [
                {
                  table: {
                    widths: ['*'],
                    body: [
                      [
                        {
                          layout: 'noBorders',
                          table: {
                            widths: ['*'],
                            body: [
                              [
                                {
                                  text: `R.U.C: 20138861300`,
                                  style: ['title', 'horiAlignCenter', 'nerita'],
                                },
                              ],
                              // [{
                              //     text: 'NÚMERO DE SERIE',
                              //     style: ['title', 'nerita', 'horiAlignCenter', 'backgrounds']
                              // }],
                              // [{
                              //     text: `${json.serialNumber ? json.serialNumber : ''}`,
                              //     style: ['bigTitle', 'horiAlignCenter', 'nerita']
                              // }],
                            ],
                          },
                        },
                      ],
                    ],
                  },
                },
              ],
            ],
          ],
        },
      },
      {
        text: 'I. DATOS',
        marginTop: 5,
        style: ['bigTitle', 'nerita'],
      },
      '\n',
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 545,
            y2: 0,
            lineWidth: 1,
            color: '#000000',
          },
        ],
      },
      {
        layout: 'noBorders',
        marginTop: 5,
        table: {
          widths: ['auto', '*'],
          body: [
            [
              {
                text: 'Empleado:',
                fontsize: 15,
                bold: true,
                margin: [2, 2, 2, 0],
              },
              {
                text: `${json?.fullName}`,
                fontsize: 15,
                margin: [2, 2, 2, 0],
              },
            ],
            [
              {
                text: 'Documento:',
                fontsize: 15,
                bold: true,
                margin: [2, 2, 2, 0],
              },
              {
                text: `${json?.employee.documentNumber}`,
                fontsize: 15,
                margin: [2, 2, 2, 0],
              },
            ],
            [
              {
                text: 'Puesto:',
                fontsize: 15,
                bold: true,
                margin: [2, 2, 2, 0],
              },
              {
                text: `${json?.employee.positionName}`,
                fontsize: 15,
                margin: [2, 2, 2, 0],
              },
            ],
            [
              {
                text: 'Área:',
                fontsize: 15,
                bold: true,
                margin: [2, 2, 2, 0],
              },
              {
                text: `${json?.employee.areaName}`,
                fontsize: 15,
                margin: [2, 2, 2, 0],
              },
            ],
            [
              {
                text: 'Oficina:',
                fontsize: 15,
                bold: true,
                margin: [2, 2, 2, 0],
              },
              {
                text: `${json?.employee.officeName}`,
                fontsize: 15,
                margin: [2, 2, 2, 0],
              },
            ],
            [
              {
                text: 'Sede:',
                fontsize: 15,
                bold: true,
                margin: [2, 2, 2, 0],
              },
              {
                text: `${json?.employee.campusName}`,
                fontsize: 15,
                margin: [2, 2, 2, 0],
              },
            ],
          ],
        },
      },

      {
        text: 'II. ASIGNADOS',
        marginTop: 5,
        style: ['bigTitle', 'nerita'],
      },
      '\n',
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 545,
            y2: 0,
            lineWidth: 1,
            color: '#000000',
          },
        ],
      },
      {
        marginTop: 10,
        table: {
          // widths: ['auto', '*', 'auto', 'auto', '*', 'auto', 'auto', '*', '*'],
          widths: ['auto', '*', 'auto', 'auto', 50, 'auto', '*', 20, 50, 50],
          body: [
            [
              {
                text: 'N°',
                style: ['tableHeader', 'nerita'],
              },
              {
                text: 'Código',
                style: ['tableHeader', 'nerita'],
              },
              {
                text: 'Activo',
                style: ['tableHeader', 'nerita'],
              },

              {
                text: 'Fecha de activación',
                style: ['tableHeader', 'nerita'],
              },
              {
                text: 'Área',
                style: ['tableHeader', 'nerita'],
              },
              // {
              //     text: 'Razones',
              //     style: ['tableHeader', 'nerita']
              // },
              // {
              //     text: 'Fecha de asignación',
              //     style: ['tableHeader', 'nerita'],
              // },
              {
                text: 'Estado',
                style: ['tableHeader', 'nerita'],
              },
              {
                text: 'Centro de costo',
                style: ['tableHeader', 'nerita'],
              },
              {
                text: '% depreciación',
                style: ['tableHeader', 'nerita'],
              },
              {
                text: 'Cuenta contable',
                style: ['tableHeader', 'nerita'],
              },
              {
                text: 'Cuenta contable Asignada',
                style: ['tableHeader', 'nerita'],
              },
            ],
            ...json.assignments!.map((e: any, index: number) => {
              return [
                { text: `${index + 1}`, fontSize: 8 },
                {
                  text: `${e?.asset?.code != null ? e?.asset?.code : ''}`,
                  fontSize: 8,
                },
                { text: `${e.description}`, fontSize: 8 },

                {
                  text: `${
                    e?.asset?.activationDate != null
                      ? moment(e?.asset?.activationDate).format('DD/MM/YYYY')
                      : ''
                  }`,
                  fontSize: 8,
                },
                { text: `${e?.areaName}`, fontSize: 8 },
                // { text: `${e.reason}`, fontSize: 8, },
                // { text: `${moment(e.assignmentDate).format('DD/MM/YYYY')}`, fontSize: 8, },
                {
                  text: `${e.state != 1 ? 'Devuelto' : 'Asignado'}`,
                  fontSize: 8,
                },
                { text: `${e.costCenterName}`, fontSize: 8 },
                {
                  text: `${
                    e?.asset?.depreciationPercentage * 100 + '%'
                  }`,
                  fontSize: 8,
                },
                {
                  text: `${
                    e?.asset?.assetGroup?.account?.accountNumber +
                    ' ' +
                    e?.asset?.assetGroup?.account?.description
                  }`,
                  fontSize: 8,
                },
                {
                  text: `${
                    e?.asset?.assetGroup?.activationAccount?.accountNumber +
                    ' ' +
                    e?.asset?.assetGroup?.activationAccount?.description
                  }`,
                  fontSize: 8,
                },
              ];
            }),
          ],
        },
      },
      {
        text: 'III. DEVUELTOS',
        marginTop: 20,
        style: ['bigTitle', 'nerita'],
      },
      '\n',
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 545,
            y2: 0,
            lineWidth: 1,
            color: '#000000',
          },
        ],
      },
      {
        marginTop: 10,
        table: {
          // widths: ['auto', '*', 'auto', 'auto', '*', 'auto', 'auto', '*', '*'],
          widths: ['auto', '*', 'auto', 'auto', 50, 'auto', '*', 20, 50, 50],
          body: [
            [
              {
                text: 'N°',
                style: ['tableHeader', 'nerita'],
              },
              {
                text: 'Código',
                style: ['tableHeader', 'nerita'],
              },
              {
                text: 'Activo',
                style: ['tableHeader', 'nerita'],
              },

              {
                text: 'Fecha de activación',
                style: ['tableHeader', 'nerita'],
              },
              {
                text: 'Área',
                style: ['tableHeader', 'nerita'],
              },
              // {
              //     text: 'Razones',
              //     style: ['tableHeader', 'nerita']
              // },
              // {
              //     text: 'Fecha de devolución',
              //     style: ['tableHeader', 'nerita'],
              // },
              {
                text: 'Estado',
                style: ['tableHeader', 'nerita'],
              },
              {
                text: 'Centro de costo',
                style: ['tableHeader', 'nerita'],
              },
              {
                text: '% depreciación',
                style: ['tableHeader', 'nerita'],
              },
              {
                text: 'Cuenta contable	',
                style: ['tableHeader', 'nerita'],
              },
              {
                text: 'Cuenta contable	Asignada',
                style: ['tableHeader', 'nerita'],
              },
            ],
            ...json.returns!.map((e: any, index: number) => {
              return [
                { text: `${index + 1}`, fontSize: 8 },
                {
                  text: `${e?.asset?.code != null ? e?.asset?.code : ''}`,
                  fontSize: 8,
                },
                { text: `${e.description}`, fontSize: 8 },
                {
                  text: `${
                    e?.asset?.activationDate != null
                      ? moment(e?.asset?.activationDate).format('DD/MM/YYYY')
                      : ''
                  }`,
                  fontSize: 8,
                },
                { text: `${e?.areaName}`, fontSize: 8 },
                // { text: `${e.reason}`, fontSize: 8, },
                // { text: `${moment(e.assignmentDate).format('DD/MM/YYYY')}`, fontSize: 8, },
                {
                  text: `${e.state != 1 ? 'Devuelto' : 'Asignado'}`,
                  fontSize: 8,
                },
                { text: `${e.costCenterName}`, fontSize: 8 },
                {
                  text: `${
                    e?.asset?.depreciationPercentage * 100 + '%'
                  }`,
                  fontSize: 8,
                },
                {
                  text: `${
                    e?.asset?.assetGroup?.account?.accountNumber +
                    ' ' +
                    e?.asset?.assetGroup?.account?.description
                  }`,
                  fontSize: 8,
                },
                {
                  text: `${
                    e?.asset?.assetGroup?.activationAccount?.accountNumber +
                    ' ' +
                    e?.asset?.assetGroup?.activationAccount?.description
                  }`,
                  fontSize: 8,
                },
              ];
            }),
          ],
        },
      },
    ];
  }

  footerPdf() {
    return {
      margin: [40, 0, 40, 40],
      style: ['small', 'gray', 'center'],
      text: [
        '*El acceso a esta información por otras personas distintas a las designadas no está autorizado. Si Ud. no es el destinatario indicado, queda notificado que la utilización, divulgación y/o copia sin autorización está prohibida en virtud de la legislación vigente. Si ha recibido este mensaje por error, por favor le rogamos que comunique inmediatamente al remitente vía fax o e-mail y proceda a su destrucción.\n',
        'Ley N° 29733, Ley de Protección de Datos Personales.',
      ],
    };
  }

  stylesPdf() {
    return {
      tableHeader: {
        bold: true,
        fontSize: 9,
        margin: 0.2,
        fillColor: '#007b5f',
        color: '#ffffff',
      },
      tableTitle: {
        fontSize: 10,
        bold: true,
      },
      tableSubTitle: {
        fontSize: 9,
        bold: false,
      },
      titleDocument: {
        fontSize: 10,
        fillColor: '#e9ecef',
      },
      title: {
        fontSize: 9,
      },
      bigTitle: {
        fontSize: 11,
      },
      small: {
        fontSize: 8,
      },

      nerita: {
        bold: true,
      },
      tipoLetter: {
        italics: true,
      },
      horiAlignCenter: {
        alignment: 'center',
      },
      backgrounds: {
        fillColor: '#e9ecef',
      },
    };
  }
}
