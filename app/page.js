import './styles/common.css';
import './styles/hljs.css';
import { useDbStore } from './components/store/store';
import Bem from './components/bem/bem';
import Oocss from './components/oocss/oocss';
import fsPromises from 'fs/promises';
import path from 'path';

export default async function Home() {
  // const currentSection = useDbStore(state => state.section);

  const descPath = path.join(process.cwd(), '/app/components/bem/bem.dsc');
  const cssPath = path.join(process.cwd(), '/app/components/bem/bem.css');
  const cssSample = await fsPromises.readFile(cssPath, 'utf8');
  const desc = await fsPromises.readFile(descPath, 'utf8');

  return <Bem cssSample={cssSample} desc={desc}/>

  // switch (currentSection) {
  //   case 0: return <Bem/>
  //   case 1: return <Oocss/>
  // }
}