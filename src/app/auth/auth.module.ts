import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '../../../node_modules/@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AngularFireAuthModule,
        RouterModule
    ]
})

export class AuthModule {}
