import React, { Context, useContext } from 'react';
import { BlockContext } from '../contexts/createBlockContext';

export interface BlockNodeBase<type extends string = string, Props = {}> {
  type: type;
  props: Props;
}

export interface BlockContentProps<BlockNode> {
  children: BlockNode[];
}

export default function useBlockContent<
  BlockNode extends BlockNodeBase,
  BlockMap extends { [key: string]: React.ElementType }
>(blockContext: Context<BlockContext<BlockMap>>) {
  const BlockContent: React.FunctionComponent<BlockContentProps<BlockNode>> = ({ children }) => {
    const { map } = useContext(blockContext);

    return (
      <>
        {children.map(({ type, props }, index) => {
          const Block = map[type];

          // eslint-disable-next-line react/no-array-index-key, react/jsx-props-no-spreading
          return <Block {...props} key={index} />;
        })}
      </>
    );
  };

  return BlockContent;
}
