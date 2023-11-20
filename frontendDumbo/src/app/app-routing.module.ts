import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import{UsersComponent} from './pages/users/users.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterUserComponent } from './pages/users/register-user/register-user.component';


const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  { path: 'inicio', component: DashboardComponent },
  {path:'usuarios', component: UsersComponent},
  {path: 'usuarios/nuevo',component: RegisterUserComponent},
  {path: 'buscar', component: UsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
