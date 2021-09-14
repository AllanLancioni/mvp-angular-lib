import { AfterViewInit, Component, ComponentFactory, ComponentFactoryResolver,
  ComponentRef, Inject, Injector, NgZone, OnDestroy, OnInit,
  ViewChild,
  ViewContainerRef, } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { KruzerLibConfig } from '../../kruzer-lib.config';
import { KRUZER_LIB_CONFIG } from '../../kruzer-lib.config.token';
import { KruzerService } from '../../services/kruzer.service';
import { TemplateComponent } from '../template/template.component';

@Component({
  selector: 'kz-resolver',
  template: `
  <div>
  <ng-template #dynamicItem> </ng-template>
</div>
  `
})
export class ResolverComponent extends TemplateComponent implements OnInit, AfterViewInit, OnDestroy {
  route$: Subscription | undefined;
  globalPages: any[] = Object.values(this.kruzerService.globalConfig.pages);
  pageNotFound = false;

  @ViewChild('dynamicItem', {static: true, read: ViewContainerRef}) dynamicItem!: ViewContainerRef;
  subject = new Subject;

  constructor(
    private ngZone: NgZone,
    protected injector: Injector,
    private kruzerService: KruzerService,
    @Inject(KRUZER_LIB_CONFIG) private keyConfig: KruzerLibConfig,
    protected _componentFactoryResolver: ComponentFactoryResolver,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    // this.pageNotFound = this.router.url == '/not-found';
  }

  async ngAfterViewInit(): Promise<void> {
    this.route$ = this.route.url.subscribe(async (url) => {
      this.currentUrl = (url[url.length - 1].path).toLowerCase();
      await this.loadPage();
    });
  }

  async loadPage() {

    if (!this.currentUrl) {
      this.currentUrl = this.kruzerService.globalConfig.homePage || 'home';
    }
    try {
      const found = this.globalPages.find(x => x.urls.find((y: any) => y.lang === this.kruzerService.lang && y.url === this.currentPage));
      this.currentPage = await this.getCurrentPage(found?.page || this.currentUrl);

      // const item = ComponentItemFactory.create(this.currentPage.page.template?.key, {
        // currentPage: this.currentPage,
        // currentUrl: this.currentUrl,
      // });
      //
      // const item = Array.from(this._componentFactoryResolver['_factories'].keys())
          // .find( (x: any) => x.name === this.currentPage.page.template?.key );

      // obtem do config -> via config do module.forRoot
      const item = this.keyConfig.components.find( (c: any) => c.name === this.currentPage.page.template?.key );

      // obtem do globaldata -> via decorators
      // const item = GlobalData.getComponents().find((c: any) => c.name === this.currentPage.page.template?.key);

      if (item) {
        const factory: ComponentFactory<any> = this._componentFactoryResolver.resolveComponentFactory(item);
        this.dynamicItem.clear();
        const componentRef: ComponentRef<any> = this.dynamicItem.createComponent( factory );
        componentRef.instance.currentPage = this.currentPage;
        componentRef.instance.currentUrl = this.currentUrl;
      } else {
        console.error(this.currentPage.page.template.key, 'item not found');
      }
      this.subject.next();
    } catch (error) {
      this.router.navigate(['not-found']);
      console.error(error);
    } finally {
      // this.spinner.hide();
    }
  }

  async ngOnDestroy(): Promise<void> {
    if (this.route$) { this.route$.unsubscribe(); }
  }

}
