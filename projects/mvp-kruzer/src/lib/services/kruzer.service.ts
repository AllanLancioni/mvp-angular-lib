import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService, STORAGE_KEYS } from './localstorage.service';
import { Lang } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';
import {KRUZER_LIB_CONFIG} from '../kruzer-lib.config.token';
import {KruzerLibConfig} from '../kruzer-lib.config';


const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class KruzerService {

  public readonly userSubject = new BehaviorSubject<any>(null);
  // public apiHost = 'https://spcms.kruzer.io/api';
  public apiHost = 'http://localhost:4030/api';
  public imageBlobHost = 'https://krzstgblob.blob.core.windows.net';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    @Inject(KRUZER_LIB_CONFIG) private keyConfig: KruzerLibConfig,
  ) {
    (async () => {
      if ( this.globalConfig === '' ) { await this.getGlobalConfig(); }
    })();
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
    if ( this.localStorage.getItem(STORAGE_KEYS.anonymousKey) === '' ) {
      this.localStorage.setItem(STORAGE_KEYS.anonymousKey, uuidv4());
    }
    return this.localStorage.getItem(STORAGE_KEYS.anonymousKey);
  }

  public get organizationId(): string {
    return this.globalConfig.organization;
  }

  public get tenantId(): string {
    return '5ff4ec54672df8b22c1de26e';
  }

  public get siteId(): string {
    return this.keyConfig.site;
  }

  get headers() {

    return {
      headers: new HttpHeaders({
        ...(this.hasUserToken && !this.isExpired
          ? { Authorization: `Bearer ${this.userToken}` }
          : { Anonymous: this.anonymousId }),
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
      .get(`${this.apiHost}/cms/v1/sites/${this.keyConfig.site}`, this.headers)
      .toPromise();
    this.globalConfig = response;
    return response;
  }


}
