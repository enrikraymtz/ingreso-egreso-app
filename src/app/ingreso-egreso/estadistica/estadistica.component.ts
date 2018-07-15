import { IngresoEgreso } from './../ingreso-egreso.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
// import { AppState } from '../../app.reducer';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor( private store: Store<fromIngresoEgreso.AppState> ) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
          .subscribe( ingresoEgreso => this.contarIngresosEgresos( ingresoEgreso.items ) );
  }

  contarIngresosEgresos( items: IngresoEgreso[] ) {
    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;

    items.forEach( item => {
      if ( item.tipo === 'ingreso' ) {
        this.cuantosIngresos++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos++;
        this.egresos += item.monto;
      }
    });
    this.doughnutChartData = [ this.ingresos, this.egresos ];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
