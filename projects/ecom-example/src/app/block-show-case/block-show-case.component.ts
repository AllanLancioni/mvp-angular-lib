import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { awaiter } from '../../../../mvp-kruzer/src/lib/helpers/awaiter';
import { Block } from '../../../../mvp-kruzer/src/lib/components/components/page.component';
import {BlockComponent} from 'mvp-kruzer';

@Component({
  selector: 'kz-block-show-case',
  templateUrl: './block-show-case.component.html',
  styleUrls: ['./block-show-case.component.scss']
})
@BlockComponent()
export class BlockShowCaseComponent extends Block implements OnInit {

  @ViewChild('overflowed') private overflowed: ElementRef;
  initialized = false;


  get el(): HTMLDivElement {
    return this.overflowed?.nativeElement || null;
  }

  get showScrollBefore() {
    return this.el?.scrollLeft !== 0;
  }

  get showScrollAfter() {
    return this.el?.scrollLeft + this.el?.offsetWidth !== this.el?.scrollWidth;
  }

  constructor() {
    super();
  }

  async ngOnInit() {
    await awaiter(300);
    this.initialized = true;
  }

  changePage(param: any){
    this.el.scrollTo({left: this.el.scrollLeft + (param * this.el.offsetWidth), behavior: 'smooth'});
  }

}
