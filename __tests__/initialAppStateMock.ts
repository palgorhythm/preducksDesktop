import cloneDeep from '../src/utils/cloneDeep';

const appComponent = {
  id: 1,
  stateful: false,
  componentState: [],
  title: 'App',
  color: '#FF6D00',
  props: [],
  nextPropId: 1,
  childrenArray: [],
  nextChildId: 1,
  focusChildId: 0,
  selectors: [],
  actions: [],
};

const initialApplicationFocusChild = {
  childId: 0,
  componentName: null,
  childType: null,
  childSort: 0,
  childComponentId: 0,
  color: null,
  htmlElement: null,
  HTMLInfo: null,
};

export default {
  totalComponents: 1,
  nextId: 2,
  successOpen: false,
  errorOpen: false,
  focusComponent: appComponent,
  selectableChildren: [],
  ancestors: [],
  initialApplicationFocusChild,
  focusChild: cloneDeep(initialApplicationFocusChild),
  components: [appComponent],
  appDir: '',
  loading: false,
  storeConfig: { interfaces: {}, reducers: {} },
};
