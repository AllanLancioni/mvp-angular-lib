import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResolverComponent} from 'mvp-kruzer';
import {TemplateTestComponent} from './template-test/template-test.component';
import {Test2Component} from './test2/test2.component';

const routes: Routes = [
  { path: '', component: ResolverComponent},
  { path: ':url', component: ResolverComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
