import { StoreConfigInterface } from './Interfaces';

const dummyComponent = {
  id: 1,
  stateful: false,
  title: 'App',
  color: '#FF6D00',
  props: [],
  nextPropId: 2,
  position: {
    x: 200,
    y: 80,
    width: 1260,
    height: 530,
  },
  childrenArray: [
    {
      childId: 4,
      childSort: 4,
      childType: 'COMP',
      childComponentId: 7,
      componentName: 'Board',
      position: {
        x: 270,
        y: 130,
        width: 1020,
        height: 340,
      },
      color: null,
      htmlElement: null,
      HTMLInfo: {},
    },
    {
      childId: 7,
      childSort: 7,
      childType: 'HTML',
      childComponentId: null,
      componentName: 'Image',
      position: {
        x: 290,
        y: 500,
        width: 560,
        height: 80,
      },
      color: null,
      htmlElement: 'Image',
      HTMLInfo: {},
    },
  ],
  nextChildId: 10,
  focusChildId: 7,
  focusChild: {
    childId: 7,
    childSort: 7,
    childType: 'HTML',
    childComponentId: null,
    componentName: 'Image',
    position: {
      x: 290,
      y: 500,
      width: 560,
      height: 80,
    },
    color: null,
    htmlElement: 'Image',
    HTMLInfo: {},
  },
};

const dummyAllComponents = [
  {
    id: 1,
    stateful: false,
    title: 'App',
    color: '#FF6D00',
    props: [],
    nextPropId: 2,
    position: {
      x: 200,
      y: 80,
      width: 1260,
      height: 530,
    },
    childrenArray: [
      {
        childId: 4,
        childSort: 4,
        childType: 'COMP',
        childComponentId: 7,
        componentName: 'Board',
        position: {
          x: 270,
          y: 130,
          width: 1020,
          height: 340,
        },
        color: null,
        htmlElement: null,
        HTMLInfo: {},
      },
      {
        childId: 7,
        childSort: 7,
        childType: 'HTML',
        childComponentId: null,
        componentName: 'Image',
        position: {
          x: 290,
          y: 500,
          width: 560,
          height: 80,
        },
        color: null,
        htmlElement: 'Image',
        HTMLInfo: {},
      },
    ],
    nextChildId: 10,
    focusChildId: 7,
    focusChild: {
      childId: 7,
      childSort: 7,
      childType: 'HTML',
      childComponentId: null,
      componentName: 'Image',
      position: {
        x: 290,
        y: 500,
        width: 560,
        height: 80,
      },
      color: null,
      htmlElement: 'Image',
      HTMLInfo: {},
    },
  },
  {
    id: 7,
    stateful: false,
    title: 'Board',
    color: '#E3AFBC',
    props: [
      {
        id: 1,
        key: 'isGameOver',
        value: 'false',
        required: true,
        type: 'boolean',
      },
    ],
    nextPropId: 2,
    position: {
      x: 25,
      y: 25,
      width: 800,
      height: 550,
    },
    childrenArray: [
      {
        childId: 2,
        childSort: 2,
        childType: 'COMP',
        childComponentId: 8,
        componentName: 'Box',
        position: {
          x: 39.09051724137931,
          y: 49.544642857142854,
          width: 250,
          height: 170,
        },
        color: null,
        htmlElement: null,
        HTMLInfo: {},
      },
      {
        childId: 6,
        childSort: 6,
        childType: 'COMP',
        childComponentId: 8,
        componentName: 'Box',
        position: {
          x: 450,
          y: 70,
          width: 230,
          height: 250,
        },
        color: null,
        htmlElement: null,
        HTMLInfo: {},
      },
      {
        childId: 5,
        childSort: 5,
        childType: 'COMP',
        childComponentId: 8,
        componentName: 'Box',
        position: {
          x: 103.69675817594847,
          y: 271.6143196202531,
          width: 300,
          height: 230,
        },
        color: null,
        htmlElement: null,
        HTMLInfo: {},
      },
    ],
    nextChildId: 8,
    focusChildId: 0,
    focusChild: {
      childId: 5,
      childSort: 5,
      childType: 'COMP',
      childComponentId: 8,
      componentName: 'Box',
      position: {
        x: 103.69675817594847,
        y: 271.6143196202531,
        width: 300,
        height: 230,
      },
      color: null,
      htmlElement: null,
      HTMLInfo: {},
    },
  },
  {
    id: 8,
    stateful: false,
    title: 'Box',
    color: '#8860D0',
    props: [
      {
        id: 1,
        key: 'gameState',
        value: '["","","","","","","","",""]',
        required: true,
        type: 'array',
      },
    ],
    nextPropId: 2,
    position: {
      x: 250,
      y: 70,
      width: 800,
      height: 550,
    },
    childrenArray: [],
    nextChildId: 1,
    focusChildId: -1,
  },
];

const storeConfigTicTacToe: StoreConfigInterface = {
  interfaces: {},
  reducers: {
    game: {
      store: {
        boxVals: { type: 'string', array: true, initialValue: ['', '', '', '', '', '', '', ''] },
        isGameOver: { type: 'boolean', array: false, initialValue: false },
      },
      actions: {
        toggle: {
          arg: { type: 'number', array: false },
          payload: { type: 'number', array: false },
          async: false,
        },
      },
    },
  },
};

const storeConfigTTTMultiReducer: StoreConfigInterface = {
  interfaces: {
    user: { name: 'string', password: 'string' },
    userAndHiScore: { user: 'user', hiScore: 'number' },
  },
  reducers: {
    game: {
      store: {
        boxVals: { type: 'string', array: true, initialValue: ['', '', '', '', '', '', '', ''] },
        isGameOver: { type: 'boolean', array: false, initialValue: false },
      },
      actions: {
        toggleBox: {
          arg: { type: 'number', array: false },
          payload: { type: 'number', array: false },
          async: false,
        },
      },
    },
    user: {
      store: {
        otherUsers: {
          type: 'user',
          array: true,
          initialValue: [{ name: 'bob', password: 'dole' }],
        },
        name: { type: 'string', array: false, initialValue: 'dan' },
        score: { type: 'number', array: false, initialValue: 12 },
      },
      actions: {
        addPoint: {
          arg: { type: 'none', array: false },
          payload: { type: 'number', array: false },
          async: false,
        },
        fetchHighScores: {
          arg: { type: 'none', array: false },
          payload: { type: 'boolean', array: false },
          async: true,
        },
      },
    },
  },
};

// example for todo app
const storeConfigTodo: StoreConfigInterface = {
  // config at the global level for redux store/actions
  interfaces: {
    todo: { id: 'number', title: 'string', completed: 'boolean' },
  },
  reducers: {
    todos: {
      store: {
        todoArray: { type: 'todo', array: true, initialValue: [] },
        allCompleted: { type: 'boolean', array: false, initialValue: false },
      },
      actions: {
        fetchTodos: {
          arg: { type: 'none', array: false },
          payload: { type: 'todo', array: true },
          async: true,
        },
        deleteTodo: {
          arg: { type: 'number', array: false },
          payload: { type: 'number', array: false },
          async: false,
        },
      },
    },
  },
};

module.exports = {
  dummyComponent,
  dummyAllComponents,
  storeConfigTTTMultiReducer,
  storeConfigTicTacToe,
  storeConfigTodo,
};
