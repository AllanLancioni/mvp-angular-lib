import { Component, OnInit } from '@angular/core';
import {CmsService} from './services/cms.service';

@Component({
  selector: 'kz-mvp-kruzer',
  template: `
    <p>
      mvp-kruzer funciona liso oo!
    </p>
  `,
  styles: [
  ]
})
export class MvpKruzerComponent implements OnInit {

  constructor(private cmsService: CmsService) {
  }

  async ngOnInit(): Promise<void> {
    // await this.cmsService.getGlobalConfig();
     const ret = await this.cmsService.getPageByUrl('home');
     console.log('ret', ret);
  }


}
