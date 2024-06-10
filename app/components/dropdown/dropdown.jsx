import { Fragment } from "react";
import { keyB } from "../utils/keygen";

export const DropDown = ({ array, label }) =>
  array.map((e, i) => {
    const slice = Object.keys(e)[0];
    const { [slice]: checked } = array.filter((e) =>
      Object.hasOwn(e, slice)
    )[0];
    return !checked ? (
      <option key={keyB(label, i, slice)} value={slice}>
        {slice}
      </option>
    ) : (
      <Fragment key={keyB(label, i, slice)}></Fragment>
    );
  });
