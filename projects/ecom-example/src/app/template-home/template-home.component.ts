import { Component, Input, OnInit } from '@angular/core';
import {Page} from 'mvp-kruzer';

@Component({
  selector: 'app-template-home',
  templateUrl: './template-home.component.html',
  styleUrls: ['./template-home.component.scss']
})
export class TemplateHomeComponent extends Page implements OnInit {

  constructor() {
    super();
  }

  get attr() {
    return this.currentPage.page.attributes;
  }

  ngOnInit(): void {
    console.log('page', this.currentPage.page);
  }

}
