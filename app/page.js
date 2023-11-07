import './styles/common.css';
import './styles/hljs.css';
import getData from './components/utils/fetch-data';
import { Section } from './components/section/section';

const Home = async () => <Section description={await getData()} />;

export default Home;