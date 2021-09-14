import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from './service-base.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService extends ServiceBase {
  constructor(protected injector: Injector) {
    super(injector);
  }

  async checkPromotions(type: string, id: string){
    const url = `${this.apiHost}/v1/promotions/check?type=${type}&id=${id}`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  async getPromotions() {
    const url = `${this.apiHost}/v1/promotions`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }
  async getFullPromotions() {
    const url = `${this.apiHost}/v1/promotions/list`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }
  
}
