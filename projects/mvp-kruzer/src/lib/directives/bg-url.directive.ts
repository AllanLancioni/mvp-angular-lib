  import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
  import {KruzerLibConfig} from '../kruzer-lib.config';
  import {KRUZER_LIB_CONFIG} from '../kruzer-lib.config.token';
  import {KruzerService} from '../services/kruzer.service';

  @Directive({
  selector: '[kzBgUrl]',
})
export class BgUrlDirective implements OnChanges {
  @Input() kzBgUrl: string | undefined;
  @Input() fullWidth: boolean | string | undefined;
  @Input() type: 'PRODUCT' | 'CATEGORY' | 'USER' = 'PRODUCT';

  fallbackProductImage = '../../../assets/image/no-product-image.png';
  fallbackCategoryImage = '../../../assets/image/no-product-image.png';
  fallbackUserImage =  '../../../assets/image/no-user-mage.png';

  constructor(private el: ElementRef,
              @Inject(KRUZER_LIB_CONFIG) private keyConfig: KruzerLibConfig,
              private kruzerService: KruzerService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.kzBgUrl) {
      const url = (() => {
        if (!this.kzBgUrl) {
          switch (this.type) {
            case 'PRODUCT':
              return this.fallbackProductImage;
            case 'CATEGORY':
              return this.fallbackCategoryImage;
            case 'USER':
              return this.fallbackUserImage;
          }
        } else {
          return `${this.kruzerService.imageBlobHost}/${this.keyConfig.organization}${this.kzBgUrl}`;
        }
      })();
      if (this.el.nativeElement.nodeName == 'IMG') {
        this.el.nativeElement.src = url;
        if (this.fullWidth) {
          const w = typeof this.fullWidth === 'string' ? this.fullWidth : '100%';
          this.el.nativeElement.style.maxWidth = w;
          this.el.nativeElement.style.width = w;
        }
      } else {
        this.el.nativeElement.style.backgroundSize = 'cover';
        this.el.nativeElement.style.backgroundImage = `url(${url})`;
      }
    }
  }
}
