import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { NgSelectModule }  from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/auth/login/login.component';
import { RegisterComponent } from '../../pages/auth/register/register.component';
import { ForgotPasswordComponent } from '../../pages/auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from '../../pages/auth/change-password/change-password.component';
import { NgSelectModule }           from '@ng-select/ng-select';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    NgbModule,
    NgSelectModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
  ]
})
export class AuthLayoutModule { }
