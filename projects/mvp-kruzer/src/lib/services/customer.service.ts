import { Injectable, Injector } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ServiceBase } from './service-base.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends ServiceBase {
  constructor(protected injector: Injector) {
    super(injector);
  }

  async createCustomer(body): Promise<any> {
    body.documentType = body.personType == 'F' ? 'CPF' : 'CNPJ';
    body.organization = this.organizationId;
    body.site = this.siteId;
    const url = `${this.apiHost}/v1/users`;
    return await this.http
      .post<any>(url, body, this.headers)
      .pipe(
        tap((res) => {
          this.userToken = res.token;
          this.user = res.user;
        })
      )
      .toPromise();
  }

  async googleAuth(): Promise<any> {
    const url = `${this.apiHost}/v1/oauth/google`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  async getAddresses(): Promise<any[]> {
    if (!this.user) { return null; }
    const url = `${this.apiHost}/v1/customers/addresses`;
    return (await this.http.get<any>(url, this.headers).toPromise()).data;
  }

  async findAddressByZipcode(zipCode: any) {
    const url = `${this.apiHost}/v1/geocoding/address/correios`;
    return await this.http.post<any>(url, zipCode, this.headers).toPromise();
  }

  async removeAddress(id: any) {
    const url = `${this.apiHost}/v1/customers/${this.user.customer._id}/addresses/${id}`;
    return await this.http.delete<any>(url, this.headers).toPromise();
  }

  async getAddressById(id: any) {
    const url = `${this.apiHost}/v1/customers/${this.user.customer._id}/addresses/${id}`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  async updateAddress(address: any, id: any) {
    const data = {
      organization: this.organizationId,
      tenant: this.tenantId,
      isActive: true,
      parent: this.user.customer._id,
      identifiers: {
        erp: '000006',
      },
      ...address
    };    
    const url = `${this.apiHost}/v1/customers/${this.user.customer._id}/addresses/${id}`;
    return await this.http.put<any>(url, data, this.headers).toPromise();
  }

  async addAddress(body: any) {
   const value =  {
    organization: this.organizationId,
    tenant: this.tenantId,
    isActive: true,
    parent: this.user.customer._id,
    identifiers: {},
    ...body
   };
   const url = `${this.apiHost}/v1/customers/${this.user.customer._id}/addresses`;
   return await this.http.post<any>(url, value, this.headers).toPromise();
  }

  async getGoogleAddress(street?: string, number?: number){
    if (number){
      const split = street.split('-');
      split[0] += `, ${number}`;
      street = split.join('');
    }

    const url = `${this.apiHost}/v1/geocoding/address/google`;
    return await this.http.post<any>(url, {address: street}, this.headers).toPromise();
  }

  async getCustomerInfo() {
    const url = `${this.apiHost}/v1/customers/${this.user.customer._id}`;
    return await this.http.get<any>(url, this.headers).toPromise();
  }

  async setDefaultAddress(addressId){
    const url = `${this.apiHost}/v1/customers/addresses/${addressId}/default`
    return await this.http.put<any>(url, {}, this.headers).toPromise();
  }

  async saveCustomerInfo(data: any) {
    const payload = {
      attributes: {},
      classification: 'normal',
      corporateName: '',
      deliveryType: 'CIF',
      document: '',
      documentType: 'CPF',
      email: '',
      firstName: '',
      identifiers: { erp: '' },
      isActive: true,
      lastName: '',
      organization: this.organizationId,
      personType: 'F',
      registerNumber: '',
      stateRegistration: '',
      tenant: this.tenantId,
      tradeName: '',
      ...data,
      birthday: new Date(data.birthday),
    };

    await this.saveContact(data.contacts);

    const url = `${this.apiHost}/v1/customers/${this.user.customer._id}`;
    await this.http.put<any>(url, payload, this.headers).toPromise();
  }

  async saveContact(data: any) {
    if (data === null || data.length === 0) {
      return;
    }

    for (let i = 0; i < data.length; i++) {
      const item = {
        organization: this.organizationId,
        tenant: this.tenantId,
        deleted: false,
        ...data[i],
      };
      const url = `${this.apiHost}/v1/customers/${this.user.customer._id}/contacts/${item._id}`;
      return await this.http.put<any>(url, item, this.headers).toPromise();
    }
  }

  async createContact(data: any) {
    const payload = {
      // cellphoneAreaCode: "11"
      cellphoneCountryCode: 55,
      // cellphoneNumber:
      corporateAreaCode: 21,
      corporateCountryCode: 55,
      corporateNumber: '',
      deleted: false,
      description: '',
      email: '',
      identifiers: {},
      isActive: true,
      isReference: false,
      organization: this.organizationId,
      tenant: this.tenantId,
      parent: this.user.customer._id,
      parentType: 1,
      phoneAreaCode: 21,
      phoneCountryCode: 55,
      phoneNumber: '',
      ...data,
    };

    const url = `${this.apiHost}/v1/customers/${this.user.customer._id}/contacts`;
    return await this.http.post<any>(url, payload, this.headers).toPromise();
  }

  async recoveryPassword(body) {
    const url = `${this.apiHost}/v1/customers/recovery-password`;
    return await this.http.post<any>(url, body, this.headers).toPromise();
  }

  async changePassword(email, body) {
    const url = `${this.apiHost}/v1/customers/recovery-password/${email}`;
    return await this.http.post<any>(url, body, this.headers).toPromise();
  }

  resolveStreetInfos(street: string) {
    try {
      const split = street.split(' ');
      const type = split[0].trim();
      let name = '';
      if (split.length == 1) {
        name = split[0];
      } else {
        for (let x = 1; x < split.length; x++) {
          name += split[x] + ' ';
        }
      }
      return {
        type,
        name,
      };
    } catch (err) {
      return {
        type: '',
        name: street,
      };
    }
  }
}
