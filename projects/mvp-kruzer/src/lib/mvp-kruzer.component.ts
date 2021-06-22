import { Component, Inject } from '@angular/core';
import {KruzerLibConfig} from './kruzer-lib.config';
import {KRUZER_LIB_CONFIG} from './kruzer-lib.config.token';

@Component({
  selector: 'kz-mvp-kruzer',
  template: `
    <p>
      mvp-kruzer funciona liso oo!
    </p>
  `,
  styles: [
  ]
})
export class MvpKruzerComponent {

  constructor(@Inject(KRUZER_LIB_CONFIG) private keyConfig: KruzerLibConfig) {
    console.log('token', keyConfig.key);
  }

}
