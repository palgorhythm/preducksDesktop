import React, { Component } from 'react';
import { format } from 'prettier';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { qtcreatorDark as style } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import componentRender from '../utils/componentRender.util';
import { ComponentInt, ComponentsInt } from '../utils/Interfaces';
/** **   SortCHildren will be fixed , dont XXX the file  *** */
// import SortChildren from './SortChildren.jsx';

type Props = {
  focusComponent: ComponentInt;
  components: ComponentsInt;
};

class CodePreview extends Component<Props> {
  render(): JSX.Element {
    const focusComponent: ComponentInt = this.props.focusComponent;
    const components: ComponentsInt = this.props.components;
    // console.log(focusComponent, components);
    // TODO: NEED TO FIGURE OUT HOW TO GET FORMATTING TO WORK ON CODE PREVIEW

    return (
      <div
        style={{
          height: '100%',
          margin: '10px',
          overflow: 'auto',
          fontSize: '18px',
        }}>
        <SyntaxHighlighter style={style}>
          {format(componentRender(focusComponent, components), {
            parser: 'typescript',
          })}
        </SyntaxHighlighter>
      </div>
    );
  }
}

export default CodePreview;
