import React from 'react';

export interface TextBlockProps {
  text: string;
}

const TextBlock: React.FunctionComponent<TextBlockProps> = ({ text }) => <>{text}</>;

export default TextBlock;
