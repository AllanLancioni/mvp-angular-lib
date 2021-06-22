import { ModuleWithProviders, NgModule } from '@angular/core';
import {KruzerLibConfig} from './kruzer-lib.config';
import {KRUZER_LIB_CONFIG} from './kruzer-lib.config.token';
import { MvpKruzerComponent } from './mvp-kruzer.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    MvpKruzerComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
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
