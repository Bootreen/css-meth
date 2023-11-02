import { keyA, keyB } from './keygen';
import { Fragment } from 'react';

const highlightText = (text, highlight, style) => {
  const chunks = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <Fragment>
      {chunks.map((c, i) => c.toLocaleLowerCase() === highlight ?
        <span key={keyA('hlChunk', i)} className={style}>{c}</span> :
          <Fragment key={keyB('voidChunk', i)}>{c}</Fragment>)}
    </Fragment>
  )
};

export const renderCheckboxes = (array, handler, label, styles) => array.map((e, i) => {
  const [styleGroup, styleCheckbox, styleLabel] = styles;
  const slice = Object.keys(e)[0];
  const { [slice]: checked } = array.filter(e => Object.hasOwn(e, slice))[0];
  return (
    <div className={styleGroup} key={keyB(label, i, slice)}>
      <input
        className={styleCheckbox}
        type='checkbox'
        id={keyA(label, slice)}
        checked={checked}
        readOnly
        onClick={handler}
      />
      <label
        className={styleLabel}
        htmlFor={keyA(label, slice)}
      >{slice}</label>
    </div>
  )
});

export const renderDropDown = (array, label) => array.map((e, i) => {
  const slice = Object.keys(e)[0];
  const { [slice]: checked } = array.filter(e => Object.hasOwn(e, slice))[0];
  return (
    !checked ?
      <option
        key={keyB(label, i, slice)}
        value={slice}
      >{slice}</option> : <Fragment key={keyB(label, i, slice)}></Fragment>
  )
});

export const renderTags = (array, handler, label, styles) => array.map((e, i) => {
  const [styleTag, styleRemoveBtn] = styles;
  const slice = Object.keys(e)[0];
  const { [slice]: checked } = array.filter(e => Object.hasOwn(e, slice))[0];
  return (
    checked ?
      <div
        key={keyB(label, i, slice)}
        className={styleTag}
        customvalue={slice}
        onClick={handler}
      >
        {slice}<span className={styleRemoveBtn}>&times;</span>
      </div> : <Fragment key={keyB(label, i, slice)}></Fragment>
  )
});

export const renderMenuTabs = (array, handler, param, styles) => array.map((e, i) => {
  const [dbMenuItem, dbMenuItemActive] = styles;
  return (
    <h5
      key={keyA(e, i)}
      className={`${dbMenuItem} ${dbMenuItem}-${i + 1} ${ param === i ? dbMenuItemActive : '' }`}
      onClick={handler}
    >{e[0].toLocaleUpperCase() + e.slice(1)}</h5>
  )
});

export const renderList = (array, handler, param, searchString, styles) => array.map((e, i) => {
  const [dbListItem, dbListItemActive, hlText] = styles;
  return (
    <div
      id={i}
      key={keyA(e, i)}
      className={`${dbListItem} ${ param === i ? dbListItemActive : '' }`}
      onClick={handler}
    >{highlightText(e.name, searchString, hlText)}</div>
  )
});