import { format } from 'prettier'; // also for testing
import {
  ComponentInt, ComponentsInt, ChildInt, ChildrenInt, PropInt,
} from './Interfaces';
import cloneDeep from './cloneDeep';

// testing stuff
import { dummyComponent, dummyAllComponents } from './dummyData';

const componentRender = (component: ComponentInt, components: ComponentsInt) => {
  const {
    childrenArray,
    title,
    props,
    selectors,
    actions
  }: {
  childrenArray: ChildrenInt;
  title: string;
  props: PropInt[];
  selectors: string[],
  actions: string[]
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
          return 'a href=""';
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

  let importFromReactReduxText = '';
  if (selectors.length && actions.length) {
    importFromReactReduxText = `import {useSelector, useDispatch} from 'react-redux';`;
  } else if (selectors.length) {
    importFromReactReduxText = `import {useSelector} from 'react-redux';`
  } else if (actions.length) {
    importFromReactReduxText = `import {useDispatch} from 'react-redux';`
  }

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
  import {${actionsToImport}} from '../actions';
  \n\n`;

  const propsText = `type Props = {
    ${props.map(prop => `${prop.key}: ${typeSwitcher(prop.type)}`).join('\n')}
  }\n\n`;

  const childrenToRender = `<div>
    ${cloneDeep(childrenArray)
    .sort((a: ChildInt, b: ChildInt) => a.childSort - b.childSort)
    .map(
      (child: ChildInt) => `<${componentNameGenerator(child)} ${propDrillTextGenerator(child)}/>`,
    )
    .join('\n')}
    </div>`;

  const useSelectorCalls = selectors.length ? 
    selectors.map(selector => {
      return `const ${selector.split('.')[1]} = useSelector(state => state.${selector})`;
    }).join('\n'): '';

  const functionalComponentBody = `
  const ${title} = (props: Props) => {
    const {${props.map(el => el.key).join(',\n')}} = props
    ${useSelectorCalls}
    ${actions.length ? `const dispatch = useDispatch();` : ``}
    return (${childrenToRender});
  }
  export default ${title};`;

  return importsText + propsText + functionalComponentBody;
};

console.log(
  format(componentRender(dummyComponent, dummyAllComponents), {
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    parser: 'typescript',
  }),
);
export default componentRender;
