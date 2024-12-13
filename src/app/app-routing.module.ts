import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { authGuardGuard } from './auth-guard.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path :'login', component: LoginComponent},
  {path : 'signup', component: SignupComponent},
  {path : 'task-list', component : TaskListComponent, canActivate : [authGuardGuard]}, 
  {path : '**', redirectTo : 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
