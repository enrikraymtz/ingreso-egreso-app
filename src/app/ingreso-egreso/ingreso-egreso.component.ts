import { IngresoEgresoService } from './ingreso-egreso.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { ActivarLoadingAction, DesactivarLoadingAction } from './../shared/ui.actions';

import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromIngresoEgreso from './ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  cargando: boolean;
  forma: FormGroup;
  tipo = 'ingreso';
  loadingSubscription: Subscription = new Subscription();

  constructor( public ingresoEgresoService: IngresoEgresoService,
               private store: Store<fromIngresoEgreso.AppState> ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    });

    this.loadingSubscription = this.store.select('ui')
                                   .subscribe( ui => this.cargando = ui.isLoading );

  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  crearIngresoEgreso() {

    this.store.dispatch( new ActivarLoadingAction() );

    const ingresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo });
    this.ingresoEgresoService.crearIngresoEgrego( ingresoEgreso )
        .then( () => {

          this.store.dispatch( new DesactivarLoadingAction() );
          Swal('Creado', ingresoEgreso.descripcion, 'success');
          this.forma.reset({ monto: 0 });

        })
        .catch( err => {
          this.store.dispatch( new DesactivarLoadingAction() );
          console.log(err);
        });

  }

}
 