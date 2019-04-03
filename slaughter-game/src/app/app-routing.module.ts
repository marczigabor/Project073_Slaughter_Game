import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FrameComponent } from './frame/frame.component';

const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full'  },
  { path: 'app', component: FrameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
