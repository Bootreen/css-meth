import { keyA } from '../utils/keygen';

export const MenuTabs = ({array, handler, param, tmpl}) => array.map((e, i) => {
  return (
    <h5
      key={keyA(e, i)}
      className={`${tmpl.dbMenuItem} ${tmpl.dbMenuItem}-${i + 1} ${ param === i ? tmpl.dbMenuItemActive : '' }`}
      onClick={handler}
    >{e[0].toLocaleUpperCase() + e.slice(1)}</h5>
  )
});