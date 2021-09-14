import { ModuleWithProviders, NgModule } from '@angular/core';
import { KruzerLibConfig } from './kruzer-lib.config';
import { KRUZER_LIB_CONFIG } from './kruzer-lib.config.token';
import { MvpKruzerComponent } from './mvp-kruzer.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { BgUrlDirective } from './directives/bg-url.directive';
import { DynamicBlockDirective } from './directives/dynamic-block.directive';
import { KzRateyoComponent } from './components/components/rateyo.component';
import { TranslatePipe } from './directives/translate.pipe';


@NgModule({
  declarations: [
    MvpKruzerComponent,
    SearchComponent,
   BgUrlDirective,
    DynamicBlockDirective,
    KzRateyoComponent,
    TranslatePipe

  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    MvpKruzerComponent,
    BgUrlDirective,
    DynamicBlockDirective,
    KzRateyoComponent,
    TranslatePipe,
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
