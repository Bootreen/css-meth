"use client";

import './styles/common.css';
import './styles/hljs.css';
import hljs from 'highlight.js';
import { useDbStore } from './components/store/store';
import { useEffect } from 'react';
import Bem from './components/bem/bem';
import Oocss from './components/oocss/oocss';

hljs.configure({ cssSelector: 'code', languages: ['html', 'css'] });

export default function Home() {
  const currentSection = useDbStore(state => state.section);

  // Highlight code insertion inside current section
  useEffect(() => hljs.highlightAll(), [currentSection]);

  switch (currentSection) {
    case 0: return <Bem/>
    case 1: return <Oocss/>
  }
}