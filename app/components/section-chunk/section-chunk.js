import { keyA } from '../utils/keygen';

export const SectionChunk = ({chunk, type, tmpl, first, last, handler}) => {
  const headers = {
    pros: 'Pros',
    cons: 'Cons',
    example: 'This methodology styling example',
  };
  const DescHdr = (payload, key, style) => <h3 key={key} className={style}>{payload}</h3>;
  const DescText = (payload, key, style) => <p key={key} className={style}>{payload}</p>;
  const DescCode = (payload, key) => <code key={key}>{`${payload.replaceAll('--CODE\n', '')}`}</code>;

  const payload = chunk.map((e, i) => {
    if (e.includes('[title]')) return (
      <div key='carousel' className={tmpl.carousel}>
        <div className={tmpl.carouselBtnCont}>
          <button
            id='prev'
            className={tmpl.carouselBtn(first)}
            onClick={handler}
          >◄ previous</button>
        </div>
        <h2 className={tmpl.sectionHdrMain}>{e.replaceAll('[title]', '')}</h2>
        <div className={tmpl.carouselBtnCont}>
          <button
            id='next'
            className={tmpl.carouselBtn(last)}
            onClick={handler}
          >next ►</button>
        </div>
      </div>
    );
    if (e.includes('[header]')) return DescHdr(e.replaceAll('[header]', ''), keyA('hdr', i), tmpl.sectionHdr);
    if (e.includes('--CODE')) return DescCode(e, keyA('code', i));
    return DescText(e, keyA('txt', i),
      type === 'pros' ? tmpl.sectionParPros : type === 'cons' ? tmpl.sectionParCons : tmpl.sectionPar)
  });
  // add section-specific headers
  if (type === 'pros') payload.unshift(DescHdr(headers.pros, keyA('hdr', 'p'), tmpl.sectionHdrPros));
  if (type === 'cons') payload.unshift(DescHdr(headers.cons, keyA('hdr', 'c'), tmpl.sectionHdrCons));
  if (type === 'example')
    payload.unshift(DescHdr(headers.example, keyA('hdr', 'c'), tmpl.sectionHdr));

  return payload;
};