import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IndicadorService } from '../../../core/services/Indicador.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  url: any;

  @Input() set params(item: any) {
    if (item) {
      const { idIndicador, idBussinestUnit } = item.values;
      this.onChangeReporte(idIndicador, idBussinestUnit);
    }
  }


  constructor(private indicadorSerivce: IndicadorService,
    private sanitizer: DomSanitizer
  ) { }

  onChangeReporte(idIndicador: number, idBussinestUnit: string) {
    this.indicadorSerivce
      .getIndicadorByIdandBussinesUnit(idIndicador, idBussinestUnit)
      .subscribe((res) => {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(res.url);
      });
  }


  resizeIframe(obj: any) {
    const ua = navigator.userAgent;
    if (obj) {
      if (
        /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
        /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
          ua
        )
      ) {
        if(obj.path){
          obj.path[0].style.height = 750 + 'px';
        }
      } else {
        if(obj.path){
          obj.path[0].style.height =
            obj.path[0].contentWindow.document.documentElement.scrollHeight +
            (window.innerHeight - 350) +
            'px';
        }
      }
    }
  }


}
