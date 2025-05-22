// import pdfMake from 'pdfmake/build/pdfmake';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { Asset } from '../../models/asset.model';

@Injectable({
    providedIn: 'root',
})
export class pdfDetailsService {
    // public image = '../../assets/img/logo/logo-horizontal-default.png';
    public image = './assets/img/logo/logo_adra.png';
    public imageCv = '../../assets/img/cv.png';
    constructor(private http: HttpClient) {


    }

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

    async viewPdfModal(res: Asset): Promise<string> {
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


    contentPdf(dataUrl: any, json: Asset) {
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
                                                            [{
                                                                text: 'NÚMERO DE SERIE',
                                                                style: ['title', 'nerita', 'horiAlignCenter', 'backgrounds']
                                                            }],
                                                            [{
                                                                text: `${json.serialNumber}`,
                                                                style: ['bigTitle', 'horiAlignCenter', 'nerita']
                                                            }],
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
                text: 'I. DATOS DEL ACTIVO',
                marginTop: 5,
                style: ['bigTitle', 'nerita'],
            },
            '\n',
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 545, y2: 0, lineWidth: 1, color: '#000000' }] },

            {
                layout: 'noBorders',
                marginTop: 5,
                table: {
                    widths: ['auto', '*', 'auto', '*'],
                    body: [
                        [
                            {
                                text: 'Descripción:',
                                bold: true,
                                style: ['tableTitle'],
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: `${json?.description}`,
                                style: ['tableSubTitle'],
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: 'Serie:',
                                bold: true,
                                style: ['tableTitle'],
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: `${json?.serialNumber}`,
                                style: ['tableSubTitle'],
                                margin: [2, 2, 2, 0],
                            },
                        ],
                        [
                            {
                                text: 'Número de factura:',
                                style: ['tableTitle'],
                                bold: true,
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: `${json?.invoiceNumber}`,
                                style: ['tableSubTitle'],
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: 'Fecha de factura:',
                                style: ['tableTitle'],
                                bold: true,
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: `${moment(json?.createdDate).format('DD/MM/YYYY')}`,
                                style: ['tableSubTitle'],
                                margin: [2, 2, 2, 0],
                            },
                        ],
                        [
                            {
                                text: 'Proveedor:',
                                style: ['tableTitle'],
                                bold: true,
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: `${json?.supplierName ? json?.supplierName : ''}`,
                                style: ['tableSubTitle'],
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: 'Asignado:',
                                style: ['tableTitle'],
                                bold: true,
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: `${json?.employeeName ? json?.employeeName : ''}`,
                                style: ['tableSubTitle'],
                                margin: [2, 2, 2, 0],
                            },
                        ],
                        [
                            {
                                text: 'Marca:',
                                style: ['tableTitle'],
                                bold: true,
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: `${json?.brand.name}`,
                                style: ['tableSubTitle'],
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: 'Grupo:',
                                style: ['tableTitle'],
                                bold: true,
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: `${json?.assetGroup.name}`,
                                style: ['tableSubTitle'],
                                margin: [2, 2, 2, 0],
                            },

                        ],
                        [
                            {
                                text: 'Material:',
                                style: ['tableTitle'],
                                bold: true,
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: `${json.material != null ? json?.material?.name : ''}`,
                                style: ['tableSubTitle'],
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: 'Centro de costo:',
                                style: ['tableTitle'],
                                bold: true,
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: `${json?.costCenterName}`,
                                style: ['tableSubTitle'],
                                margin: [2, 2, 2, 0],
                            },
                        ], [
                            {
                                text: 'Cuenta contable:',
                                style: ['tableTitle'],
                                bold: true,
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: `${json?.assetGroup.account.accountNumber} ${json?.assetGroup.account.description}`,
                                style: ['tableSubTitle'],
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: 'Total:',
                                style: ['tableTitle'],
                                bold: true,
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: `${json.currency?.nomenclature + ' ' + json?.total}`,
                                style: ['tableSubTitle'],
                                margin: [2, 2, 2, 0],
                            },
                        ],
                        [
                            {
                                text: 'Monto de depresiación:',
                                style: ['tableTitle'],
                                bold: true,
                                margin: [2, 2, 2, 0],
                            },
                            {
                                text: `${json.currency?.nomenclature + ' ' + json.amountDepreciation} (${json?.depreciationPercentage ? json.depreciationPercentage * 100 : 0}%)`,
                                style: ['tableSubTitle'],
                                margin: [2, 2, 2, 0],
                            },
                            {}, {}
                        ]
                    ],
                }
            },
            '\n',
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 545, y2: 0, lineWidth: 1, color: '#000000' }] },
            json.additionals!.length > 0 ? {
                ...{
                    text: 'II. ADICIONALES DE LOS ACTIVOS',
                    marginTop: 5,
                    style: ['bigTitle', 'nerita'],
                },

            } : '',

            json.additionals!.length > 0 ? {
                ...{
                    marginTop: 10,
                    table: {
                        widths: ['auto', '*', '*', '*'],
                        body: [
                            [
                                {
                                    text: 'N°',
                                    style: ['nerita', 'tableHeader'],
                                },
                                {
                                    text: 'Descripción:',
                                    style: ['nerita', 'tableHeader'],
                                },
                                {
                                    text: 'Fecha',
                                    style: ['nerita', 'tableHeader']
                                },
                                {
                                    text: 'Monto:',
                                    style: ['nerita', 'tableHeader'],
                                }
                            ],
                            ...json.additionals!.map((e, index) => {
                                return [
                                    { text: index + 1, style: 'small', alignment: 'left' },
                                    { text: e.description, style: 'small', alignment: 'left' },
                                    { text: moment(e.date).format('DD/MM/YYYY'), style: 'small', alignment: 'left' },
                                    { text: json.currency?.nomenclature + ' ' + e.amount, style: 'small', alignment: 'left' },
                                ]
                            })
                        ],
                    }
                }
            }
                : '',
            '\n',
            json.additionals!.length > 0 ?
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 545, y2: 0, lineWidth: 1, color: '#000000' }] }
                : '',
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
                fontSize: 9,
                margin: 0.2,
                fillColor: '#007b5f',
                color: '#ffffff'
            },
            tableTitle: {
                fontSize: 10,
                bold: true
            },
            tableSubTitle: {
                fontSize: 9,
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
                fontSize: 11,
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
