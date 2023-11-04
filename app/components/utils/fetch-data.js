import fsPromises from 'fs/promises';
import path from 'path';

const getData = async () => {
  const descPath = path.join(process.cwd(), '/public/bem.dsc');
  const cssPath = path.join(process.cwd(), '/public/bem.css');
  const descFile = await fsPromises.readFile(descPath, 'utf8');
  const cssFile = await fsPromises.readFile(cssPath, 'utf8');
  return { desc: descFile, cssSample: cssFile }
}

export default getData;