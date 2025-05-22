import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubdiaryService } from '../../../../../../../core/services/subdiary/subdiary.service';
@Component({
  selector: 'app-synchronize-modal',
  templateUrl: './synchronize-modal.component.html',
  styleUrl: './synchronize-modal.component.scss',
})
export class SynchronizeModalComponent implements OnInit {
  years:number[] = [];
  months:any[]=[];
  data = new Date();
  nameMonths = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  actualYear = this.data.getFullYear();
  actualMonth:any = this.data.getMonth()+1;
  syncData:any[]= [];
  isLoading: boolean = false;
  constructor(public activeModal:NgbActiveModal, private subdiaryService:SubdiaryService ) {}
  ngOnInit(): void {
    this.getYears()
    this.getMonths(this.actualYear);
    this.getAccountings()
  }
  getAccountings(){
    let params={
      year: this.actualYear,
      month: this.actualMonth ?? ''
    }
    this.subdiaryService.getSynchronize(params).subscribe((res)=>{
      this.syncData = []
      this.syncData = res.data.map((res:any) => ({
        tcode: res.code,
        tkey: res.tkey,
        description: res.description,
        shortDescription: null,
        tdate: res.tdate,
        year: res.year,
        month: res.month,
      }));
      this.isLoading = false;
    })

  }
  getYears() {
    for (let i = 2018; i <= this.data.getFullYear()+1; i++) {
      this.years.push(i);
    }
  }
  getMonths(year:number){
    this.months= [];
    if(year === this.data.getFullYear()){
      for (let i = 1; i <= this.data.getMonth() + 1; i++) {
        this.months.push({id:i,name:this.nameMonths[i-1]});
      }
    }else{
      for (let i = 1; i <= 12; i++) {
        this.months.push({id:i,name:this.nameMonths[i-1]});
      }
    }
  }
  onSave() {
    this.isLoading = true;
    this.subdiaryService.postSynchronize(this.syncData).subscribe((res) => {
      this.isLoading = false;
      this.activeModal.close({ success: true, message: 'Sincronizado con exito', data: res });
    });
  }
}
