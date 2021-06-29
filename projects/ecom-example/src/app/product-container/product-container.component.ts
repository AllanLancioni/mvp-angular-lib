import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kz-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.scss']
})
export class ProductContainerComponent implements OnInit {

  @Input() product: any;
  @Input() borders: 'ALWAYS' | 'NEVER' | 'HOVER' = 'HOVER';
  @Input() itemsPerSlide = 3;
  singleSlideOffset = true;
  noWrap = true;

  get sku() {
    return this.product.skus[0] || null;
  }

  constructor() {}

  ngOnInit(): void {
    console.log("rating", this.product.product?.rating?.avg)
  }

  alterQuantity(increment:number) {
    if (this.product.qtd == 1 && increment < 0) { return; }
    this.product.qtd =
      increment > 0 ? this.product.qtd + 1 : this.product.qtd - 1;
  }

  buy() {}

}
