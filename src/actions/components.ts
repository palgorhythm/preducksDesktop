import { ComponentState } from 'react';
import {
  ComponentInt,
  ComponentsInt,
  PropInt,
  ChildInt,
  InterfacesInterface,
  ReducersInterface,
  StoreConfigInterface,
  ComponentStateInterface,
} from '../utils/InterfaceDefinitions';
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
  EXPORT_FILES_SUCCESS,
  EXPORT_FILES_ERROR,
  HANDLE_CLOSE,
  HANDLE_TRANSFORM,
  CREATE_APPLICATION,
  CREATE_APPLICATION_SUCCESS,
  CREATE_APPLICATION_ERROR,
  OPEN_EXPANSION_PANEL,
  DELETE_PROP,
  ADD_PROP,
  DELETE_ALL_DATA,
  UPDATE_HTML_ATTR,
  UPDATE_CHILDREN_SORT,
  ADD_SELECTOR,
  DELETE_SELECTOR,
  ADD_ACTION_TO_COMPONENT,
  DELETE_ACTION_FROM_COMPONENT,
  SET_REDUCER,
  DELETE_REDUCER,
  // RENAME_REDUCER,
  SET_INTERFACE,
  DELETE_INTERFACE,
  // RENAME_INTERFACE,
  SET_STATE,
  DELETE_STATE,
  // RENAME_STATE,
} from '../actionTypes/index.js';

import { loadState } from '../localStorage';
import createComponentFiles from '../utils/createComponentFiles.util';
import createApplicationUtil from '../utils/createApplication.util';

export const loadInitData = () => (dispatch: any) => {
  loadState().then((data: any) => dispatch({
    type: LOAD_INIT_DATA,
    payload: {
      data: data ? data.workspace : {},
    },
  }));
};

export const addComponent = ({ title }: { title: string }) => (dispatch: any) => {
  dispatch({ type: ADD_COMPONENT, payload: { title } });
};

export const addChild = ({
  title,
  childType,
  HTMLInfo,
}: {
title: string;
childType: string;
HTMLInfo: object;
}) => (dispatch: any) => {
  dispatch({ type: ADD_CHILD, payload: { title, childType, HTMLInfo } });
};

export const deleteChild = (childToDeleteId?: number) => (dispatch: any) => {
  // with no payload, it will delete focusd child
  dispatch({ type: DELETE_CHILD, payload: childToDeleteId });
};

export const deleteComponent = ({
  componentId,
  stateComponents,
}: {
componentId: number;
stateComponents: ComponentsInt;
}) => (dispatch: any) => {
  // find all places where the "to be deleted" is a child and do what u gotta do
  stateComponents.forEach((parent: ComponentInt) => {
    parent.childrenArray
      .filter((child: ChildInt) => child.childComponentId === componentId)
      .forEach((child: ChildInt) => {
        dispatch({
          type: DELETE_CHILD,
          payload: {
            parentId: parent.id,
            childId: child.childId,
            calledFromDeleteComponent: true,
          },
        });
      });
  });

  // change focus to app
  dispatch({ type: CHANGE_FOCUS_COMPONENT, payload: { title: 'App' } });
  // after taking care of the children delete the component
  dispatch({ type: DELETE_COMPONENT, payload: { componentId } });
};

export const changeFocusComponent = ({ title }: { title: string }) => (dispatch: any) => {
  dispatch({ type: CHANGE_FOCUS_COMPONENT, payload: { title } });
};

// make sure childId is being sent in
export const changeFocusChild = ({ childId }: { childId: number }) => (dispatch: any) => {
  dispatch({ type: CHANGE_FOCUS_CHILD, payload: { childId } });
};

export const changeComponentFocusChild = ({
  componentId,
  childId,
}: {
componentId: number;
childId: number;
}) => (dispatch: any) => {
  dispatch({
    type: CHANGE_COMPONENT_FOCUS_CHILD,
    payload: { componentId, childId },
  });
};

export const exportFiles = ({
  components,
  path,
  appName,
  exportAppBool,
}: {
components: ComponentsInt;
path: string;
appName: string;
exportAppBool: boolean;
}) => (dispatch: any) => {
  // this dispatch sets the global state property 'loading' to true until the createComponentFiles call resolves below
  dispatch({
    type: EXPORT_FILES,
  });

  createComponentFiles(components, path, appName, exportAppBool)
    .then(dir => dispatch({
      type: EXPORT_FILES_SUCCESS,
      payload: { status: true, dir: dir[0] },
    }))
    .catch(err => dispatch({
      type: EXPORT_FILES_ERROR,
      payload: { status: true, err },
    }));
};

