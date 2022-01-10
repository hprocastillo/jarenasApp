import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from "../../core/guards/login.guard";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    children: [
      {path: 'login', component: LoginComponent},
      {path: '**', redirectTo: 'login'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
