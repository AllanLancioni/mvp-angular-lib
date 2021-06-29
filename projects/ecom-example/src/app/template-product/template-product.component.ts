import { Component, OnInit } from '@angular/core';
import { Page } from 'mvp-kruzer';

@Component({
  selector: 'app-template-product',
  templateUrl: './template-product.component.html',
  styleUrls: ['./template-product.component.scss']
})
export class TemplateProductComponent extends Page implements OnInit {

  actualSku: any
  product: any;
  skus: any[] = []
  isAvailable: boolean = true;
  currentImage: any;
  isSubscribed: boolean = false;
  productQty = 1;
  qtyAvailable = 0;

  constructor() {
    super()
   }
  ngOnInit(): void {
    this.product = this.currentPage.page.product;
    console.log( "page>>>", this.product)
    this.skus = this.product.skus;
    this.actualSku = this.skus[0];
    this.currentImage = this.actualSku.images.find((x:any) => x.isDefault);
  }


  openModalRating() {}
  switchSku(sku:any) {}
  subscribeProduct(){}
  addToCart(){}
  clickImage(img:any){}
  hoverImage(img:any){}
  openLightBox(zoom:any){}
  openModalNotify(){}


}
