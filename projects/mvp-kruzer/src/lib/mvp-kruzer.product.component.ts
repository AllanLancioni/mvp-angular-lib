import {Component, Input, OnInit} from '@angular/core';
import {Product} from './mvp-kruzer.decorator';

@Component( {
  template: `
  <p>{{currentUrl | json }}</p>
  <p>{{currentPage | json }}</p>
  `
} )
export class kzProductComponent implements OnInit {

  @Input() currentPage: any;
  @Input() currentUrl: any;

  ngOnInit(): void {
    console.log(  );
  }

}
