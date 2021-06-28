import { ComponentFactory, ComponentRef, Directive, OnDestroy, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicItem]',
})
export class DynamicItemDirective implements OnDestroy {

  constructor(public _viewContainerRef: ViewContainerRef) {  }

   public addComponent( componentFactory: ComponentFactory<any>): ComponentRef<any> {
     this._viewContainerRef.clear();
     return this._viewContainerRef.createComponent(componentFactory);
   }

   public ngOnDestroy(): void {
     if (this._viewContainerRef) {
       this._viewContainerRef.remove();
     }
   }

}
