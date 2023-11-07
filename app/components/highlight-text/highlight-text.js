import { Fragment } from 'react';
import { keyA, keyB } from '../utils/keygen';

export const HighlightedText = ({text, highlight, style}) => {
  const chunks = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <Fragment>
      {chunks.map((c, i) => c.toLocaleLowerCase() === highlight ?
        <span key={keyA('hlChunk', i)} className={style}>{c}</span> :
          <Fragment key={keyB('voidChunk', i)}>{c}</Fragment>)}
    </Fragment>
  )
};