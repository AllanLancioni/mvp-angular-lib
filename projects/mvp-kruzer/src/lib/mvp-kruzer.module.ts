import { ModuleWithProviders, NgModule } from '@angular/core';
import {KruzerLibConfig} from './kruzer-lib.config';
import {KRUZER_LIB_CONFIG} from './kruzer-lib.config.token';
import { MvpKruzerComponent } from './mvp-kruzer.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import {kzProductComponent} from './mvp-kruzer.product.component';
import { BgUrlDirective } from './directives/bg-url.directive';
import {DynamicBlockDirective} from './directives/dynamic-block.directive';


@NgModule({
  declarations: [
    MvpKruzerComponent,
    SearchComponent,
    kzProductComponent,
   BgUrlDirective,
    DynamicBlockDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    MvpKruzerComponent,
    kzProductComponent,
    BgUrlDirective,
    DynamicBlockDirective
  ],
  entryComponents: [MvpKruzerComponent]
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
