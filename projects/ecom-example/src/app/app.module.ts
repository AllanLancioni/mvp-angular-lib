import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MvpKruzerModule} from 'mvp-kruzer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Test2Component } from './test2/test2.component';
import { TemplateHomeComponent } from './template-home/template-home.component';
import { BlockCarouselComponent } from './block-carousel/block-carousel.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    AppComponent,
    Test2Component,
    TemplateHomeComponent,
    BlockCarouselComponent,
  ],
  imports: [
    CarouselModule,
    BrowserModule,
    AppRoutingModule,
    MvpKruzerModule.forRoot({key: 'my amazing key',
      organization: '5ff4e85e672df8b22c1de26c', site: '606df6c383f0693a0efdd294',
      components: [TemplateHomeComponent, BlockCarouselComponent]})
  ],
  exports: [
    TemplateHomeComponent
  ],
  entryComponents: [TemplateHomeComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
