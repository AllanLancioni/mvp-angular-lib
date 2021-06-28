import { Component, OnInit } from '@angular/core';
import {Block} from 'mvp-kruzer';

@Component({
  selector: 'app-block-carousel',
  templateUrl: './block-carousel.component.html',
  styleUrls: ['./block-carousel.component.scss']
})
export class BlockCarouselComponent extends Block implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
