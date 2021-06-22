import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService, STORAGE_KEYS } from './localstorage.service';
import { Lang } from '../interfaces';

const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class KruzerService {

  public readonly userSubject = new BehaviorSubject<any>(null);
  public apiHost: string = 'https://kzcms.kruzer.io/api';
  public siteId: string = '';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }


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

  public get user(): any {
    return JSON.parse(this.localStorage.getItem(STORAGE_KEYS.userKey));
  }

  public get user$(): BehaviorSubject<any> {
    return this.userSubject;
  }

  public set user(user) {
    this.localStorage.setItem(STORAGE_KEYS.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  public set userToken(token: string) {
    this.localStorage.setItem(STORAGE_KEYS.tokenKey, token);
  }

  public get userToken() {
    return this.localStorage.getItem(STORAGE_KEYS.tokenKey);
  }

  get hasUserToken() {
    return !!this.userToken;
  }

  public get globalConfig() {
    return this.localStorage.getItem(STORAGE_KEYS.globalConfigKey);
  }

  public set globalConfig(obj) {
    this.localStorage.setItem(STORAGE_KEYS.globalConfigKey, obj);
  }

  get isExpired(): boolean {
    return jwt.isTokenExpired(this.userToken);
  }

  public get anonymousId(): string {
    return this.localStorage.getItem(STORAGE_KEYS.anonymousKey);
  }

  public get organizationId(): string {
    return this.globalConfig.organization;
  }

  public get tenantId(): string {
    return '5ff4ec54672df8b22c1de26e';
  }  

  get headers() {
    return {
      headers: new HttpHeaders({
        ...(this.hasUserToken && !this.isExpired
          ? { 'Authorization': `Bearer ${this.userToken}` }
          : { 'Anonymous': this.anonymousId }),
      }),
    };
  }

  public getUrlParams(url: string, obj: any): string {
    if (!Object.keys(obj).length) {
      return url;
    }
    return `${url}?${Object.keys(obj)
      .map((key) => `${key}=${obj[key]}`)
      .join('&')}`;
  }

  async getGlobalConfig(): Promise<any> {
    const response = await this.http
      .get(`${this.apiHost}/cms/v1/sites/${this.siteId}`, this.headers)
      .toPromise();
    this.globalConfig = response;
    return response;
  }


}
