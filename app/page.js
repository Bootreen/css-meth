import './styles/common.css';
import './styles/hljs.css';
// import { useDbStore } from './components/store/store';
// import Oocss from './components/oocss/oocss';
import Bem from './components/bem/bem';
import getData from './components/utils/fetch-data';

export default async function Home() {
  // const currentSection = useDbStore(state => state.section);

  const { desc, cssSample } = await getData();

  return <Bem desc={desc} cssSample={cssSample} />

  // switch (currentSection) {
  //   case 0: return <Bem/>
  //   case 1: return <Oocss/>
  // }
}