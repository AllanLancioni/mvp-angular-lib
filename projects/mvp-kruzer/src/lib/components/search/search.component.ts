import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'kz-search',
  template: `<input [formControl]="control">`,
  styles: []
})
export class SearchComponent implements OnInit {

  control: FormControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

}
