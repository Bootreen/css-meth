import fsPromises from 'fs/promises';
import path from 'path';

const getData = async () => {
  const descPath = path.join(process.cwd(), '/public/methodologies/bem.dsc');
  const cssPath = path.join(process.cwd(), '/app/components/bem/bem.css');
  const descFile = await fetch('/images/agnetto_gold_thick.jpg');
  const cssFile = await fsPromises.readFile(cssPath, 'utf8');
  return { desc: descFile, cssSample: cssFile }
}

export default getData;