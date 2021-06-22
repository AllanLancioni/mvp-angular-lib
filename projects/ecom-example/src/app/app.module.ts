import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MvpKruzerModule } from 'mvp-kruzer';
import { TemplateTestComponent } from './template-test/template-test.component'

@NgModule({
  declarations: [
    AppComponent,
    TemplateTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MvpKruzerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
