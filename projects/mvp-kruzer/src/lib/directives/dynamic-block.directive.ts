import { ComponentFactory, ComponentFactoryResolver, Directive, Inject, Input, OnChanges, OnDestroy, SimpleChanges, Type, ViewContainerRef, } from '@angular/core';
import {KruzerLibConfig} from '../kruzer-lib.config';
import {KRUZER_LIB_CONFIG} from '../kruzer-lib.config.token';
import {CmsService} from '../services/cms.service';

@Directive({
  selector: '[dynamicBlock]',
})
export class DynamicBlockDirective implements OnDestroy, OnChanges {
  @Input() dynamicBlock: any;
  attributes: any;
  componentItem: Type<any> | undefined;
  blockComponent: any;
  loading = true;

  constructor(
    @Inject(KRUZER_LIB_CONFIG) private keyConfig: KruzerLibConfig,
    protected _viewContainerRef: ViewContainerRef,
    protected _componentFactoryResolver: ComponentFactoryResolver,
    protected cmsService: CmsService
  ) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.dynamicBlock) {
      // TODO: Substituir pela chave correta
      this.dynamicBlock.value = await this.cmsService.getBlockById(this.dynamicBlock.value);
      this.loading = false;
      const key = this.dynamicBlock.value.template.key;
      this.attributes = this.dynamicBlock.value.attributes;

      this.componentItem = this.keyConfig.components.find( (x: Type<any>) => x.name === key );

      // this.componentItem = ComponentItemFactory.create(key, {
        // attr: this.attributes,
      // });

      this.addComponent();
    }
  }

  public addComponent() {
    this._viewContainerRef.clear();
    // return this._viewContainerRef.createComponent(componentFactory);
    if (this.componentItem) {
      const factory: ComponentFactory<any> = this._componentFactoryResolver.resolveComponentFactory(this.componentItem);
      const componentRef = this._viewContainerRef.createComponent(factory);
      componentRef.instance.attr = this.attributes;
    }
  }

  public ngOnDestroy(): void {
    if (this._viewContainerRef) {
      this._viewContainerRef.remove();
    }
  }
}
