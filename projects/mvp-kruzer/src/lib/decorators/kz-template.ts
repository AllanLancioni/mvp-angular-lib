import { ChangeDetectionStrategy, Component, Directive, Type, TypeDecorator } from "@angular/core";
import "reflect-metadata";

export const defaultComponentProps: Component = {
    selector: undefined,
    inputs: undefined,
    outputs: undefined,
    host: undefined,
    exportAs: undefined,
    moduleId: undefined,
    providers: undefined,
    viewProviders: undefined,
    changeDetection: ChangeDetectionStrategy.Default,
    queries: undefined,
    templateUrl: undefined,
    template: undefined,
    styleUrls: undefined,
    styles: undefined,
    animations: undefined,
    encapsulation: undefined,
    interpolation: undefined,
    entryComponents: undefined
};
const c = class c { };
Component({})(c);
const DecoratorFactory = Object.getPrototypeOf(Reflect.getOwnMetadata('annotations', c)[0]);

export function KzTemplate(_props: Component) {

    let props = Object.create(DecoratorFactory);
    props = Object.assign(props, defaultComponentProps, _props);
    return function (cls: any): any {
        Reflect.defineMetadata('annotations', [_props], cls);
    }
}