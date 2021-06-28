import { Component, OnInit } from '@angular/core';
import {Product} from 'mvp-kruzer';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('>>> im inside the teste2 component', this);
    // console.log('>>> ', this.product);
  }

}
