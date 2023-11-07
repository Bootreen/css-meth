import { keyA, keyB } from '../utils/keygen';

export const CheckboxesGroup = ({array, handler, label, tmpl}) => array.map((e, i) => {
  const slice = Object.keys(e)[0];
  const { [slice]: checked } = array.filter(e => Object.hasOwn(e, slice))[0];
  return (
    <div className={tmpl.modalCheckboxEl} key={keyB(label, i, slice)}>
      <input
        className={tmpl.modalCheckbox}
        type='checkbox'
        id={keyA(label, slice)}
        checked={checked}
        readOnly
        onClick={handler}
      />
      <label
        className={tmpl.modalLbl}
        htmlFor={keyA(label, slice)}
      >{slice}</label>
    </div>
  )
});