import './bem.css';
import Image from 'next/image';
import { useDbStore, useStoreActions } from '../store/store';
import { imagePrefix } from '../chiliesdb/chiliesdb';
import { highlightText, renderCheckboxes, renderDropDown, renderTags } from '../utils/renders';
import * as tmpl from './class-names';

const Bem = () => {
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
        <div className={tmpl.modalColumnsCntr}>
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
        <div className={tmpl.modalControlsCntr}>
          <button className={tmpl.modalControlBtn} onClick={selectAll}>Select all</button>
          <button className={tmpl.modalControlBtn} onClick={selectNone}>Select none</button>
          <button className={tmpl.modalControlBtn} onClick={filterHandler}>Done</button>
        </div>
      </div>

      <h1 className="document-title">CSS Methodologies</h1>
      <div className="section-container">
        <div className="carousel">
          <div className="carousel__button-container">
            <button
              id="prev"
              className={`carousel__button${firstSection() ? " carousel__button--disabled" : ""}`}
              onClick={sectionHandler}
            >◄ previous</button>
          </div>
          <h2 className="section-container__header section-container__header--main">BEM (Block - Element - Modifier)</h2>
          <div className="carousel__button-container">
            <button
              id="next"
              className={`carousel__button${lastSection() ? " carousel__button--disabled" : ""}`}
              onClick={sectionHandler}
            >next ►</button>
          </div>
        </div>
        <h3 className="section-container__header">In a nutshell</h3>
        <p className="section-container__paragraph">Устаревшее говно мамонта, изобретенное в Яндексе еще в 2005. Подкупает своей простотой. Практически нигде, кроме постсовка, не используется.</p>
        <p className="section-container__paragraph">Согласно BEM весь layout можно разбить на функционально обособленные блоки. Примеры блоков: меню, статья, сайдбар, поле поиска. Блоки, в свою очередь, состоят из элементов (элемент меню, заголовок, абзац). Для блоков и для элементов при необходимости можно создать дополнительные классы-модификаторы, которые меняют их дефолтные свойства (active, selected, disabled и т.п.).</p>
        <p className="section-container__paragraph">Вложенная структура блоков игнорируется, с точки зрения BEM все блоки принадлежат к одному глобальному уровню.</p>
        <p className="section-container__paragraph">BEM запрещает назначать стили через ID и CSS tag (a, p, h1, div и т.п.), в качестве селекторов всегда должны использоваться только классы.</p>
        <h3 className="section-container__header section-container__header--pros">Pros</h3>
        <p className="section-container__paragraph section-container__paragraph--pros">Хоть какой-то системный подход для организации CSS в противовес полной анархии. Очень простой naming convention.</p>
        <code>
          {`.site-search { width: 60px; height: 20px }    /* Block */
.site-search--inactive { display: none }      /* Block Modifier */
.site-search__field { color: #222 }           /* Element */
.site-search__field--focused { color: #666 }  /* Element Modifier */`}
        </code>
        <h3 className="section-container__header section-container__header--cons">Cons</h3>
        <p className="section-container__paragraph section-container__paragraph--cons">Совершенно не гибкая система, продуцирующая длинные нечитаемые имена классов и неоправданно раздутые CSS- и HTML-файлы.</p>
        <p className="section-container__paragraph section-container__paragraph--cons">Названия классов-модификаторов наследуют имена родительских классов блока или элемента, что мешает использовать принципы каскадности и наследуемости в CSS. Например:</p>
        <code>{`.article__heading--red { color: red; }`}</code>
        <code>{`<h1 class="article__heading article__heading--red">Title</h1>`}</code>
        <p className="section-container__paragraph section-container__paragraph--cons">Этот класс можно применить только к заголовку первого уровня внутри блока article. Если нам понадобится красный акцент заголовка в любом другом блоке, согласно BEM для него нужно будет создавать отдельный класс. Необходимо 10 однотипных стилизаций для разных элементов? Создавай 10 отдельных классов. В большинстве других методологий для подобных модификаций создается один глобальный класс, который можно применять ко всем подходящим элементам:</p>
        <code>{`.text-red { color: red; }`}</code>
        <code>
          {`<h1 class="article_heading text-red">Title</h1>
<h2 class="article_subheading text-red">Another title</h2>
<p class="paragraph_main text-red">Lorem ipsum dolor sit amet</p>`}
        </code>
        <p className="section-container__paragraph section-container__paragraph--cons">В отличие от других методологий, структура HTML-блоков и элементов (размеры, выравнивание, поля и отступы) не сепарируется от оформления (цвета, толщина линий, тени и прочие стилистические свистелки и перделки). Все свалено в одну кучу в одном классе.</p>

        <div className="chili-db">
          <div className="chili-db__header">
            <h2 className="chili-db__title">Chili database</h2>
          </div>
          <div className="chili-db__menu">
            {tabs.map((e, i) =>
              <h5
                key={`${i}-${e}`}
                className={`chili-db__menu-item chili-db__menu-item--${i + 1}
                ${ activeTab === i ? " chili-db__menu-item--active" : "" }`}
                onClick={menuHandler}
              >{e[0].toLocaleUpperCase() + e.slice(1)}</h5>)}
            <div className="chili-db__menu-item--placeholder"></div>
          </div>
          <div className="chili-db__browser">
            <div className="chili-db__list-search-container">
              <button
                className="chili-db__list-filter"
                onClick={filterHandler}
              >Filter</button>
              <input
                id="search"
                type="search"
                placeholder="Quick search"
                onChange={searchHandler}
                className="chili-db__list-search-field"
              ></input>
            </div>
            <div className="chili-db__list-container">
              {list.length > 0 && <div className="chili-db__list-column">
                {list.map((e, i) =>
                  <div
                    id={i}
                    key={`${i}-${e.name}`}
                    className={`chili-db__list-item
                    ${ activeListItem === i ? "chili-db__list-item--active" : "" }`}
                    onClick={listHandler}
                  >{highlightText(e.name, searchString, tmpl.hlText)}</div>)}
              </div>}
            </div>
            {list.length > 0 && <div className="chili-db__preview-column">
              <h3 className="chili-db__preview-title">{list[activeListItem].name}</h3>
              <div className="chili-db__preview-img-container">
                <Image
                  className="chili-db__preview-img"
                  fill={true}
                  sizes="(max-width: 500px) 100vw"
                  priority={true}
                  src={imagePrefix + list[activeListItem].image}
                  alt={list[activeListItem].name}
                />
              </div>
              <ul className="chili-db__preview-specs">
                <li className="chili-db__preview-specs-item chili-db__preview-specs-item--species">
                  <span className="chili-db__preview-specs-item--strong">C. {list[activeListItem].species}</span>
                </li>
                <li className="chili-db__preview-specs-item chili-db__preview-specs-item--plant-size">
                  Plant: <span className="chili-db__preview-specs-item--strong">{list[activeListItem].plantSize}</span>
                </li>
                <li className="chili-db__preview-specs-item chili-db__preview-specs-item--fruit-size">
                  Fruit: <span className="chili-db__preview-specs-item--strong">{list[activeListItem].fruitSize}</span>
                </li>
                <li className="chili-db__preview-specs-item chili-db__preview-specs-item--spiciness">
                  Spiciness: <span className="chili-db__preview-specs-item--strong">{list[activeListItem].heatLevel}</span>
                </li>
                <li className="chili-db__preview-specs-item chili-db__preview-specs-item--shape">
                  Shape: <span className="chili-db__preview-specs-item--strong">{list[activeListItem].fruitShape}</span>
                </li>
                <li className="chili-db__preview-specs-item chili-db__preview-specs-item--color">
                  Color: <span className="chili-db__preview-specs-item--strong">{list[activeListItem].fruitColor}</span>
                </li>
              </ul>
              <p className="chili-db__preview-description">{list[activeListItem].description}</p>
            </div>}
          </div>
        </div>

        <h3 className="section-container__header">Пример стилизации текущего документа по BEM:</h3>
        <code>
          {`.document-title {
  text-align: center;
  margin: 2rem 0 1rem;
}

.section-container {
  margin: auto;
  width: 60%;
  background: #ddd;
}

.carousel {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  background: #111;
}

.carousel__button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7rem;
}

.carousel__button {
  border: none;
  background: #111;
  color: #fff;
  text-transform: uppercase;
  &:hover {
    color: #7fff17;
  }
}

.carousel__button--disabled { display: none; }

.section-container__header { margin: 1.2rem 0 0 0; }

.section-container__header--main {
  margin: auto;
  padding: 0.8rem 0;
  text-align: center;
  color: #f7e38f;
}

.section-container__header--pros {
  background: #126300;
  color: #ddd;
}

.section-container__header--cons {
  background: #8f0404;
  color: #ddd;
}

.section-container__paragraph { margin: 0; }

.section-container__paragraph--pros { background: #e1f7dc; }

.section-container__paragraph--cons { background: #ffe3e3; }

.chili-db {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  border: 2px solid #333;
  border-radius: 0.3rem;
  background-color: #bbb;
}

.chili-db__title {
  text-align: center;
  padding: 1rem 0;
}

.chili-db__menu {
  display: flex;
  flex-flow: row wrap;
}

.chili-db__menu-item {
  padding: 0.6rem 0.6rem 0.6rem 1.2rem;
  margin-right: -0.7rem;
  border-top: 0.125rem solid #000;
  border-right: 0.125rem solid #000;
  border-bottom: 0.125rem solid #000;
  border-top-right-radius: 1rem;
  background-color: #999;
  user-select: none;
  &:hover {
    background-color: #111;
    color: #f7e38f;
    cursor: pointer;
  }
}

.chili-db__menu-item--placeholder {
  flex-grow: 1;
  border-bottom: 0.125rem solid #000;
}

.chili-db__menu-item--active {
  border-bottom: none;
  background-color: #ddd;
  &:hover {
    background-color: #ddd;
    color: #000;
  }
}

.chili-db__menu-item--1 {
  padding-left: 0.7rem;
  z-index: 30;
}

.chili-db__menu-item--2 { z-index: 29; }

.chili-db__menu-item--3 { z-index: 28; }

.chili-db__menu-item--4 { z-index: 27; }

.chili-db__menu-item--5 { z-index: 26; }

.chili-db__menu-item--6 { z-index: 25; }

.chili-db__browser {
  display: grid;
  grid-template-columns: 0.6fr 1.4fr;
  grid-template-areas:
    "search browser"
    "list browser";
  background: #ddd;
}

.chili-db__list-search-container {
  grid-area: search;
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
  padding: 1rem;
}

.chili-db__list-filter {
  width: 6rem;
  height: 2rem;
  &:hover {
    background-color: #111;
    color: #f7e38f;
  }
}

.chili-db__list-search-field {
  width: 100%;
  height: 2rem;
  font-size: 1rem;
  padding-left: 0.25rem;
}

.chili-db__list-container {
  grid-area: list;
  height: 40rem;
  margin: 0 1rem;
  overflow-y: auto;
}

.chili-db__list-item {
  color: #222;
  padding: 0.125rem;
}

.chili-db__list-item--active {
  color: #f7e38f;
  background-color: #222;
  border: 0.125rem dotted #f7e38f;
}

.chili-db__list-item--highlighted {
  color: #eee;
  background-color: #d40c02;
}

.chili-db__preview-column {
  grid-area: browser;
  align-self: center;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  grid-template-areas:
    "header header"
    "image spec_species"
    "image spec_plant_size"
    "image spec_fruit_size"
    "image spec_spiciness"
    "image spec_shape"
    "image spec_color"
    "description description";
  margin: 0.5rem 0.5rem 0.5rem 0;
  border: 0.25rem inset;
  border-radius: 1rem;
}

.chili-db__preview-title {
  grid-area: header;
  text-align: center;
}

.chili-db__preview-img-container {
  margin-left: 0.5rem;
  grid-area: image;
  width: 98%;
  aspect-ratio: 1 / 1;
  position: relative;
}

.chili-db__preview-img {
  border-radius: 1rem;
}

.chili-db__preview-specs {
  list-style-type: "● ";
  margin: 0.5rem 0 0 1.6rem;
}

.chili-db__preview-specs-item--strong {
  font-weight: 600;
}

.chili-db__preview-description {
  grid-area: description;
}

.modal-filter {
  display: none;
  position: fixed;
  z-index: 30;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 20%);
  background-color: #fff;
  border: 0.25rem outset;
}

.modal-filter--visible { display: block; }

.modal-filter__header {
  font-size: 1.4rem;
  text-align: center;
  margin-top: 0.125rem;
}

.modal-filter__subheader {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.modal-filter__close-button {
  float: right;
  padding: 0 0.25rem;
  user-select: none;
  &:hover, &:focus {
    color: red;
    text-decoration: none;
    cursor: pointer;
  }
}

.modal-filter__columns-container {
  display: flex;
  flex-direction: row;
  padding: 1.125rem;
  column-gap: 2rem;
}

.modal-filter__column {
  display: flex;
  flex-direction: column;
}

.modal-filter__checkbox-element {
  display: flex;
  flex-direction: row;
}

.modal-filter__checkbox {
  width: 1rem;
  height: 1rem;
  margin: 0.25rem 0;
}

.modal-filter__label {
  font-size: 1.2rem;
  margin-left: 0.5rem;
}

.modal-filter__dropdown {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.modal-filter__tag {
  font-size: 1.2rem;
  line-height: 100%;
  width: min-content;
  padding: 0 0.25rem 0.25rem 0.25rem;
  margin-bottom: 0.25rem;
  border-radius: 0.25rem;
  background-color: #609255;
  color: #eee;
  &:hover, &:focus {
    color: #ffd51a;
    text-decoration: none;
    cursor: pointer;
  }
}

.modal-filter__tag-remove-button {
  font-size: 1.4rem;
  margin-left: 0.25rem;
}

.modal-filter__controls-container {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 1rem;
}

.modal-filter__control-button {
  font-size: 1.1rem;
  padding: 0.25rem 0.5rem;
  &:hover {
    background-color: #111;
    color: #f7e38f;
  }
}

@media (max-width: 1280px) {
  .section-container { width: 95%; }

  body { font-size: 1.1rem; }

  code { font-size: 1rem; }
}`}
        </code>
      </div>
    </main>
  )
}

export default Bem;