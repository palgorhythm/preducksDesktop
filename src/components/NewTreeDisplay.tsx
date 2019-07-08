import Tree from 'react-d3-tree';
import React, { Component, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { create } from 'domain';
import { ComponentInt, ComponentsInt, ChildInt } from '../utils/interfaces';

interface TreeInt {
  name: string;
  attributes: { [key: string]: { value: string } };
  children: TreeInt[];
}

interface PropsInt {
  focusChild: ChildInt;
  components: ComponentsInt;
  focusComponent: ComponentInt;
  classes: any;
}

const styles = (theme: any): any => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#333333',
    height: '100%',
    color: '#fff',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
  tabsRoot: {
    borderBottom: '0.5px solid #424242',
  },
  tabsIndicator: {
    backgroundColor: '#1de9b6',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,

    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#1de9b6',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#33eb91',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#4aedc4',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});

// const svgShape = {
//   shape: 'circle',
//   shapeProps: {
//     r: 50,
//     fill: '#007BFF',
//   },
// };

const TreeDisplay: React.FC<PropsInt> = (props): JSX.Element => {
  const [translation, setTranslation] = useState({ x: 0, y: 0 });
  let treeWrapper;
  useEffect(() => {
    // dynamically center the tree based on the div size
    const dimensions = treeWrapper.getBoundingClientRect();
    setTranslation({ x: dimensions.width / 2, y: dimensions.height / 3 });
  }, []);

  return (
    <div
      id="treeWrapper"
      style={{
        width: '100%',
        height: '100%',
      }}
      ref={node => (treeWrapper = node)}>
      <Tree
        data={[generateComponentTree(props.focusComponent.id, props.components)]}
        separation={{ siblings: 1, nonSiblings: 1 }}
        transitionDuration={0}
        translate={translation}
        collapsible={false}
        zoomable={true}
        orientation={'vertical'}
        textLayout={{
          textAnchor: 'middle',
          x: 0,
          y: 0,
          transform: undefined,
        }}
        styles={{
          nodes: {
            node: {
              name: {
                fill: '#FFFFFF',
                stroke: '#FFFFFF',
                strokeWidth: 1,
              },
            },
            leafNode: {
              name: {
                fill: '#FFFFFF',
                stroke: '#FFFFFF',
                strokeWidth: 1,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default withStyles(styles)(TreeDisplay);

function generateComponentTree(componentId: number, components: ComponentsInt) {
  const component = components.find(comp => comp.id === componentId);
  const tree = {
    name: component.title,
    attributes: {},
    children: [],
    nodeSvgShape: createRandomColorShape(60, '#F00BFF'),
  };
  component.childrenArray.forEach((child) => {
    if (child.childType === 'COMP') {
      tree.children.push(generateComponentTree(child.childComponentId, components));
    } else {
      tree.children.push({
        name: child.componentName,
        attributes: {},
        children: [],
        nodeSvgShape: createRandomColorShape(40, '#007BFF'),
      });
    }
  });
  return tree;
}

function createRandomColorShape(size, color) {
  return {
    shape: 'circle',
    shapeProps: {
      r: size,
      fill: color,
    },
  };
}

const randomColor = `rgb(${Math.floor(255 * Math.random())},${Math.floor(
  255 * Math.random(),
)},${Math.floor(255 * Math.random())})`;
