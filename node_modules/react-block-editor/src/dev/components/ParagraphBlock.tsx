import React from 'react';
import BlockContext, { map } from '../contexts/BlockContext';
import { BlockNodeBase, useBlockContent, TextBlockProps } from '../..';

type BlockNode = BlockNodeBase<'TextBlock', TextBlockProps>;

export interface ParagraphBlockProps {
  children: BlockNode[];
}

const ParagraphBlock: React.FunctionComponent<ParagraphBlockProps> = ({ children }) => {
  const BlockContent = useBlockContent<BlockNode, typeof map>(BlockContext);

  return (
    <p>
      <BlockContent>{children}</BlockContent>
    </p>
  );
};

export default ParagraphBlock;
