import { Fragment } from "react";
import { keyB } from "../utils/keygen";

export const TagSet = ({ array, handler, label, tmpl }) =>
  array.map((e, i) => {
    const slice = Object.keys(e)[0];
    const { [slice]: checked } = array.filter((e) =>
      Object.hasOwn(e, slice)
    )[0];
    return checked ? (
      <div
        key={keyB(label, i, slice)}
        className={tmpl.modalTag}
        customvalue={slice}
        onClick={handler}
      >
        {slice}
        <span className={tmpl.modalTagRemoveBtn}>&times;</span>
      </div>
    ) : (
      <Fragment key={keyB(label, i, slice)}></Fragment>
    );
  });
