
import { Injectable } from '@angular/core';



@Injectable({
    providedIn: 'root',
})
export class pdfDepreciationEntry {
    public image = './assets/img/logo/logo_adra.png';
    public imageCv = '../../assets/img/cv.png';


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
                    watermark: { text: watermark, color: colorWatermark, opacity: 0.1, bold: true, italics: false },
                    info: {
                        title: `Reporte ${new String(json?.title).toLowerCase()}`,
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
                                            [{
                                                text: 'ADRA PERU',
                                                style: ['bigTitle', 'nerita', 'horiAlignCenter'], colSpan: 2
                                            }],
                                            [{
                                                text: 'Av. Angamos Oeste 770, Miraflores 15074',
                                                style: ['title', 'horiAlignCenter'], colSpan: 2
                                            }],
                                            [{
                                                text: 'EMAIL: logistica@adra.org.pe',
                                                style: ['title', 'horiAlignCenter'], colSpan: 2
                                            }],
                                            [{
                                                text: 'TEL: (01) 712-7701',
                                                style: ['title', 'horiAlignCenter'], colSpan: 2
                                            }],
                                        ]
                                    },
                                }
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
                                                            [{
                                                                text: `R.U.C: 20138861300`,
                                                                style: ['title', 'horiAlignCenter', 'nerita']
                                                            }],
                                                            // [{
                                                            //     text: 'NÚMERO DE SERIE',
                                                            //     style: ['title', 'nerita', 'horiAlignCenter', 'backgrounds']
                                                            // }],
                                                            // [{
                                                            //     text: ``,
                                                            //     style: ['bigTitle', 'horiAlignCenter', 'nerita']
                                                            // }],
                                                        ]
                                                    },
                                                }
                                            ]
                                        ]
                                    },
                                }
                            ],
                        ],
                    ],
                },
            },
            {
                text: `I. ${json?.title}`,
                marginTop: 5,
                style: ['bigTitle', 'nerita'],
            },
            {
                layout: 'noBorders',
                marginTop: 5,
                table: {
                    widths: ['auto', '*', 'auto', '*'],
                    body: [
                        [
                            {
                                text: 'Año:',
                                bold: true,
                                style: ['tableTitle'],
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: `${json?.year}`,
                                style: ['tableSubTitle'],
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: 'Mes:',
                                bold: true,
                                style: ['tableTitle'],
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: `${json?.month}`,
                                style: ['tableSubTitle'],
                                margin: [2, 2, 2, 0],
                            },
                        ],
                    ],
                }
            },
            '\n',
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 545, y2: 0, lineWidth: 0.1, color: '#000000' }] },
            '\n',
            {
                layout: 'noBorders',
                marginTop: 5,
                table: {
                    widths: ['auto', '*', 'auto','auto', 'auto',],
                    body: [
                        [{
                            text: 'Cuenta',
                            style: ['nerita', 'tableHeader'],
                        },
                        {
                            text: 'Nombre',
                            style: ['nerita', 'tableHeader'],
                        },
                        {
                            text: 'Centro de costo',
                            style: ['nerita', 'tableHeader'],
                        },
                        {
                            text: 'Debe',
                            style: ['nerita', 'tableHeader']
                        },
                        {
                            text: 'Haber',
                            style: ['nerita', 'tableHeader'],
                        }],
                        ...json.list.map((e:any, index:any) => {
                            return [
                                {
                                    // text: e.account?.accountNumber,
                                    text: e?.accountNumber,
                                    style: 'medium', alignment: 'center'
                                },
                                {
                                    // text: e.asset?.description,
                                    text: e?.name,
                                    style: 'medium', alignment: 'left'
                                },
                                {
                                    text: e?.costCenterCode,
                                    style: 'medium', alignment: 'center'
                                },
                                e?.transactionType == 'D' ? {
                                    text: `S/. ${e?.amount}`,
                                    style: 'medium', alignment: 'right'
                                } : '',
                                e?.transactionType == 'H' ? {
                                    text: `S/. ${e?.amount}`,
                                    style: 'medium', alignment: 'left'
                                } : '',
                            ]
                        }),
                    ]
                }
            },
            '\n',
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 545, y2: 0, lineWidth: 0.1, color: '#000000' }] },
            {
                layout: 'noBorders',
                marginTop: 5,
                table: {
                    widths: ['auto', '*', 'auto', 'auto',],
                    body: [
                        [
                            '',
                            {
                                text: 'Total:',
                                style: 'medium', alignment: 'right',
                                bold: true,
                            },
                            {
                                text: `S/. ${json?.hasto}`,
                                style: 'medium', alignment: 'right',
                                bold: true,
                            },
                            {
                                text: `S/. ${json?.tohave}`,
                                style: 'medium', alignment: 'left',
                                bold: true,
                            }
                        ]
                    ]
                }
            },
        ]
    }

    footerPdf() {
        return {
            margin: [40, 0, 40, 40],
            style: ['small', 'gray', 'center'],
            text: [
                '*El acceso a esta información por otras personas distintas a las designadas no está autorizado. Si Ud. no es el destinatario indicado, queda notificado que la utilización, divulgación y/o copia sin autorización está prohibida en virtud de la legislación vigente. Si ha recibido este mensaje por error, por favor le rogamos que comunique inmediatamente al remitente vía fax o e-mail y proceda a su destrucción.\n',
                'Ley N° 29733, Ley de Protección de Datos Personales.',
            ],
        }
    }


    stylesPdf() {
        return {
            tableHeader: {
                bold: true,
                fontSize: 12,
                margin: [8, 5, 8, 5],
                fillColor: '#007b5f',
                color: '#ffffff'
            },
            tableTitle: {
                fontSize: 14,
                bold: true
            },
            tableSubTitle: {
                fontSize: 14,
                bold: false
            },
            titleDocument: {
                fontSize: 10,
                fillColor: '#e9ecef',
            },
            title: {
                fontSize: 9,
            },
            bigTitle: {
                fontSize: 14,
            },
            small: {
                fontSize: 8,
            },

            nerita: {
                bold: true
            },
            tipoLetter: {
                italics: true
            },
            horiAlignCenter: {
                alignment: 'center',
            },
            backgrounds: {
                fillColor: '#e9ecef',
            }
        };
    }
}
