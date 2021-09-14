import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meta, Obj } from '../shared/interfaces';
import { LocalStorageService } from './localstorage.service';

const jwt = new JwtHelperService();
export interface ResponseGet {
  data: any[];
  meta: Meta;
}
export type Lang = 'ptbr' | 'eses' | 'enus';
export interface GetParams extends Obj {
  skip?: number;
  limit?: number;
}

export class ServiceBase {
  public readonly userSubject = new BehaviorSubject<any>(null);
  protected injector: Injector;
  protected http: HttpClient;
  protected apiHost: string = environment.urls.apiHost;
  protected siteId: string = environment.siteId;
  protected localStorage: LocalStorageService;

  protected get tokenKey(): string {
    return 'tkn_pos'; 
  }

  public get userKey(): string {
    return 'tkn_pos_user';
  }

  public get user(): any {
    return JSON.parse(this.localStorage.getItem(this.userKey));
  }

  public get user$(): BehaviorSubject<any> {
    return this.userSubject;
  }

  public set user(user) {
    this.localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }


  public set userToken(token: string) {
    this.localStorage.setItem(this.tokenKey, token);
  }

  public get userToken() {
    return this.localStorage.getItem(this.tokenKey);
  }

  get hasUserToken() {
    return !!this.userToken;
  }

  public get globalConfigKey() {
    return 'kzGlobalConfig';
  }

  public get anonymousKey() {
    return 'kzAnonymousKey';
  }

  public get categoriesKey() {
    return 'kzCategoriesKey';
  }

  public get globalConfig() {
    return this.localStorage.getItem(this.globalConfigKey);
  }

  isExpired() {
    return jwt.isTokenExpired(this.userToken);
  }

  public get anonymousId(): string {
    return this.localStorage.getItem(this.anonymousKey);
  }

  public get organizationId(): string {
    return this.globalConfig.organization;
  }

  public get tenantId(): string {
    return '5ff4ec54672df8b22c1de26e';
  }  

  constructor(injector: Injector) {
    this.injector = injector;
    this.localStorage = injector.get(LocalStorageService);
    this.http = injector.get(HttpClient);
  }

  get headers() {
    return {
      headers: new HttpHeaders({
        ...(this.hasUserToken && !this.isExpired()
          ? { 'Authorization': `Bearer ${this.userToken}` }
          : { 'Anonymous': this.anonymousId}),
      }),
    };
  }

  getUrlParams(url: string, obj: GetParams) {
    if (!Object.keys(obj).length) {
      return url;
    }
    return `${url}?${Object.keys(obj)
      .map((key) => `${key}=${obj[key]}`)
      .join('&')}`;
  }

}
