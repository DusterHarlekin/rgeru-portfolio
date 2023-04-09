import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComissionsComponent } from './comissions/comissions.component';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'gallery', component: ComissionsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'panel', component: PanelComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
