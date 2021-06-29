import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MvpKruzerModule} from 'mvp-kruzer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Test2Component } from './test2/test2.component';
import { TemplateHomeComponent } from './template-home/template-home.component';
import { BlockCarouselComponent } from './block-carousel/block-carousel.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductContainerComponent } from './product-container/product-container.component';
import { BlockShowCaseComponent } from './block-show-case/block-show-case.component';
import { FormsModule } from '@angular/forms';
import { TemplateProductComponent } from './template-product/template-product.component';

@NgModule({
  declarations: [
    AppComponent,
    Test2Component,
    TemplateHomeComponent,
    ProductContainerComponent,
    BlockCarouselComponent,
    BlockShowCaseComponent,
    TemplateProductComponent,
  ],
  imports: [
    CarouselModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MvpKruzerModule.forRoot({key: 'my amazing key',
      organization: '5ff4e85e672df8b22c1de26c', site: '606df6c383f0693a0efdd294',
      components: [TemplateHomeComponent, TemplateProductComponent]})
  ],
  exports: [
    TemplateHomeComponent
  ],
  entryComponents: [TemplateHomeComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
