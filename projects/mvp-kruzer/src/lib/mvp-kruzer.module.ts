import { NgModule } from '@angular/core';
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
export class MvpKruzerModule { }
