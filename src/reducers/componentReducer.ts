import { ComponentInt, ChildInt, ApplicationStateInt } from '../utils/interfaces';

import {
  LOAD_INIT_DATA,
  ADD_COMPONENT,
  ADD_CHILD,
  DELETE_CHILD,
  DELETE_COMPONENT,
  CHANGE_FOCUS_COMPONENT,
  CHANGE_FOCUS_CHILD,
  CHANGE_COMPONENT_FOCUS_CHILD,
  EXPORT_FILES,
  CREATE_APPLICATION,
  EXPORT_FILES_SUCCESS,
  EXPORT_FILES_ERROR,
  CREATE_APPLICATION_ERROR,
  HANDLE_CLOSE,
  HANDLE_TRANSFORM,
  OPEN_EXPANSION_PANEL,
  DELETE_ALL_DATA,
  CHANGE_IMAGE_PATH,
  ADD_PROP,
  DELETE_PROP,
  UPDATE_HTML_ATTR,
  UPDATE_CHILDREN_SORT,
  ADD_SELECTOR,
  DELETE_SELECTOR,
  ADD_ACTION_TO_COMPONENT,
  DELETE_ACTION_FROM_COMPONENT,
  SET_REDUCER,
  DELETE_REDUCER,
  RENAME_REDUCER,
  SET_INTERFACE,
  DELETE_INTERFACE,
  RENAME_INTERFACE,
  SET_STATE,
  DELETE_STATE,
  RENAME_STATE,
} from '../actionTypes';

import {
  addComponent,
  addChild,
  deleteChild,
  deleteComponent,
  changeFocusComponent,
  changeComponentFocusChild,
  changeFocusChild,
  exportFilesSuccess,
  exportFilesError,
  handleClose,
  handleTransform,
  openExpansionPanel,
  addProp,
  deleteProp,
  updateHtmlAttr,
  updateChildrenSort,
  addSelector,
  deleteSelector,
  addActionToComponent,
  deleteActionFromComponent,
  setReducer,
  deleteReducer,
  renameReducer,
  setInterface,
  deleteInterface,
  renameInterface,
  setState,
  deleteState,
  renameState,
} from '../utils/componentReducer.util';
import cloneDeep from '../utils/cloneDeep';

const appComponent: ComponentInt = {
  id: 1,
  stateful: false,
  componentState: [],
  title: 'App',
  color: '#FF6D00',
  props: [],
  nextPropId: 1,
  position: {
    x: 25,
    y: 25,
    width: 600,
    height: 400,
  },
  childrenArray: [],
  nextChildId: 1,
  focusChildId: 0,
  selectors: [],
  actions: [],
};

const initialApplicationFocusChild: ChildInt = {
  childId: 0,
  componentName: null,
  position: {
    x: 25,
    y: 25,
    width: 800,
    height: 550,
  },
  childType: null,
  childSort: 0,
  childComponentId: 0,
  color: null,
  htmlElement: null,
  HTMLInfo: null,
};

const initialApplicationState: ApplicationStateInt = {
  totalComponents: 1,
  nextId: 2,
  successOpen: false,
  errorOpen: false,
  focusComponent: appComponent,
  selectableChildren: [],
  ancestors: [],
  initialApplicationFocusChild,
  focusChild: cloneDeep<ChildInt>(initialApplicationFocusChild),
  components: [appComponent],
  appDir: '',
  loading: false,
  storeConfig: { interfaces: {}, reducers: {} },
};

const componentReducer = (state = initialApplicationState, action: any) => {
  switch (action.type) {
    case LOAD_INIT_DATA:
      // return { ...state };
      return {
        ...state,
        ...action.payload.data,
        loading: false,
        appDir: '',
        successOpen: false,
        errorOpen: false,
      };
    case ADD_COMPONENT:
      return addComponent(state, action.payload);
    case ADD_CHILD:
      return addChild(state, action.payload);
    case DELETE_CHILD:
      return deleteChild(state, action.payload);
    case DELETE_COMPONENT:
      return deleteComponent(state, action.payload);
    case CHANGE_FOCUS_COMPONENT:
      return changeFocusComponent(state, action.payload);
    case CHANGE_FOCUS_CHILD:
      return changeFocusChild(state, action.payload);
    case CHANGE_COMPONENT_FOCUS_CHILD:
      return changeComponentFocusChild(state, action.payload);
    case CREATE_APPLICATION:
    case EXPORT_FILES:
      return { ...state, loading: true };
    case EXPORT_FILES_SUCCESS:
      return exportFilesSuccess(state, action.payload);
    case CREATE_APPLICATION_ERROR:
    case EXPORT_FILES_ERROR:
      return exportFilesError(state, action.payload);
    case HANDLE_CLOSE:
      return handleClose(state, action.payload);
    case HANDLE_TRANSFORM:
      return handleTransform(state, action.payload);
    case OPEN_EXPANSION_PANEL:
      return openExpansionPanel(state, action.payload);
    case DELETE_ALL_DATA:
      return initialApplicationState;
    case ADD_PROP:
      return addProp(state, action.payload);
    case DELETE_PROP:
      return deleteProp(state, action.payload);
    case UPDATE_HTML_ATTR:
      return updateHtmlAttr(state, action.payload);
    case UPDATE_CHILDREN_SORT:
      return updateChildrenSort(state, action.payload);
    case ADD_SELECTOR:
      return addSelector(state, action.payload);
    case DELETE_SELECTOR:
      return deleteSelector(state, action.payload);
    case ADD_ACTION_TO_COMPONENT:
      return addActionToComponent(state, action.payload);
    case DELETE_ACTION_FROM_COMPONENT:
      return deleteActionFromComponent(state, action.payload);
    case SET_REDUCER:
      return setReducer(state, action.payload);
    case DELETE_REDUCER:
      return deleteReducer(state, action.payload);
    case RENAME_REDUCER:
      return renameReducer(state, action.payload);
    case SET_INTERFACE:
      return setInterface(state, action.payload);
    case DELETE_INTERFACE:
      return deleteInterface(state, action.payload);
    case RENAME_INTERFACE:
      return renameInterface(state, action.payload);
    case SET_STATE:
      return setState(state, action.payload);
    case DELETE_STATE:
      return deleteState(state, action.payload);
    case RENAME_STATE:
      return renameState(state, action.payload);
    default:
      return state;
  }
};

export default componentReducer;
