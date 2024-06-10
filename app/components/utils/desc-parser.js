export const descParse = (description) => {
  let splitted = description
    .split(/\[pros\]\n|\[cons\]\n|\[example\]\n/g)
    // preformat code insertion markers
    .map((e) => e.replaceAll("[code]", "[code]--CODE"))
    // further split to plain text and code insertions
    .map((e) => e.split(/\[code\]|\[\/code\]\n|\[\/code\]/g));
  // split multistrings and remove empty strings
  splitted.forEach((part, index) => {
    part.forEach((e, i) => {
      if (!e.includes("--CODE")) {
        part[i] = e.split(/\n/g);
        part[i].forEach((f, j) => {
          if (f === "") part[i].splice(j, 1);
        });
      }
      if (e === "") part.splice(i, 1);
    });
    splitted[index] = splitted[index].flat();
  });
  return splitted;
};
