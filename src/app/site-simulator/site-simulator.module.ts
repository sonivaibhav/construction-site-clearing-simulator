import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ExpenseReportComponent} from './expense-report.component';
import {SiteSimulatorRoutingModule} from './site-simulator-routing.module';
import {SiteSimulatorComponent} from './site-simulator.component';
import {VehicleControlsComponent} from './vehicle-controls.component';

@NgModule({
  imports: [
    CommonModule,
    SiteSimulatorRoutingModule
  ],
  declarations: [
    SiteSimulatorComponent,
    VehicleControlsComponent,
    ExpenseReportComponent
  ]
})
export class SiteSimulatorModule {
}
