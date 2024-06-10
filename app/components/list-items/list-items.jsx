import { keyA } from "../utils/keygen";
import { HighlightedText } from "../highlight-text/highlight-text";

export const ListItems = ({ array, handler, param, searchString, tmpl }) =>
  array.map((e, i) => {
    return (
      <div
        id={i}
        key={keyA(e, i)}
        className={`${tmpl.dbListItem} ${
          param === i ? tmpl.dbListItemActive : ""
        }`}
        onClick={handler}
      >
        <HighlightedText
          text={e.name}
          highlight={searchString}
          style={tmpl.hlText}
        />
      </div>
    );
  });
