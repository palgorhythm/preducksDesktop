import {
  ComponentInt,
  ComponentsInt,
  ChildInt,
  ChildrenInt,
  PropInt,
  ComponentStateInterface,
} from './Interfaces';
import cloneDeep from './cloneDeep';

// testing stuff
// import { format } from 'prettier'; // also for testing
// import { dummyComponent, dummyAllComponents } from './dummyData';

const componentRender = (component: ComponentInt, components: ComponentsInt) => {
  const {
    childrenArray,
    title,
    props,
    selectors,
    actions,
    componentState,
  }: {
  childrenArray: ChildrenInt;
  title: string;
  props: PropInt[];
  selectors: string[];
  actions: string[];
  componentState: ComponentStateInterface[];
  } = component;
  function typeSwitcher(type: string) {
    switch (type) {
      case 'string':
        return 'string';
      case 'number':
        return 'number';
      case 'object':
        return 'object';
      case 'array':
        return 'any[]';
      case 'boolean':
        return 'boolean';
      case 'function':
        return '() => any';
      case 'node':
        return 'string';
      case 'element':
        return 'string';
      case 'tuple':
        return '[any]';
      case 'enum':
        return '{}';
      case 'any':
        return 'any';
      default:
        return 'any';
    }
  }

  function propDrillTextGenerator(child: ChildInt) {
    // probably don't need this
    if (child.childType === 'COMP') {
      return components
        .find((c: any) => c.id === child.childComponentId)
        .props.map((prop: PropInt) => `${prop.key}={${prop.value}}`)
        .join(' ');
    }
    if (child.childType === 'HTML') {
      const keys: string[] = Object.keys(child.HTMLInfo);
      return keys.map(key => `${key}={${htmlAttrSanitizer(child.HTMLInfo[key])}}`).join(' ');
    }
    return '';
  }

  function htmlAttrSanitizer(element: string) {
    // TODO: debug localForage unhappiness to renable image imports
    // this shouldn't be needed, but some characters make localForage unhappy
    console.log('current thing', element);
    return element
      .replace(/[a-z]+/gi, word => word[0].toUpperCase() + word.slice(1))
      .replace(/[-_\s0-9\W]+/gi, '');
  }
  function componentNameGenerator(child: ChildInt) {
    if (child.childType === 'HTML') {
      switch (child.componentName) {
        case 'Image':
          return 'img';
        case 'Form':
          return 'form';
        case 'Button':
          return 'button';
        case 'Link':
          return 'a';
        case 'List':
          return 'ul';
        case 'Paragraph':
          return 'p';
        default:
          return 'div';
      }
    } else {
      return child.componentName;
    }
  }

  const toImport = [];
  if (selectors.length) {
    toImport.push('useSelector');
  }
  if (actions.length) {
    toImport.push('useDispatch');
  }
  if (componentState.length) {
    toImport.push('useState');
  }
  const importFromReactReduxText = `import {${toImport.join(',')}} from 'react-redux'`;

  const actionsToImport = actions.length ? actions.join(', ') : '';

  const importsText = `import React from 'react';
  ${[
    ...new Set(
      childrenArray
        .filter(child => child.childType !== 'HTML')
        .map(child => `import ${child.componentName} from './${child.componentName}';`),
    ),
  ].join('\n')}
  ${importFromReactReduxText}
  ${actions.length ? `import {${actionsToImport}} from '../actions';` : ''}
  \n\n`;

  // const propsText = `type Props = {
  //   ${props.map(prop => `${prop.key}: ${typeSwitcher(prop.type)}`).join('\n')}
  // }\n\n`;

  const childrenToRender = `<div>
    ${cloneDeep(childrenArray)
    .sort((a: ChildInt, b: ChildInt) => a.childSort - b.childSort)
    .map(
      (child: ChildInt) => `<${componentNameGenerator(child)} ${propDrillTextGenerator(child)}/>`,
    )
    .join('\n')}
    </div>`;

  const useSelectorCalls = selectors.length
    ? selectors
      .map((selector) => {
        const selectorStrings = selector.split('.');
        const variableName = selectorStrings[0] + selectorStrings[1][0].toUpperCase() + selectorStrings[1].slice(1);
        return `const ${variableName} = useSelector(state => state.${selector});`;
      })
      .join('\n')
    : '';

  const useStateCalls = componentState.length
    ? componentState.map((pieceOfState: ComponentStateInterface) => {
      const initialValue = pieceOfState.type === 'string'
        ? `'${pieceOfState.initialValue}'`
        : pieceOfState.initialValue;
      return `const [${
        pieceOfState.name
      }, set${pieceOfState.name[0].toUpperCase()}${pieceOfState.name.slice(
        1,
      )}] = useState(${initialValue});`;
    }).join('\n')
    : '';

  const propDestructuringText = `const {${props.map(el => el.key).join(',\n')}} = props`;
  const functionalComponentBody = `
  const ${title} = (props: Props) => {
    ${useStateCalls}
    ${useSelectorCalls}
    ${actions.length ? 'const dispatch = useDispatch();' : ''}
    return (${childrenToRender});
  }
  export default ${title};`;
  return importsText + functionalComponentBody;
};

// console.log(
//   format(componentRender(dummyComponent, dummyAllComponents), {
//     singleQuote: true,
//     trailingComma: 'es5',
//     bracketSpacing: true,
//     jsxBracketSameLine: true,
//     parser: 'typescript',
//   }),
// );
export default componentRender;
