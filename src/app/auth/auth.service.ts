import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

import Swal from 'sweetalert2';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';

import { User } from './user.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription = new Subscription();
  usuario: User;

  constructor( private afAuth: AngularFireAuth,
               private router: Router,
               private store: Store<AppState>,
               private afDB: AngularFirestore ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( fbUser => {

      if (fbUser) {
        this.userSubscription = this.afDB.doc(`${ fbUser.uid }/usuario`).valueChanges()
            .subscribe( (usuarioObj: any) => {

              const newUser = new User( usuarioObj );
              this.store.dispatch( new SetUserAction( newUser ) );
              this.usuario = newUser;
            });
      } else {
        this.usuario = null;
        this.userSubscription.unsubscribe();
      }

    });
  }

  crearUsuario( nombre: string, email: string, password: string ) {

    this.store.dispatch( new ActivarLoadingAction() );

    this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then( resp => {
          // console.log( resp );
          const user: User = {
            uid: resp.user.uid,
            nombre: nombre,
            email: resp.user.email
          };

          this.afDB.doc(`${resp.user.uid}/usuario`)
                   .set( user )
                   .then( () => {
                      this.router.navigate(['/']);
                      this.store.dispatch( new DesactivarLoadingAction() );
                   });

        })
        .catch( error => {
          // console.error( error );
          this.store.dispatch( new DesactivarLoadingAction() );
          Swal('Error al crear la cuenta:', error.message, 'error');
        });
  }

  login( email: string, password: string ) {
    this.store.dispatch( new ActivarLoadingAction() );
    this.afAuth.auth
        .signInWithEmailAndPassword( email, password )
        .then( resp => {
          // console.log(resp);
          this.store.dispatch( new DesactivarLoadingAction() );
          this.router.navigate(['/']);
        })
        .catch( error => {
          // console.error(error);
          this.store.dispatch( new DesactivarLoadingAction() );
          Swal('Error en el login:', error.message, 'error');
        });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.store.dispatch( new UnsetUserAction() );
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.afAuth.authState
        .pipe(
          map( fbUser => {

            if ( fbUser == null ) {
              this.router.navigate(['/login']);
            }

            return  fbUser != null;
          })
        );
  }

  getUsuario() {
    return { ...this.usuario };
  }

}
