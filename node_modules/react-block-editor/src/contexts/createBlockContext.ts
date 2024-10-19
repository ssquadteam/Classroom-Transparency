import React from 'react';

export interface BlockContext<T> {
  map: T;
}

export default function createBlockContext<T>(defaultMap: T) {
  return React.createContext<BlockContext<T>>({ map: defaultMap });
}
