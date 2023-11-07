"use client";

import '@/app/styles/bem.css';
import '@/app/styles/oocss.css';
import { classNames } from '@/app/styles/class-names';
import { useEffect } from 'react';
import { useDbStore, useStoreActions } from '../store/store';
import { SectionChunk } from '../section-chunk/section-chunk';
import { descParse } from '../utils/desc-parser';
import { DatabaseBrowser } from '../database-browser/db-browser';
import { FilterModalWindow } from '../filter-modal-window/filter-modal';

import hljs from 'highlight.js';

hljs.configure({ cssSelector: 'code', languages: ['html', 'css'] });

export const Section = ({ description }) => {

  // Highlight code insertions inside current section
  useEffect(() => hljs.highlightAll(), [description]);

  const tmpl = classNames.bem;

  const [main, pros, cons, example] = descParse(description);

  const {
    firstSection,
    lastSection,
    changeSection,
    toogleModalFilter,
  } = useStoreActions();

  const sectionHandler = event => changeSection(event.target.id);
  const filterHandler = () => toogleModalFilter();

  return (
    <main>
      <h1 className={tmpl.docTitle}>CSS Methodologies</h1>
      <div className={tmpl.section}>
        <SectionChunk
          chunk={main}
          type='main'
          tmpl={tmpl}
          first={firstSection()}
          last={lastSection()}
          handler={sectionHandler}
        />
        <DatabaseBrowser modalHandler={filterHandler} tmpl={tmpl} />
        <SectionChunk chunk={pros} type='pros' tmpl={tmpl} />
        <SectionChunk chunk={cons} type='cons' tmpl={tmpl} />
        <SectionChunk chunk={example} type='example' tmpl={tmpl} />
        <FilterModalWindow modalHandler={filterHandler} tmpl={tmpl} />
      </div>
    </main>
  )
}