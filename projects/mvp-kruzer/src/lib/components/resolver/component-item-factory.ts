import {ComponentItem} from './component-item';

export class ComponentItemFactory {
  constructor() {}

  public static create(name: string, data: object): ComponentItem | null {
    // const found = [...TEMPLATES, ...CUSTOM_FEATURES, ...BLOCKS]
      // .map((x) => ({ name: x.name, component: x }))
      // .find((x) => name === x.name);

   // return found ? new ComponentItem(found.component, data) : null;
    return new ComponentItem(name, data);
  }
}
