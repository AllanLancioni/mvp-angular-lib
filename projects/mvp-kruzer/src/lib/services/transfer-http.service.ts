import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  TransferState,
  StateKey,
  makeStateKey,
} from '@angular/platform-browser';
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TransferHttpService {
  constructor(
    protected transferState: TransferState,
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  get<T>(
    url: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'response';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    // tslint:disable-next-line:no-shadowed-variable
    return this.getData<T>(
      'get',
      url,
      options,
      (_method: string, url: string, options: any) => {
        return this.httpClient.get<T>(url, options);
      }
    );
  }

  private getData<T>(
    method: string,
    uri: string | Request,
    options: any,
    callback: (
      method: string,
      uri: string | Request,
      options: any
    ) => Observable<any>
  ): Observable<T> {
    let url = uri;

    if (typeof uri !== 'string') {
      url = uri.url;
    }

    const tempKey = url + (options ? JSON.stringify(options) : '');
    const key = makeStateKey<T>(tempKey);
    try {
      return this.resolveData<T>(key);
    } catch (e) {
      return callback(method, uri, options).pipe(
        tap((data: T) => {
          if (isPlatformBrowser(this.platformId)) {
            // Client only code.
            // nothing;
          }
          if (isPlatformServer(this.platformId)) {
            this.setCache<T>(key, data);
          }
        })
      );
    }
  }

  private resolveData<T>(key: StateKey<T>): Observable<T> {
    const data = this.getFromCache<T>(key);

    if (!data) {
      throw new Error();
    }

    if (isPlatformBrowser(this.platformId)) {
      // Client only code.
      this.transferState.remove(key);
    }
    if (isPlatformServer(this.platformId)) {
      // Server only code.
    }

    return from(Promise.resolve<T>(data));
  }

  private setCache<T>(key: StateKey<T>, data: T): void {
    return this.transferState.set<T>(key, data);
  }

  private getFromCache<T>(key: StateKey<T>): T {
    return this.transferState.get<T>(key, null);
  }
}
