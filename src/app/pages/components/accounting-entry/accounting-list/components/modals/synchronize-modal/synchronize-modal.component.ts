import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountingEntryService } from '../../../../../../../core/services/accounting-entry/accounting-entry.service';
// import { AccountingEntryService } from 'app/core/services/accounting-entry/accounting-entry.service';

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
  constructor(public activeModal:NgbActiveModal, private accountingEntryService:AccountingEntryService) {}
  ngOnInit(): void {
    this.getYears()
    this.getMonths(this.actualYear);
    this.getAccountings()
  }
  getAccountings(){
    let params={
      year: this.actualYear,
      month: this.actualMonth  ?? ''
    }
    this.accountingEntryService.getCompareAccountIngentries(params).subscribe((res)=>{
      this.syncData = []
      this.syncData = res.data.map((res:any) => ({
        comDate: res.comDate,
        seat: res.seat,
        description: res.description,
        batchDate: res.batchDate,
        username: res.username,
        month: res.month,
        year: new Date(res.batchDate).getFullYear(),
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
    this.accountingEntryService.postCompareAccountIngentriesSync(this.syncData).subscribe((res) => {
      this.isLoading = false;
      this.activeModal.close({ success: true, message: 'Sincronizado con exito', data: res });
    });
  }
}
