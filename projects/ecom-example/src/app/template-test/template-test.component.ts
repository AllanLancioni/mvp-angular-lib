import { Component, OnInit } from '@angular/core';
import {  Product } from 'mvp-kruzer';

@Component({
  selector: 'app-template-test',
  templateUrl: './template-test.component.html',
  styleUrls: ['./template-test.component.scss']
})
// @Product('home')
export class TemplateTestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('>>', this);
  }

}
