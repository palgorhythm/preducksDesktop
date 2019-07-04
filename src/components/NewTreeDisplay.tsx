// import Tree from 'react-d3-tree';
// import React, { Component, useEffect, useState } from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import { ComponentInt, ComponentsInt, ChildInt } from '../utils/interfaces';

// interface TreeInt {
//   name: string;
//   attributes: { [key: string]: { value: string } };
//   children: TreeInt[];
// }

// interface PropsInt {
//   focusChild: ChildInt;
//   components: ComponentsInt;
//   focusComponent: ComponentInt;
//   classes: any;
// }

// const styles = (theme: any): any => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: '#333333',
//     height: '100%',
//     color: '#fff',
//     boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
//   },
//   tabsRoot: {
//     borderBottom: '0.5px solid #424242',
//   },
//   tabsIndicator: {
//     backgroundColor: '#1de9b6',
//   },
//   tabRoot: {
//     textTransform: 'initial',
//     minWidth: 72,
//     fontWeight: theme.typography.fontWeightRegular,
//     marginRight: theme.spacing.unit * 4,

//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:hover': {
//       color: '#1de9b6',
//       opacity: 1,
//     },
//     '&$tabSelected': {
//       color: '#33eb91',
//       fontWeight: theme.typography.fontWeightMedium,
//     },
//     '&:focus': {
//       color: '#4aedc4',
//     },
//   },
//   tabSelected: {},
//   typography: {
//     padding: theme.spacing.unit * 3,
//   },
//   padding: {
//     padding: `0 ${theme.spacing.unit * 2}px`,
//   },
// });

// const TreeDisplay: React.FC<PropsInt> = (props): JSX.Element => {
//   const [translation, setTranslation] = useState({ x: 0, y: 0 });
//   let treeWrapper;
//   useEffect(() => {
//     // dynamically center the tree based on the div size
//     const dimensions = treeWrapper.getBoundingClientRect();
//     setTranslation({ x: dimensions.width / 12, y: dimensions.height / 2.2 });
//   }, []);

//   return (
//     <div
//       id="treeWrapper"
//       style={{
//         width: '100%',
//         height: '100%',
//       }}
//       ref={node => (treeWrapper = node)}>
//       <Tree
//         data={[generateComponentTree(props.focusComponent.id, props.components)]}
//         separation={{ siblings: 0.3, nonSiblings: 0.3 }}
//         transitionDuration={0}
//         translate={translation}
//         styles={{
//           nodes: {
//             node: {
//               name: {
//                 fill: '#D3D3D3',
//                 stroke: '#D3D3D3',
//                 strokeWidth: 1,
//               },
//             },
//             leafNode: {
//               name: {
//                 fill: '#D3D3D3',
//                 stroke: '#D3D3D3',
//                 strokeWidth: 1,
//               },
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default withStyles(styles)(TreeDisplay);

// function generateComponentTree(componentId: number, components: ComponentsInt) {
//   const component = components.find(comp => comp.id === componentId);
//   const tree = { name: component.title, attributes: {}, children: [] };

//   component.childrenArray.forEach((child) => {
//     if (child.childType === 'COMP') {
//       tree.children.push(this.generateComponentTree(child.childComponentId, components));
//     } else {
//       tree.children.push({
//         name: child.componentName,
//         attributes: {},
//         children: [],
//       });
//     }
//   });
//   return tree;
// }
