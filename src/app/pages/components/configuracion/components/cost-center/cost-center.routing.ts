import { Route } from '@angular/router';
import { CostCenterContainerComponent } from './container/cost-center-container.component';

export const costCenterRoutes: Route[] = [
    {
        path: '',
        component: CostCenterContainerComponent,
    },
];
