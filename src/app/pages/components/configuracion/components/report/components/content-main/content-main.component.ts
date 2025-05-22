import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionService } from '../../../../../../../core/services/activo/configuracion.service';
import { BreadcrumbsComponent } from '../../../../../../../shared/components/breadcrumbs/breadcrumbs.component';

interface Report {
  accountActivation: string;           // e.g., "CONSTRUCCIONES EN CURSO"
  accountActivationNumber: string;     // e.g., "339201"
  accountName: string | null;
  accountNumber: string | null;
  accountDepreciation: string | null;
  accountDepreciationNumber: string | null;
  depreciationPercentage: number;
}

@Component({
  selector: 'app-content-main',
  standalone: true,
  imports: [CommonModule,BreadcrumbsComponent],
  templateUrl: './content-main.component.html',
  styleUrl: './content-main.component.scss',
})
export default  class ContentMainComponent implements OnInit{
  service = inject(ConfiguracionService);
  breadCrumbItems!: Array<{}>;
  report : Report[] = [];

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Configuración' },
      { label: 'Reportes', active: true },
    ];
    this.getReports();
  }

  getReports() {
    this.service.getGroupReport().subscribe((res) => {
      this.report = res.data;
    });
  }
}
