import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from './service-base.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends ServiceBase {

  async importAttachments(url: string, organization: string, files: any[], extraKeys: any = {}): Promise<any> {
    const formData = new FormData();
    formData.append('organization', organization);
    files.forEach((file, index) => {
        formData.append(`file${index}`, file);
    });

    // const flattenObj = flattenJSON(extraKeys);
    // Object.keys(flattenObj).forEach(key => formData.append(key, (flattenObj[key])));

    Object.keys(extraKeys).forEach((key: string) => {
        formData.append(key,  JSON.stringify(extraKeys[key]));
    });

    
    return this.http.post(url, formData, this.headers)
        .toPromise()
  }

  async createException(body: any, files: any): Promise<any> {
    const url = `${this.apiHost}/v1/exceptions`
    const value = {
      organization: this.organizationId,
      tenant: this.tenantId,
      createdBy: 'deefa496-50fc-42b7-8cd7-9ec4c4e03fba',
      updatedBy: 'deefa496-50fc-42b7-8cd7-9ec4c4e03fba',
      isActive: true,
      status: 0,
      identifiers: null,
      parent: null,
      ...body
    }    
    return await this.importAttachments(url, value.organization, Object.values(files),  value); 
  }


  constructor(protected injector: Injector) {
    super(injector);
  }

  async getOrders(): Promise<any> {
    const url = `${this.apiHost}/v1/orders`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }
  async getOrderById(_id): Promise<any> {
    // const url = `${this.apiHost}/v1/orders/${_id}`
    const url = `${this.apiHost}/v1/orders/${_id}`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  async getExceptionsAreas(): Promise<any> {
    const url = `${this.apiHost}/v1/exceptionsAreas`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  async getExceptionsTypes(areaId: any): Promise<any> {
    const url = `${this.apiHost}/v1/exceptionsTypes?area=${areaId}`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  async listExceptions(): Promise<any> {
    const url = `${this.apiHost}/v1/exceptions`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  async getException(_id: string): Promise<any> {
    const url = `${this.apiHost}/v1/exceptions/${_id}`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  async createInteraction(body: any): Promise<any>{
    const url = `${this.apiHost}/v1/exceptionInteraction`
    const value = {
      organization: this.organizationId,
      tenant: this.tenantId,
      isActive: true,
      status: 0,
      identifiers: null,
      parent: null,
      ...body
    }

    return await this.http.post<any>(url, value, this.headers).toPromise();
  }

  
}
