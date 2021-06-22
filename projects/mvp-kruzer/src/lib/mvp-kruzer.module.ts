import { ModuleWithProviders, NgModule } from '@angular/core';
import {KruzerLibConfig} from './kruzer-lib.config';
import {KRUZER_LIB_CONFIG} from './kruzer-lib.config.token';
import { MvpKruzerComponent } from './mvp-kruzer.component';



@NgModule({
  declarations: [
    MvpKruzerComponent
  ],
  imports: [
  ],
  exports: [
    MvpKruzerComponent
  ]
})
export class MvpKruzerModule {
    static forRoot(kruzerLibConfig: KruzerLibConfig): ModuleWithProviders<MvpKruzerModule> {
    return {
      ngModule: MvpKruzerModule,
      providers: [
        {
          provide: KRUZER_LIB_CONFIG,
          useValue: kruzerLibConfig
        }
      ]
    };
  }
}
