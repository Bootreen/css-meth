import { keyA } from '../utils/keygen';

export const SectionChunk = ({chunk, type, tmpl, first, last, handler}) => {
  const headers = {
    pros: 'Pros',
    cons: 'Cons',
    example: 'Current doc\'s stylization according to this methodology',
  };
  const DescHdr = ({content, tmpl}) => <h3 className={tmpl}>{content}</h3>;
  const DescText = ({content, tmpl}) => <p className={tmpl}>{content}</p>;
  const DescCode = ({content}) => <code>{`${content.replaceAll('--CODE\n', '')}`}</code>;

  const payload = chunk.map((e, i) => {
    if (e.includes('[title]')) return (
      <div key='carousel' className={tmpl.carousel}>
        <div className={tmpl.carouselBtnCont}>
          <button
            id='prev'
            className={first ? tmpl.carouselBtnDis : tmpl.carouselBtn}
            onClick={handler}
          >◄ prev</button>
        </div>
        <h2 className={tmpl.sectionHdrMain}>{e.replaceAll('[title]', '')}</h2>
        <div className={tmpl.carouselBtnCont}>
          <button
            id='next'
            className={last ? tmpl.carouselBtnDis : tmpl.carouselBtn}
            onClick={handler}
          >next ►</button>
        </div>
      </div>
    );
    if (e.includes('[header]')) return (
      <DescHdr
        key={keyA('hdr', i)}
        content={e.replaceAll('[header]', '')}
        tmpl={tmpl.sectionHdr}
      />
    );
    if (e.includes('--CODE')) return (
      <DescCode
        key={keyA('code', i)}
        content={e}
      />
    );
    return (
      <DescText
        key={keyA('txt', i)}
        content={e}
        tmpl={type === 'pros' ? tmpl.sectionParPros :
          type === 'cons' ? tmpl.sectionParCons : tmpl.sectionPar}
      />
    );
  });
  // add section-specific headers
  if (type === 'pros') payload.unshift(
    <DescHdr
      key={keyA('hdr', 'p')}
      content={headers.pros}
      tmpl={tmpl.sectionHdrPros}
    />
  );
  if (type === 'cons') payload.unshift(
    <DescHdr
      key={keyA('hdr', 'c')}
      content={headers.cons}
      tmpl={tmpl.sectionHdrCons}
    />
  );
  if (type === 'example') payload.unshift(
    <DescHdr
      key={keyA('hdr', 'e')}
      content={headers.example}
      tmpl={tmpl.sectionHdr}
    />
  );

  return payload;
};