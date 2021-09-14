import { Injector } from '@angular/core';
import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

const jwt = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class AuthService extends ServiceBase {
  constructor(protected injector: Injector, private router: Router) {
    super(injector);
    if (this.user) this.userSubject.next(this.user);

  }

  setAnonymousId() {
    if (this.anonymousId) {
      return;
    }
    this.localStorage.setItem(this.anonymousKey, uuidv4());
  }

  async authenticateByToken(token: any) {
    return await this.http
      .post<any>(
        `${this.apiHost}/v1/sites/${this.siteId}/auth-token`,
        { organization: this.organizationId, token },
        this.headers
      )
      .pipe(
        tap((res) => {
          this.userToken = res.token;
          this.user = res.user;
        })
      )
      .toPromise();
  }

  async authenticateEmail(username: any) {
    return await this.http
      .post<any>(
        `${this.apiHost}/v1/sites/${this.siteId}/auth-email`,
        { username },
        this.headers
      )
      .toPromise();
  }

  async authenticatePassword(body: any) {
    return await this.http
      .post<any>(
        `${this.apiHost}/v1/sites/${this.siteId}/auth-password`,
        body,
        this.headers
      )
      .pipe(
        tap((res) => {
          this.userToken = res.token;
          this.user = res.user;
        })
      )
      .toPromise();
  }
  async authenticateChangePassword(body: any) {
    return await this.http
      .post<any>(
        `${this.apiHost}/v1/sites/${this.siteId}/auth-change-password`,
        body,
        this.headers
      )
      .pipe(
        tap((res) => {
          this.userToken = res.token;
          this.user = res.user;
        })
      )
      .toPromise();
  }

  get hasUserToken() {
    return !!this.userToken;
  }

  isLogged() {
    const isExpired = this.isExpired();
    const token = this.hasUserToken;
    if (!token || isExpired) {
      console.warn(
        !token
          ? `Usuário não autenticado.`
          : `Token expirado, redirecionando para login...`
      );
      this.removeUser();
      return false;
    }
    return token && !isExpired;
  }

  logout() {
    this.removeUser();
    this.localStorage.clear();
    window.location.href = 'home';
  }

  // private decodeAndNotify() {
  //   const user = JSON.parse(localStorage.getItem(this.userKey));
  //   if (user) {
  //     this.user = user;
  //   }
  // }

  removeUser() {
    this.localStorage.removeItem(this.userKey);
    this.userSubject.next(null);
  }

  // getDecodedToken() {
  //   return jwt.decodeToken(this.token);
  // }

  // removeToken() {
  //   localStorage.removeItem(this.tokenKey);
  // }
}
