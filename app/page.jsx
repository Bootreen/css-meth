import './styles/common.css';
import './styles/hljs.css';
import { classNames } from './styles/class-names';
import getData from './components/utils/fetch-data';
import { Section } from './components/section/section';

const Home = async () => {
  const desc = await getData();
  return <Section description={desc} templates={classNames} />;
}

export default Home;