import BlockContext, { map } from '../contexts/BlockContext';
import { ParagraphBlockProps } from './ParagraphBlock';
import { TextBlockProps, BlockNodeBase, useBlockContent } from '../..';

type BlockNode =
  | BlockNodeBase<'ParagraphBlock', ParagraphBlockProps>
  | BlockNodeBase<'TextBlock', TextBlockProps>;

const BlockContent = useBlockContent<BlockNode, typeof map>(BlockContext);

export default BlockContent;
