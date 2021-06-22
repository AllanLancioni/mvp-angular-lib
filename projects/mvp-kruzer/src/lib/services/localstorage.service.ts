import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

export const STORAGE_KEYS: { [key: string]: string } = {
  tokenKey: 'token_key',
  userKey: 'tkn_user',
  globalConfigKey: 'kz_global_config',
  anonymousKey: 'kz_anonymous_key',
  categoriesKey: 'kz_categories_key',
}

class LocalStorage implements Storage {
  [name: string]: any;
  get length(): number {
    return 0;
    // return Object.keys(this).length;
  }
  clear(): void {
    // Object.keys(this).forEach(key => delete this[key]); 
  }
  getItem(key: string): string | null {
    // return this[key];
    return null;
  }
  key(index: number): string | null {
    // return Object.values(this)[index];
    return null;
  }
  removeItem(key: string): void {
    // delete this[key];
  }
  setItem(key: string, value: string): void {
    // this[key] = value;
  }
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements Storage {
  private storage: Storage;
  // storage = new LocalStorage();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.storage = isPlatformBrowser(platformId) ? localStorage : new LocalStorage();
  }

  [name: string]: any;

  length: number;

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): any {
    return this.storage.getItem(key) ? JSON.parse(this.storage.getItem(key)) : null;
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  setItem(key: string, value: any): void {
    return this.storage.setItem(key, JSON.stringify(value));
  }
}
