import { Fragment } from 'react';
import { useDbStore, useStoreActions } from '../store/store';
import * as tmpl from './class-names';
import { keyA } from '../utils/keygen';

const Description = ({ desc, handler }) => {

  const { firstSection, lastSection } = useStoreActions();

  const DescHdr = (payload, key, style) => <h3 key={key} className={style}>{payload}</h3>;
  const DescText = (payload, key, style) => <p key={key} className={style}>{payload}</p>;
  const DescCode = (payload, key) => <code key={key}>{`${payload.replaceAll('--CODE\r\n', '')}`}</code>;
  const renderSection = (section, type) => {
    const payload = section.map((e, i) => {
      if (e.includes('[title]')) return (
        <div key='carousel' className={tmpl.carousel}>
          <div className={tmpl.carouselBtnCont}>
            <button
              id='prev'
              className={tmpl.carouselBtn(firstSection())}
              onClick={handler}
            >◄ previous</button>
          </div>
          <h2 className={tmpl.sectionHdrMain}>{e.replaceAll('[title]', '')}</h2>
          <div className={tmpl.carouselBtnCont}>
            <button
              id='next'
              className={tmpl.carouselBtn(lastSection())}
              onClick={handler}
            >next ►</button>
          </div>
        </div>
      );
      if (e.includes('[header]')) return DescHdr(e, keyA('hdr', i), tmpl.sectionHdr);
      if (e.includes('--CODE')) return DescCode(e, keyA('code', i));
      return DescText(e, keyA('txt', i),
        type === 'pros' ? tmpl.sectionParPros : type === 'cons' ? tmpl.sectionParCons : tmpl.sectionPar)
    });
    if (type === 'pros') payload.unshift(DescHdr('Pros', keyA('hdr', 'p'), tmpl.sectionHdrPros));
    if (type === 'cons') payload.unshift(DescHdr('Cons', keyA('hdr', 'c'), tmpl.sectionHdrCons));
    return payload;
  }

  let splitted = desc.split(/\[pros\]\r\n|\[cons\]\r\n/g)
    // preformat code insertion markers
    .map(e => e.replaceAll('[code]', '[code]--CODE'))
    // further split to plain text and code insertions
    .map(e => e.split(/\[code\]|\[\/code\]\r\n|\[\/code\]/g));
  // split multistrings and remove empty strings
  splitted.forEach((part, index) => {
    part.forEach((e, i) => {
      if (!e.includes('--CODE')) {
        part[i] = e.split(/\r\n/g);
        part[i].forEach((f, j) => {if (f === '') part[i].splice(j, 1)});
      };
      if (e === '') part.splice(i, 1);
    });
    splitted[index] = splitted[index].flat();
  });
  const [main, pros, cons] = splitted;

  return (
    <Fragment>
      {renderSection(main, 'main')}
      {renderSection(pros, 'pros')}
      {renderSection(cons, 'cons')}
    </Fragment>
  )
};

export default Description;