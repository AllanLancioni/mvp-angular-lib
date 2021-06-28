import {Component, Injector} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';

@Component( {
  template: ''
} )

export class BaseComponent {

  auth: any = null;
  public route: ActivatedRoute;
  public router: Router;
  public title: Title;

  constructor(injector: Injector) {
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.title = injector.get(Title);
  }

}
