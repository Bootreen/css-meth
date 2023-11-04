import './styles/common.css';
import './styles/hljs.css';
import { useDbStore } from './components/store/store';
import Bem from './components/bem/bem';
import Oocss from './components/oocss/oocss';
import fsPromises from 'fs/promises';
import path from 'path';

export const getStaticProps = async () => {
  const descPath = path.join(process.cwd(), '/app/components/bem/bem.dsc');
  const cssPath = path.join(process.cwd(), '/app/components/bem/bem.css');
  const descFile = await fsPromises.readFile(descPath, 'utf8');
  const cssFile = await fsPromises.readFile(cssPath, 'utf8');
  return { props: { desc: descFile, cssSample: cssFile }}
}

export default async function Home({ desc, cssSample }) {
  // const currentSection = useDbStore(state => state.section);

  return <Bem desc={desc} cssSample={cssSample} />

  // switch (currentSection) {
  //   case 0: return <Bem/>
  //   case 1: return <Oocss/>
  // }
}