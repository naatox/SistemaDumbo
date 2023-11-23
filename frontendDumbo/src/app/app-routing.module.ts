import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import{UsersComponent} from './pages/users/users.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterUserComponent } from './pages/users/register-user/register-user.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { AuthGuard } from './shared/auth/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  { path: 'inicio', component: DashboardComponent, canActivate: [AuthGuard] },
  {path:'usuarios', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/nuevo',component: RegisterUserComponent, canActivate: [AuthGuard]},
  {path: 'buscar', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/editar/:id', component: EditUserComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