export const handleClose = () => ({
  type: HANDLE_CLOSE,
  payload: false,
});

export const handleTransform = (
  componentId: number,
  childId: number,
  {
    x, y, width, height,
  }: { x: number; y: number; width: number; height: number },
) => ({
  type: HANDLE_TRANSFORM,
  payload: {
    componentId,
    childId,
    x,
    y,
    width,
    height,
  },
});

export const createApplication = ({
  path,
  components = [],
  genOption,
  appName = 'dope_exported_preducks_app',
  exportAppBool,
  storeConfig,
}: {
path: string;
components: ComponentsInt;
genOption: number;
appName: string;
exportAppBool: boolean;
storeConfig: StoreConfigInterface;
}) => (dispatch: any) => {
  if (genOption === 0) {
    exportAppBool = false;
    dispatch(
      exportFiles({
        appName,
        path,
        components,
        exportAppBool,
      }),
    );
  } else if (genOption) {
    exportAppBool = true;
    dispatch({
      type: CREATE_APPLICATION,
    });
    createApplicationUtil({
      path,
      appName,
      genOption,
      storeConfig,
    })
      .then(() => {
        dispatch({
          type: CREATE_APPLICATION_SUCCESS,
        });
        dispatch(
          exportFiles({
            appName,
            path,
            components,
            exportAppBool,
          }),
        );
      })
      .catch(err => dispatch({
        type: CREATE_APPLICATION_ERROR,
        payload: { status: true, err },
      }));
  }
};

export const openExpansionPanel = (component: ComponentInt) => ({
  type: OPEN_EXPANSION_PANEL,
  payload: { component },
});

export const deleteAllData = () => ({
  type: DELETE_ALL_DATA,
});

export const deleteProp = (propId: number) => (dispatch: any) => {
  dispatch({ type: DELETE_PROP, payload: propId });
};

export const addProp = (prop: PropInt) => ({
  type: ADD_PROP,
  payload: { ...prop },
});

export const updateHtmlAttr = ({ attr, value }: { attr: string; value: string }) => (
  dispatch: any,
) => {
  dispatch({
    type: UPDATE_HTML_ATTR,
    payload: { attr, value },
  });
};

export const updateChildrenSort = ({ newSortValues }: { newSortValues: any }) => (
  dispatch: any,
) => {
  dispatch({
    type: UPDATE_CHILDREN_SORT,
    payload: { newSortValues },
  });
};

export const addSelector = (name: string) => ({
  type: ADD_SELECTOR,
  payload: name,
});
export const deleteSelector = (name: string) => ({
  type: DELETE_SELECTOR,
  payload: name,
});

export const addActionToComponent = (name: string) => ({
  type: ADD_ACTION_TO_COMPONENT,
  payload: name,
});

export const deleteActionFromComponent = (name: string) => ({
  type: DELETE_ACTION_FROM_COMPONENT,
  payload: name,
});

export const setReducer = (reducer: ReducersInterface) => ({
  type: SET_REDUCER,
  payload: reducer,
});

export const deleteReducer = (name: string) => ({
  type: DELETE_REDUCER,
  payload: name,
});

// export const renameReducer = (oldName: string, newName: string) => ({
//   type: RENAME_REDUCER,
//   payload: {
//     oldName,
//     newName,
//   },
// });

export const setInterface = (userInterface: InterfacesInterface) => ({
  type: SET_INTERFACE,
  payload: userInterface,
});

export const deleteInterface = (name: string) => ({
  type: DELETE_INTERFACE,
  payload: name,
});

// export const renameInterface = (oldName: string, newName: string) => ({
//   type: RENAME_INTERFACE,
//   payload: {
//     oldName,
//     newName,
//   },
// });

export const setState = (state: ComponentStateInterface) => ({
  type: SET_STATE,
  payload: state,
});

export const deleteState = (name: string) => ({
  type: DELETE_STATE,
  payload: name,
});

// export const renameState = (oldName: string, newName: string) => ({
//   type: RENAME_STATE,
//   payload: {
//     oldName,
//     newName,
//   },
// });
