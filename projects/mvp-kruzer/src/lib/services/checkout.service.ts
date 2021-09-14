import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ServiceBase } from './service-base.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService extends ServiceBase {
  public readonly cartItemsSubject = new BehaviorSubject<number>(0);
  cartProducts: any[] = [];
  protected authService: AuthService;
  constructor(protected injector: Injector) {
    super(injector);
    this.authService = injector.get(AuthService);
    //   this.cartProducts = value
    // })
  }

  async addToCart(
    skuId: string,
    quantity: number,
    isSignature: boolean = false,
    belongSubscription: boolean,
    additionalInfos?: any,
    minicarId = null,
    skipDelivery = 0,
    deliveryFrequency = 1
  ) {
    if (!this.cartProducts.some((x) => x == skuId)) {
      this.cartProducts.push(skuId);
    }
    const payload: any = { skuId, quantity, isSignature, belongSubscription, minicarId, skipDelivery, deliveryFrequency };
    if (additionalInfos) {
      payload.additionalInfos = additionalInfos;
    }

    const url = `${this.apiHost}/v1/sites/${this.siteId}/checkout/buy/${skuId}`;
    const response = await this.http
      .post<any>(url, payload, this.headers)
      .toPromise();
    this.emitCartItemsNotification(response);
    return response;
  }

  async getMinicar() {
    const url = `${this.apiHost}/v1/sites/${this.siteId}/checkout/minicar`;
    const response = await this.http.get<any>(url, this.headers).toPromise();
    this.emitCartItemsNotification(response);

    return response;
  }

  async validateBin(bin) {
    const url = `${this.apiHost}/v1/payments/cieloEcommerce/validate/bin/${bin}`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  async createCard(value) {
    const body = {
      ...value,
      // CustomerName: 'Paulo Henrique',
      // CardNumber: '5468429519334754',
      // Holder: 'Teste Holder',
      // ExpirationDate: '12/2026',
      // Brand: 'MasterCard',
      organization: this.organizationId,
      tenant: this.tenantId,
    };
    const url = `${this.apiHost}/v1/payments/cieloEcommerce/createCard`;
    const response = await this.http
      .post<any>(url, body, this.headers)
      .toPromise();
    return response;
  }
  async deleteCard(cardId) {
    const url = `${this.apiHost}/v1/payments/customer/cards/${cardId}`;
    const response = await this.http.delete<any>(url, this.headers).toPromise();
    return response;
  }

  emitCartItemsNotification(minicar: any) {
    this.cartItemsSubject.next(
      minicar.packages.reduce((ac, x) => {
        ac = x.items.reduce((acc, item) => {
          acc += item.quantity;
          return acc;
        }, 0);
        return ac;
      }, 0)
    );
  }

  getStrategies(address, packages, isSignature, discountAmount = 0) {
    const [lng, lat] = address?.location?.coordinates;
    const url = `${this.apiHost}/v1/organization/${this.organizationId}/strategies/${lng}/${lat}`;

    return this.http
      .post<any>(
        url,
        {
          packages,
          ...address,
          isSignature,
          siteId: this.siteId,
          discountAmount,
        },
        this.headers
      )
      .pipe
      // debounceTime(300),
      ();
  }

  async getCheckout() {
    const url = `${this.apiHost}/v1/sites/${this.siteId}/checkout/finalize-order`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  async checkout(minicarId, isSignature) {
    const url = `${this.apiHost}/v1/site/${this.siteId}/checkout/minicar/${minicarId}`;
    const value = {
      tenant: this.tenantId,
      isSignature,
      organization: this.organizationId,
      channel: 'ECOMMERCE',
      operator: '6661190c-d9b5-4925-afb0-18eee41b8b75',
      identifiers: {},
      contact: null,
    };

    const resp = await this.http
      .post<any>(url, value, this.headers)
      .toPromise();
    this.authService.user = { ...resp.customerInfo };

    return resp.order;
  }

  async updateMinicar(val) {
    const payload = {
      _id: val._id,
      strategy: val.strategy,
      address: val.address,
      zipCode: val.zipCode,
      billingAddress: val.billingAddress,
      tenant: this.tenantId,
      promotionalCode: val.promotionalCode,
      isSignature: val.isSignature,
      totals: val.totals,
      subscription: val.subscription,
      packages: val.packages.map((pack) => ({
        ...pack,
        items: pack.items.map((item) => {
          (item.promotions || []).forEach(promo => promo.selectedGift = promo.selectedGift ? promo.selectedGift._id : null);
          return {
            ...item,
            sku: item.sku._id,
          }
        }),
      })),
    };
    const url = `${this.apiHost}/v1/sites/${this.siteId}/checkout/minicar`;
    const response = await this.http
      .put<any>(url, payload, this.headers)
      .toPromise();
    this.emitCartItemsNotification(response);
    return response;
  }

  async cancelOrder(orderId, reason) {
    const url = `${this.apiHost}/v1/orders/${orderId}/status/cancel`;
    return await this.http.put<any>(url, { reason }, this.headers).toPromise();
  }

  async getCards() {
    const url = `${this.apiHost}/v1/subscriptions/vault/cards`;
    const response = await this.http.get<any>(url, this.headers).toPromise();
    return response;
  }
}
