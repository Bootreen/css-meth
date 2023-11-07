const getData = async () => {
  const descUrl = 'https://raw.githubusercontent.com/Bootreen/css-meth/master/public/methodologies/bem.dsc';
  const descFile = await fetch(descUrl);
  const description = await descFile.text();
  return description;
}

export default getData;