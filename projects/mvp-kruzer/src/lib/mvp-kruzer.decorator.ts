import { ReflectiveInjector } from '@angular/core';
import {CmsService} from './services/cms.service';

// const injector = ReflectiveInjector.resolveAndCreate([
    // {provide: 'cmsService', useClass: CmsService}
  // ]);

// export function Product(target: new (...args: any) => any) {
  // return class NewClass extends target {
    // currentUrl: any;
  // };
  // return function( constructor: any ) {
    // Object.defineProperty(constructor.prototype, 'currentUrl', { value: {}, writable: true });
    // Object.defineProperty(constructor.prototype, 'currentPage', { value: {}, writable: true });
  // };
// }

// export const Product = (target: new (...args: any) => any) => {
   // return class NewClass extends target {
     // currentUrl!: any;
   // };
 // };
    // ]

export const Product = (target: any) => {
    return class NewClass extends target {
        currentUrl: any;
    };
};
