import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-test',
  templateUrl: './template-test.component.html',
  styleUrls: ['./template-test.component.scss']
})
export class TemplateTestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('>>', this);
  }

}
