import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from './service-base.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService extends ServiceBase {
  protected authService: AuthService;

  constructor(protected injector: Injector) {
    super(injector);
    this.authService = injector.get(AuthService);
  }

  async getItems(): Promise<any[]> {
    if (!this.user) return;
    const url = `${this.apiHost}/v1/subscriptionItems`;
    return await this.http.get<any[]>(url, this.headers).toPromise();
  }

  async getFrequency(): Promise<any> {
    const url = `${this.apiHost}/v1/sites/${this.siteId}/frequencies`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  async addItem(): Promise<any> {
    const url = `${this.apiHost}`;
    return await this.http.post<any>(url, this.headers).toPromise();
  }

  async deleteProductFromOrder(itemId: any, orderId: any) {
    const url = `${this.apiHost}/v1/subscriptions/orders/${orderId}/items/${itemId}`;
    return await this.http.delete<any>(url, this.headers).toPromise();
  }

  async deleteProductFromOrderFull(itemId: any) {
    // subscriptionItemsFull/:itemId
    const url = `${this.apiHost}/v1/subscriptionItemsFull/${itemId}`;
    return await this.http.delete<any>(url, this.headers).toPromise();
  }

  async buyOrder(subscriptionId){
    const url = `${this.apiHost}/v1/subscription/${subscriptionId}/checkout`
    const resp = await this.http.post<any>(url, {}, this.headers).toPromise();
    this.authService.user = { ...resp.customerInfo };
    return resp.order;
  }

  async updateSubscription(val: any) {
    const payload = {
      ...val,
      address: val.address._id,
      billingAddress: val.billingAddress?._id,
      tenant: this.tenantId,
      packages: val.packages.map((pack) => ({
        ...pack,
        items: pack.items.map((item) => ({
          ...item,
          sku: item.sku._id,
        })),
      })),
    };
    const url = `${this.apiHost}/v1/sites/${this.siteId}/subscription/${payload._id}`;
    return this.http.put<any>(url, payload, this.headers).toPromise();
  }

  async updateOrderItem(itemId: any, orderId: any, data: any) {
    delete data.sku;
    const url = `${this.apiHost}/v1/subscriptions/orders/${orderId}/items/${itemId}`;
    await this.http.put<any>(url, data, this.headers).toPromise();
  }

  async deleteSubscription(subscriptionId) {
    const url = `${this.apiHost}/v1/subscriptions/${subscriptionId}`;
    return await this.http.delete<any>(url, this.headers).toPromise();
  }

  async updateOrder(orderId: any, data: any) {
    const url = `${this.apiHost}/v1/subscriptions/orders/${orderId}`;
    await this.http.put<any>(url, data, this.headers).toPromise();
  }
  async updateItemFull(itemId?: any, data?: any) {
    // itemId = '6101915677421d73dae35789'
    data = {
      isActive: true,
      tenant: this.tenantId,
      organization: this.organizationId,
      startedAt: new Date(),
      // quantity: 2,
      // frequency: '607ef3c130558518156d862e',
      // sku: '60d4c342395782258c3a6dc8',
      ...data,
    };
    const url = `${this.apiHost}/v1/subscriptions/items/${itemId}/full`;
    await this.http.put<any>(url, data, this.headers).toPromise();
  }

  async addProductToOrder(data: any) {
    const { quantity, order, sku, deliveredAt } = data;
    const itemPayload = {
      organization: this.organizationId,
      deliveredAt,
      tenant: this.tenantId,
      isActive: true,
      order,
      quantity,
      isGift: false,
      sku,
    };
    const urlItem = `${this.apiHost}/v1/subscriptions/orders/${order}/products`;
    await this.http.post<any>(urlItem, itemPayload, this.headers).toPromise();
  }

  async subscribeCustomer(data: any) {
    const payload = {
      organization: this.organizationId,
      tenant: this.tenantId,
      isActive: true,
      customer: this.user.customer._id,
      site: this.siteId,
      status: 'ACTIVE',
      ...data,
    };

    try {
      let urlItem = `${this.apiHost}/v1/subscriptions`;
      const { _id } = await this.http
        .post<any>(urlItem, payload, this.headers)
        .toPromise();
      this.authService.user = { ...this.user, subscription: { _id } };

      urlItem = `${this.apiHost}/v1/subscriptions`;
      const subscriptionRes = await this.http
        .get<any>(urlItem, this.headers)
        .toPromise();

      await this.subscribeNewProduct(data);
    } catch (error) {
      throw error;
    }
  }

  async subscribeNewProduct(data: any) {
    const payload = {
      organization: this.organizationId,
      tenant: this.tenantId,
      isActive: true,
      ...data,
      // sku: '608180fa1c265a114e624640',
      // startedAt: '2021-05-03',
      // quantity: 1,
      // frequency: '607ef3c130558518156d862e'
    };

    try {
      const urlItem = `${this.apiHost}/v1/subscriptions/items`;
      await this.http.post<any>(urlItem, payload, this.headers).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async getOrder(orderId: string): Promise<any> {
    const url = `${this.apiHost}/v1/subscriptions/orders/${orderId}`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  async getSubscriptions() {
    if (!this.user) return;
    const url = `${this.apiHost}/v1/sites/${this.siteId}/subscriptions`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  async getSubscriptionById(subscriptionId) {
    const url = `${this.apiHost}/v1/sites/${this.siteId}/subscription/${subscriptionId}`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  async getPreview(minicarId, value?: any) {
    const url = `${this.apiHost}/v1/sites/${this.siteId}/subscription/${minicarId}/preview`;
    return await this.http.post<any>(url, value, this.headers).toPromise();
  }

  async changeSubscriptionStatus(minicarId: any, status: string) {
    const url = `${this.apiHost}/v1/sites/${this.siteId}/subscription/${minicarId}/status?status=${status}`;
    return await this.http.patch<any>(url, {}, this.headers).toPromise();
  }
}
