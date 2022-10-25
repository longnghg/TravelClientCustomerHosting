import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/auth/login/login.component';
import { RegisterComponent } from '../../pages/auth/register/register.component';
import { ForgotPasswordComponent } from 'src/app/pages/auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from 'src/app/pages/auth/change-password/change-password.component';
export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'forgotPassword', component: ForgotPasswordComponent },
    { path: 'changePassword', component: ChangePasswordComponent}
];
