import {Component, Injector, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {CmsService} from '../../services/cms.service';
import {BaseComponent} from '../components/base.component';

@Component({
  template: `
    <ng-content select="[header]"></ng-content>
    <ng-content select="[content]"></ng-content>
    <ng-content select="[footer]"></ng-content>
  `
})
export class TemplateComponent extends BaseComponent implements OnInit {

  protected injector: Injector;
  currentUrl = '';
  currentPage: any;
  // cmsService: CmsService;
  // checkoutService: CheckoutService;
  // customerService: CustomerService;
  // subscriptionService: SubscriptionService;
  // orderService: OrderService;
  // authService: AuthService;
  // toastrService: ToastrService;
  // fb: FormBuilder;
  _data: any;
  pageTitle: Title | undefined;
  pageMeta: Meta | undefined;
  cmsService: any;
  set data(val: any) {
    this._data = val;
    this.currentPage = val.currentPage;
  }
  get page() {
    return this.currentPage.page;
  }

  get attr(): { [key: string]: any } {
    return this.page.attributes;
  }

  constructor(injector: Injector) {
    super(injector);
    this.injector = injector;
    this.cmsService = this.injector.get(CmsService);
  }

  ngOnInit(): void {}

  async getCurrentPage(pageId?: string): Promise<any> {
    const res = await this.cmsService.getPageByUrl(pageId);
    console.log( 'res template', res  );
    let title = this.cmsService.kruzerService.globalConfig.general.title;
    switch (res.page.template.type) {
      case 1:
        if (res.page.attributes?.title?.value?.ptbr) {
          title = `${res.page.attributes.title.value.ptbr} | ${title}`;
        }
        break;
      case 2:
          this.route.queryParams.subscribe(({ code }) => {
            const sku = (res.page.product.skus.find((x: any) => x.code === code) || res.page.product.skus[0]);
            if (sku) {
              title = `${sku.name} | ${title}`;
              if ( this.pageTitle ) { this.pageTitle.setTitle(title); }
            }
          });
          break;

      case 3:
          if (res.page?.category?.name) {
            title = `${res.page?.category?.name} | ${title}`;
          }
          break;
    }

    if ( this.pageTitle ) { this.pageTitle.setTitle(title); }

    return res;
  }
}
