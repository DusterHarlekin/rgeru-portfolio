import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComissionsComponent } from './comissions/comissions.component';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';

const routes: Routes = [
  {path: 'home/es', component: HomeComponent},
  {path: 'gallery/es', component: ComissionsComponent},
  {path: 'home/en', component: HomeComponent},
  {path: 'gallery/en', component: ComissionsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'panel', component: PanelComponent},
  {path: 'home', redirectTo: 'home/en'},
  {path: 'gallery', redirectTo: 'gallery/en'},
  {path: '', redirectTo: 'home/en', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
