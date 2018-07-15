import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrderIngresoEgresoPipe } from './order-ingreso-egreso.pipe';

// Charts
import { ChartsModule } from 'ng2-charts';

// NGRX
import { StoreModule } from '@ngrx/store';

// Modulos personalizados
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer),
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrderIngresoEgresoPipe
  ]
})
export class IngresoEgresoModule { }
