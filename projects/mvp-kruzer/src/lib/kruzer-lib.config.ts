 import {Type} from '@angular/core';

 export interface KruzerLibConfig {
  site: string;
  key: string;
  organization: string;
  components: Type<any>[];
}

 export class GlobalData {

  static components: Type<any>[] = [];

  static addComponent(item: Type<any>) {
    console.log("add data", item)
    GlobalData.components.push(item);
  }

   static getComponents() {
     return GlobalData.components;
   }

}
