const getData = async () => {
  const descUrlBem =
    "https://raw.githubusercontent.com/Bootreen/css-meth/master/public/methodologies/bem.dsc";
  const descUrlOocss =
    "https://raw.githubusercontent.com/Bootreen/css-meth/master/public/methodologies/oocss.dsc";
  const descUrlAtomic =
    "https://raw.githubusercontent.com/Bootreen/css-meth/master/public/methodologies/atomic.dsc";
  const descFileBem = await fetch(descUrlBem);
  const descFileOocss = await fetch(descUrlOocss);
  const descFileAtomic = await fetch(descUrlAtomic);
  const description = [
    await descFileBem.text(),
    await descFileOocss.text(),
    await descFileAtomic.text(),
  ];
  return description;
};

export default getData;
