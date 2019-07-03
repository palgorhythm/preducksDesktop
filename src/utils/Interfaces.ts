export interface PropInt {
  id: number;
  key: string;
  value: string;
  required: boolean;
  type: string;
}

export interface PositionInt {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ChildInt {
  childId: number;
  childSort: number;
  childType: string;
  childComponentId: number;
  componentName: string;
  position: PositionInt;
  color: string | null; // maybe optional instead, look up null vs undefined
  htmlElement: string | null; // maybe should be optional instead
  HTMLInfo: { [index: string]: string }; // replace with HTMLinfo specifics
}

export interface ChildrenInt extends Array<ChildInt> {}

export interface ComponentInt {
  id: number;
  stateful: boolean;
  title: string;
  color: string;
  props: PropInt[];
  nextPropId: number;
  position: PositionInt;
  childrenArray: ChildInt[];
  nextChildId: number;
  focusChildId: number;
  selectors: string[];
  actions: string[];
}

export interface ComponentsInt extends Array<ComponentInt> {}

export interface ApplicationStateInt {
  totalComponents: number;
  nextId: number;
  successOpen: boolean;
  errorOpen: boolean;
  focusComponent: ComponentInt;
  selectableChildren: number[];
  ancestors: number[];
  initialApplicationFocusChild: ChildInt;
  focusChild: ChildInt;
  components: ComponentsInt;
  appDir: string;
  loading: boolean;
  storeConfig: StoreConfigInterface;
}

export interface ActionConfigInterface {
  parameter: { name: string; type: string; array: boolean };
  payload: { type: string; array: boolean };
  async: boolean;
}

export interface StateConfigInterface {
  type: string;
  array: boolean;
  initialValue: any;
}
export interface StoreConfigInterface {
  interfaces: { [key: string]: { [key: string]: string } };
  reducers: {
    [key: string]: {
      store: { [key: string]: StateConfigInterface };
      actions: { [key: string]: ActionConfigInterface };
    };
  };
}
