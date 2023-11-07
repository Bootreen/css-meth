const getData = async () => {
  const descUrlBem = 'https://raw.githubusercontent.com/Bootreen/css-meth/master/public/methodologies/bem.dsc';
  const descUrlOocss = 'https://raw.githubusercontent.com/Bootreen/css-meth/master/public/methodologies/oocss.dsc';
  const descFileBem = await fetch(descUrlBem);
  const descFileOocss = await fetch(descUrlOocss);
  const description = [await descFileBem.text(), await descFileOocss.text()];
  return description;
}

export default getData;