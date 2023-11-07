"use client";

import './bem.css';
import Image from 'next/image';
import Description from './description';
import { useEffect } from 'react';
import { useDbStore, useStoreActions } from '../store/store';
import { imgPref } from '../chiliesdb/chiliesdb';
import {
  renderCheckboxes,
  renderDropDown,
  renderTags,
  renderMenuTabs,
  renderList,
} from '../utils/renders';
import * as tmpl from './class-names';
import hljs from 'highlight.js';

hljs.configure({ cssSelector: 'code', languages: ['html', 'css'] });

const Bem = ({ desc }) => {
  // Highlight code insertion inside current section
  useEffect(() => hljs.highlightAll(), [desc]);

  const {
    firstSection,
    lastSection,
    changeSection,
    setActiveTab,
    filterList,
    setActiveListItem,
    setSearchString,
    toogleModalFilter,
    spicinessChecks,
    plantSizeChecks,
    fruitSizeChecks,
    shapeChecks,
    shapeTraitChecks,
    colorChecks,
    colorTraitChecks,
    selectAllFilters,
  } = useStoreActions();

  const activeTab = useDbStore(state => state.activeTab);
  const tabs = useDbStore(state => state.tabs);
  const activeListItem = useDbStore(state => state.activeListItem);
  const isModalVisible = useDbStore(state => state.isModalVisible);
  const searchString = useDbStore(state => state.searchString);
  const list = useDbStore(state => state.list);
  const spiciness = useDbStore(state => state.spiciness);
  const plantSizes = useDbStore(state => state.plantSizes);
  const fruitSizes = useDbStore(state => state.fruitSizes);
  const shapes = useDbStore(state => state.shapes);
  const shapeTraits = useDbStore(state => state.shapeTraits);
  const colors = useDbStore(state => state.colors);
  const colorTraits = useDbStore(state => state.colorTraits);

  const sectionHandler = event => changeSection(event.target.id);
  const menuHandler = event => {
    // extract the number from the supplement class "...menu-item--${number}"
    setActiveTab(Number(event.target.className.replace(/\D+/g, '')) - 1);
    filterList();
    setActiveListItem(0);
  };
  const listHandler = event => setActiveListItem(Number(event.target.id));
  const filterHandler = () => toogleModalFilter();
  const spicinessFilter = event => spicinessChecks(event.target.id.split('_')[1]);
  const plantSizeFilter = event => plantSizeChecks(event.target.id.split('_')[1]);
  const fruitSizeFilter = event => fruitSizeChecks(event.target.id.split('_')[1]);
  const shapesAddFilter = event => shapeChecks(event.target.value);
  const shapesRemoveFilter = event => shapeChecks(event.currentTarget.getAttribute('customvalue'));
  const shapeTraitsAddFilter = event => shapeTraitChecks(event.target.value);
  const shapeTraitsRemoveFilter = event => shapeTraitChecks(event.currentTarget.getAttribute('customvalue'));
  const colorsAddFilter = event => colorChecks(event.target.value);
  const colorsRemoveFilter = event => colorChecks(event.currentTarget.getAttribute('customvalue'));
  const colorTraitsAddFilter = event => colorTraitChecks(event.target.value);
  const colorTraitsRemoveFilter = event => colorTraitChecks(event.currentTarget.getAttribute('customvalue'));
  const selectAll = () => selectAllFilters(true);
  const selectNone = () => selectAllFilters(false);
  const searchHandler = event => {
    setSearchString(event.target.value.toLocaleLowerCase());
    filterList();
    setActiveListItem(0);
  };

  return (
    <main>
      {/* filter modal window */}
      <div className={tmpl.modalWnd(isModalVisible)}>
        <h4 className={tmpl.modalHdr}>
          Filters<span className={tmpl.modalCloseBtn} onClick={filterHandler}>&times;</span>
        </h4>
        <div className={tmpl.modalColumnsCont}>
          <div className={tmpl.modalColumn}>
            <h5 className={tmpl.modalSubHdr}>Spiciness</h5>
            {renderCheckboxes(spiciness, spicinessFilter, 'spiciness',
              [tmpl.modalCheckboxEl, tmpl.modalCheckbox, tmpl.modalLbl])}
          </div>
          <div className={tmpl.modalColumn}>
            <h5 className={tmpl.modalSubHdr}>Plant size</h5>
            {renderCheckboxes(plantSizes, plantSizeFilter, 'plant-size',
              [tmpl.modalCheckboxEl, tmpl.modalCheckbox, tmpl.modalLbl])}
          </div>
          <div className={tmpl.modalColumn}>
            <h5 className={tmpl.modalSubHdr}>Fruit size</h5>
            {renderCheckboxes(fruitSizes, fruitSizeFilter, 'fruit-size',
              [tmpl.modalCheckboxEl, tmpl.modalCheckbox, tmpl.modalLbl])}
          </div>
          <div className={tmpl.modalColumn}>
            <h5 className={tmpl.modalSubHdr}>Fruit shape</h5>
            <select
              className={tmpl.modalDropDn}
              disabled={shapes[0].all}
              onChange={shapesAddFilter}
            >
              <option defaultValue>select shape</option>
              {renderDropDown(shapes, 'shape-dropdown-item')}
            </select>
            {renderTags(shapes, shapesRemoveFilter, 'shape-tag',
              [tmpl.modalTag, tmpl.modalTagRemoveBtn])}
            <br/>
            <h5 className={tmpl.modalSubHdr}>Shape trait</h5>
            <select
              className={tmpl.modalDropDn}
              disabled={shapeTraits[0].all}
              onChange={shapeTraitsAddFilter}
            >
              <option defaultValue>select trait</option>
              {renderDropDown(shapeTraits, 'shape-trait-dropdown-item')}
            </select>
            {renderTags(shapeTraits, shapeTraitsRemoveFilter, 'shape-trait-tag',
              [tmpl.modalTag, tmpl.modalTagRemoveBtn])}
          </div>
          <div className={tmpl.modalColumn}>
            <h5 className={tmpl.modalSubHdr}>Fruit color</h5>
            <select
              className={tmpl.modalDropDn}
              disabled={colors[0].all}
              onChange={colorsAddFilter}
            >
              <option defaultValue>select color</option>
              {renderDropDown(colors, 'color-dropdown-item')}
            </select>
            {renderTags(colors, colorsRemoveFilter, 'color-tag',
              [tmpl.modalTag, tmpl.modalTagRemoveBtn])}
            <br/>
            <h5 className={tmpl.modalSubHdr}>Color trait</h5>
            <select
              className={tmpl.modalDropDn}
              disabled={colorTraits[0].all}
              onChange={colorTraitsAddFilter}
            >
              <option defaultValue>select trait</option>
              {renderDropDown(colorTraits, 'color-trait-dropdown-item')}
            </select>
            {renderTags(colorTraits, colorTraitsRemoveFilter, 'color-trait-tag',
              [tmpl.modalTag, tmpl.modalTagRemoveBtn])}
          </div>
        </div>
        <div className={tmpl.modalControlsCont}>
          <button className={tmpl.modalControlBtn} onClick={selectAll}>Select all</button>
          <button className={tmpl.modalControlBtn} onClick={selectNone}>Select none</button>
          <button className={tmpl.modalControlBtn} onClick={filterHandler}>Done</button>
        </div>
      </div>

      <h1 className={tmpl.docTitle}>CSS Methodologies</h1>
      <div className={tmpl.section}>

        <Description desc={desc} handler={sectionHandler} />

        {/* sample database interface */}
        <div className={tmpl.db}>
          <div className={tmpl.dbHdr}>
            <h2 className={tmpl.dbTitle}>Sample database: Chilies</h2>
          </div>
          <div className={tmpl.dbMenu}>
            {renderMenuTabs(tabs, menuHandler, activeTab, [tmpl.dbMenuItem, tmpl.dbMenuItemActive])}
            <div className={tmpl.dbMenuItemPhld}></div>
          </div>
          <div className={tmpl.dbBrowser}>
            <div className={tmpl.dbSearchCont}>
              <button
                className={tmpl.dbFilterBtn}
                onClick={filterHandler}
              >Filter</button>
              <input
                id='search'
                type='search'
                placeholder='Quick search'
                onChange={searchHandler}
                className={tmpl.dbSearchField}
              ></input>
            </div>
            <div className={tmpl.dbListCont}>
              {list.length > 0 && <div className={tmpl.dbListCol}>
                {renderList(list, listHandler, activeListItem, searchString,
                  [tmpl.dbListItem, tmpl.dbListItemActive, tmpl.hlText])}
              </div>}
            </div>
            {list.length > 0 && <div className={tmpl.dbPrevCol}>
              <h3 className={tmpl.dbPrevTitle}>{list[activeListItem].name}</h3>
              <div className={tmpl.dbPrevImgCont}>
                <Image
                  className={tmpl.dbPrevImg}
                  fill={true}
                  sizes='(max-width: 500px) 100vw'
                  priority={true}
                  src={imgPref + list[activeListItem].image}
                  alt={list[activeListItem].name}
                />
              </div>
              <ul className={tmpl.dbPrvSpecs}>
                <li className={tmpl.dbPrvSpecsItem}>
                  <span className={tmpl.dbPrvSpecsItemStrong}>C. {list[activeListItem].species}</span>
                </li>
                <li className={tmpl.dbPrvSpecsItem}>
                  Plant: <span className={tmpl.dbPrvSpecsItemStrong}>{list[activeListItem].plantSize}</span>
                </li>
                <li className={tmpl.dbPrvSpecsItem}>
                  Fruit: <span className={tmpl.dbPrvSpecsItemStrong}>{list[activeListItem].fruitSize}</span>
                </li>
                <li className={tmpl.dbPrvSpecsItem}>
                  Spiciness: <span className={tmpl.dbPrvSpecsItemStrong}>{list[activeListItem].heatLevel}</span>
                </li>
                <li className={tmpl.dbPrvSpecsItem}>
                  Shape: <span className={tmpl.dbPrvSpecsItemStrong}>{list[activeListItem].fruitShape}</span>
                </li>
                <li className={tmpl.dbPrvSpecsItem}>
                  Color: <span className={tmpl.dbPrvSpecsItemStrong}>{list[activeListItem].fruitColor}</span>
                </li>
              </ul>
              <p className={tmpl.dbPrvDesc}>{list[activeListItem].description}</p>
            </div>}
          </div>
        </div>

      </div>
    </main>
  )
}

export default Bem;