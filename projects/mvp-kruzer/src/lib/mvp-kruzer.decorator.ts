import { ReflectiveInjector } from '@angular/core';
import {GlobalData} from './kruzer-lib.config';
import {CmsService} from './services/cms.service';

// const injector = ReflectiveInjector.resolveAndCreate([
    // {provide: 'cmsService', useClass: CmsService}
  // ]);

// export function Product(target?: new (...args: any) => any) {
  // class bb extends target{}
  // return class NewClass extends bb {
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

// export const Product = (target?: any) => {
  // class base extends target{}
  // return class b  extends base {
    // };
// };
  //

export function BlockComponent() {
  return function(constructor: any) {
    GlobalData.addComponent(constructor);
  };
}
