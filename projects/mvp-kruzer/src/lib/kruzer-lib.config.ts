 import {Type} from '@angular/core';

 export interface KruzerLibConfig {
  site: string;
  key: string;
  organization: string;
  components: Type<any>[];
}
