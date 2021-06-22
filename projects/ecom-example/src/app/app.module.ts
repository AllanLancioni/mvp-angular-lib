import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MvpKruzerModule } from 'mvp-kruzer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MvpKruzerModule.forRoot({key: 'my amazing key'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
