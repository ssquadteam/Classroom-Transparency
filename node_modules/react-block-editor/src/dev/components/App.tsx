import React from 'react';
import BlockContent from './BlockContent';
import BlockContext, { map } from '../contexts/BlockContext';

const App: React.FunctionComponent = () => (
  <BlockContext.Provider value={{ map }}>
    <BlockContent>
      {[
        {
          type: 'ParagraphBlock',
          props: {
            children: [
              {
                type: 'TextBlock',
                props: {
                  text: 'TEST1'
                }
              },
              {
                type: 'TextBlock',
                props: {
                  text: 'TEST2'
                }
              }
            ]
          }
        }
      ]}
    </BlockContent>
  </BlockContext.Provider>
);

export default App;
