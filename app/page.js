"use client";

import './styles/common.css';
import './styles/hljs.css';
import { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import Bem from './components/bem/bem';
import Oocss from './components/oocss/oocss';

hljs.configure({ cssSelector: 'code', languages: ['html', 'css'] });

export default function Home() {
  const SECTIONS = 2;
  const [section, setSection] = useState(0);

  const onButtonClickHandler = event => {
    if (event.target.id === 'prev' && section !== 0) setSection(section - 1);
    if (event.target.id === 'next' && SECTIONS - section !== 1) setSection(section + 1);
  };

  useEffect(() => {
    hljs.highlightAll();
    document.getElementById('prev').hidden = section === 0 ? true : false;
    document.getElementById('next').hidden = SECTIONS - section === 1 ? true : false;
  }, [section]);

  switch (section) {
    case 0: return <Bem handler = {onButtonClickHandler} />
    case 1: return <Oocss handler = {onButtonClickHandler} />
  }

}
