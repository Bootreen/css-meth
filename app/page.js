"use client";

import './styles/common.css';
import './styles/hljs.css';
import { useStore, incSection, decSection} from './components/store/store';
import { useEffect } from 'react';
import hljs from 'highlight.js';
import Bem from './components/bem/bem';
import Oocss from './components/oocss/oocss';

hljs.configure({ cssSelector: 'code', languages: ['html', 'css'] });

export default function Home() {
  const currentSection = useStore(state => state.section);
  const onButtonClickHandler = event => {
    if (event.target.id === 'prev') decSection();
    if (event.target.id === 'next') incSection();
  };

  useEffect(() => {
    hljs.highlightAll();
  }, [currentSection]);

  switch (currentSection) {
    case 0: return <Bem handler = {onButtonClickHandler} />
    case 1: return <Oocss handler = {onButtonClickHandler} />
  }
}
