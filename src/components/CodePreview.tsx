import React, { Component } from 'react';
import { format } from 'prettier';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hybrid } from 'react-syntax-highlighter/dist/styles/hljs/';
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

    return (
      <div
        style={{
          height: '300px',
          padding: '0',
          overflow: 'auto',
          fontSize: '20px',
        }}>
        <SyntaxHighlighter style={hybrid}>
          {format(componentRender(focusComponent, components), {
            parser: 'typescript',
          })}
        </SyntaxHighlighter>
      </div>
    );
  }
}

export default CodePreview;
