import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  suscription: Subscription;

  constructor(private _auth: AuthService, public store: Store<AppState> ) { }

  ngOnInit() {
    this.suscription = this.store.select('ui')
                          .subscribe( ui => this.cargando = ui.isLoading );
  }
  
  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  login( data ) {
    this._auth.login( data.email, data.password );
  }

}
