import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FrameComponent } from './frame/frame.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SideComponent } from './side/side.component';

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    HeaderComponent,
    MainComponent,
    SideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
