import { CheckoutService } from './checkout.service';
import { Injectable, Injector } from '@angular/core';
import { Obj } from '../shared/interfaces';
import {
  ServiceBase,
  Lang,
  GetParams,
  ResponseGet,
} from './service-base.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CmsService extends ServiceBase {
  checkoutService = this.injector.get(CheckoutService);
  constructor(protected injector: Injector) {
    super(injector);
  }

  public get lang(): Lang {
    return (this.localStorage.getItem('lang') as Lang) || 'ptbr';
  }
  public set lang(val: Lang) {
    if (['ptbr', 'eses', 'enus'].every((x) => x !== val)) {
      val = 'ptbr';
    }
    this.localStorage.setItem('lang', val);
    window.location.reload();
  }

  public get globalConfig(): Obj {
    return this.localStorage.getItem(this.globalConfigKey) || '{}';
  }

  public set globalConfig(obj: Obj) {
    this.localStorage.setItem(this.globalConfigKey, obj);
  }

  public get categories(): any[] {
    return this.globalConfig.categories;
  }

  public get blocks(): any {
    return this.globalConfig.blocks;
  }

  async getGlobalConfig(): Promise<any> {
    const response: any = await this.http
      .get(`${this.apiHost}/cms/v1/sites/${this.siteId}`, this.headers)
      .toPromise();
    this.checkoutService.cartItemsSubject.next(response?.minicar?.totalItems || 0);
    this.globalConfig = response;
    return response;
  }

  async searchProducts(params: GetParams = {}): Promise<any[]> {
    const url = this.getUrlParams(
      `${this.apiHost}/cms/v1/sites/${this.siteId}/search`,
      params
    );
    return await this.http.get<any[]>(url, this.headers).toPromise();
  }

  async getPageByUrl(url: string): Promise<any> {
    const response: any = await this.http
      .get(
        `${this.apiHost}/cms/v1/sites/${this.siteId}/urls/${url}`,
        this.headers
      )
      .toPromise();
    const attr = response.page.attributes;
    for (const key in attr) {
      if (!attr[key].value) {
        delete attr[key];
      }
    }
    return response;
  }


  async getBlockById(id: string): Promise<any> {
    return this.http
      .get(
        `${this.apiHost}/cms/v1/sites/${this.siteId}/blocks/${id}`,
        this.headers
      )
      .toPromise();
  }  

  async getProducts(category: string, params: GetParams = {}): Promise<any> {
    const url = this.getUrlParams(
      `${this.apiHost}/cms/v1/sites/${this.siteId}/category/${category}/products`,
      params
    );
    return await this.http.get<ResponseGet>(url, this.headers).toPromise();
  }
  
  async getInventory(skuId: string): Promise<any> {
    const url = `${this.apiHost}/cms/v1/inventory/${skuId}`
    return await this.http.get<ResponseGet>(url, this.headers).toPromise();
  }

  async getSignature(): Promise<any> {
    if (!this.user.subscription._id) {
      return;
    }
    const url = `${this.apiHost}/v1/subscriptions/${this.user.subscription._id}`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  async getRatingByUser(): Promise<any>{
    const url = `${this.apiHost}/cms/v1/sites/${this.siteId}/customer/rating`
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  getRatingPayload(productId: string, data: any) {
    const user = this.user;
    if (!user) {
      throw new Error('Usuário precisa estar logado para avaliar um produto!');
    }

    return {
      ...data,
      product: productId,
      author: `${user.customer.firstName} ${user.customer.lastName}`,
      user: user._id,
    };
  }

  async rateProduct(productId: string, data: any): Promise<any> {
    return this.http
      .post(
        `${this.apiHost}/cms/v1/sites/${this.siteId}/product/${productId}/rating`,
        this.getRatingPayload(productId, data),
        this.headers
      )
      .toPromise();
  }

  async getRatingByProduct(productId: string): Promise<any> {
    return this.http
      .get(
        `${this.apiHost}/cms/v1/sites/${this.siteId}/product/${productId}/rating`,
        this.headers
      )
      .toPromise();
  }

  async createComment(productId: string, comment: string) {
    return this.http
      .post(
        `${this.apiHost}/cms/v1/sites/${this.siteId}/product/${productId}/comment`,
        this.getRatingPayload(productId, { comment }),
        this.headers
      )
      .toPromise();
  }

  async deleteComment(productId: string, commentId: string) {
    return this.http
      .delete(
        `${this.apiHost}/cms/v1/sites/${this.siteId}/product/${productId}/comment/${commentId}`,
        this.headers
      )
      .toPromise();
  }

  async subscribeNewsletter(data: any) {
    return this.http
      .post(
        `${this.apiHost}/cms/v1/sites/${this.siteId}/newsletter`,
        {
          organization: this.organizationId,
          tenant: this.tenantId,
          isActive: true,
          identifiers: null,
          ...data,
        },
        this.headers
      )
      .toPromise();
  }
}
