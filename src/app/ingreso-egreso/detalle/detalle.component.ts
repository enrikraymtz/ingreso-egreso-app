import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../../shared/ui.actions';

import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();
  cargando: boolean;

  constructor(private store: Store<fromIngresoEgreso.AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
     this.subscription = this.store
        .subscribe( state => {
          this.items = state.ingresoEgreso.items;
          this.cargando = state.ui.isLoading;
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  borrarItem( item: IngresoEgreso ) {
    this.store.dispatch( new ActivarLoadingAction() );

    this.ingresoEgresoService.borrarIngresoEgreso( item.uid )
        .then( resp => {
          this.store.dispatch( new DesactivarLoadingAction() );
          Swal('Eliminado', item.descripcion, 'success' );
        })
        .catch( err => {
          this.store.dispatch( new DesactivarLoadingAction() );
          console.log( err );
        });
  }

}
