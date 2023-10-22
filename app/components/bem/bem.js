import './bem.css';
import Image from 'next/image';
import { useDbStore, useStoreActions } from '../store/store';
import { imagePrefix } from '../chiliesdb/chiliesdb';
import { Fragment } from 'react';

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
  const searchHandler = event => {
    setSearchString(event.target.value.toLocaleLowerCase());
    filterList();
    setActiveListItem(0);
  };

  const highlightText = (text, highlight) => {
    const chunks = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Fragment>
        {chunks.map((c, i) => c.toLocaleLowerCase() === highlight ?
          <span key={`hl-chunk-${i}`} className="chili-db__list-item--highlighted">{c}</span> :
            <Fragment key={`void-chunk-${i}`}>{c}</Fragment>)}
      </Fragment>
    )
  };

  return (
    <main>

      <div className={`modal-filter${isModalVisible ? " modal-filter--visible" : ""}`}>
        <h4 className="modal-filter__header">
          Filters
          <span className="modal-filter__close-button" onClick={filterHandler}>&times;</span>
        </h4>
        <div className="modal-filter__columns-container">
          <div className="modal-filter__column">
            <h5 className="modal-filter__subheader">Spiciness</h5>
            {spiciness.map((e, i) => {
              const heatLevel = Object.keys(e)[0];
              const { [heatLevel]: checked } = spiciness.filter(e => Object.hasOwn(e, heatLevel))[0];
              return (
                <div className="modal-filter__checkbox-element" key={`${i}-spiciness_${heatLevel}`}>
                  <input
                    className="modal-filter__checkbox"
                    type="checkbox"
                    id={`spiciness_${heatLevel}`}
                    defaultChecked={checked}
                    onClick={spicinessFilter}
                  />
                  <label
                    className="modal-filter__label"
                    htmlFor={`spiciness_${heatLevel}`}
                  >{heatLevel}</label>
                </div>
              )
            })}
          </div>
          <div className="modal-filter__column">
            <h5 className="modal-filter__subheader">Plant size</h5>
            {plantSizes.map((e, i) => {
              const plantSize = Object.keys(e)[0];
              const { [plantSize]: checked } = plantSizes.filter(e => Object.hasOwn(e, plantSize))[0];
              return (
                <div className="modal-filter__checkbox-element" key={`${i}-plant-size_${plantSize}`}>
                  <input
                    className="modal-filter__checkbox"
                    type="checkbox"
                    id={`plant-size_${plantSize}`}
                    defaultChecked={checked}
                    onClick={plantSizeFilter}
                  />
                  <label
                    className="modal-filter__label"
                    htmlFor={`plant-size_${plantSize}`}
                  >{plantSize}</label>
                </div>
              )
            })}
          </div>
          <div className="modal-filter__column">
            <h5 className="modal-filter__subheader">Fruit size</h5>
            {fruitSizes.map((e, i) => {
              const fruitSize = Object.keys(e)[0];
              const { [fruitSize]: checked } = fruitSizes.filter(e => Object.hasOwn(e, fruitSize))[0];
              return (
                <div className="modal-filter__checkbox-element" key={`${i}-fruit-size_${fruitSize}`}>
                  <input
                    className="modal-filter__checkbox"
                    type="checkbox"
                    id={`fruit-size_${fruitSize}`}
                    defaultChecked={checked}
                    onClick={fruitSizeFilter}
                  />
                  <label
                    className="modal-filter__label"
                    htmlFor={`fruit-size_${fruitSize}`}
                  >{fruitSize}</label>
                </div>
              )
            })}
          </div>
          <div className="modal-filter__column">
            <h5 className="modal-filter__subheader">Fruit shape</h5>
            <select className="modal-filter__dropdown" disabled={shapes[0].all} onChange={shapesAddFilter}>
              <option defaultValue>select shape</option>
              {shapes.map((e, i) => {
                const shape = Object.keys(e)[0];
                const { [shape]: checked } = shapes.filter(e => Object.hasOwn(e, shape))[0];
                return (
                  !checked ?
                    <option
                      key={`${i}-shape-dropdown-item_${shape}`}
                      value={shape}
                    >{shape}</option> :
                      <Fragment key={`${i}-shape-dropdown-item_${shape}`}></Fragment>
                )
              })}
            </select>
            {shapes.map((e, i) => {
              const shape = Object.keys(e)[0];
              const { [shape]: checked } = shapes.filter(e => Object.hasOwn(e, shape))[0];
              return (
                checked ?
                  <div
                    key={`${i}-shape-tag_${shape}`}
                    className="modal-filter__tag"
                    customvalue={shape}
                    onClick={shapesRemoveFilter}
                  >
                    {shape}<span className="modal-filter__tag-remove-button">&times;</span>
                  </div> :
                    <Fragment key={`${i}-shape-tag_${shape}`}></Fragment>
              )
            })}
            <br/>
            <h5 className="modal-filter__subheader">Shape trait</h5>
            <select className="modal-filter__dropdown" disabled={shapeTraits[0].all} onChange={shapeTraitsAddFilter}>
              <option defaultValue>select trait</option>
              {shapeTraits.map((e, i) => {
                const shapeTrait = Object.keys(e)[0];
                const { [shapeTrait]: checked } = shapeTraits.filter(e => Object.hasOwn(e, shapeTrait))[0];
                return (
                  !checked ?
                    <option
                      key={`${i}-shape-trait-dropdown-item_${shapeTrait}`}
                      value={shapeTrait}
                    >{shapeTrait}</option> :
                      <Fragment key={`${i}-shape-trait-dropdown-item_${shapeTrait}`}></Fragment>
                )
              })}
            </select>
            {shapeTraits.map((e, i) => {
              const shapeTrait = Object.keys(e)[0];
              const { [shapeTrait]: checked } = shapeTraits.filter(e => Object.hasOwn(e, shapeTrait))[0];
              return (
                checked ?
                  <div
                    key={`${i}-shape-trait-tag_${shapeTrait}`}
                    className="modal-filter__tag"
                    customvalue={shapeTrait}
                    onClick={shapeTraitsRemoveFilter}
                  >
                    {shapeTrait}<span className="modal-filter__tag-remove-button">&times;</span>
                  </div> :
                    <Fragment key={`${i}-shape-trait-tag_${shapeTrait}`}></Fragment>
              )
            })}
          </div>
          <div className="modal-filter__column">
            <h5 className="modal-filter__subheader">Fruit color</h5>
            <select className="modal-filter__dropdown" disabled={colors[0].all} onChange={colorsAddFilter}>
              <option defaultValue>select color</option>
              {colors.map((e, i) => {
                const color = Object.keys(e)[0];
                const { [color]: checked } = colors.filter(e => Object.hasOwn(e, color))[0];
                return (
                  !checked ?
                    <option
                      key={`${i}-color-dropdown-item_${color}`}
                      value={color}
                    >{color}</option> :
                      <Fragment key={`${i}-color-dropdown-item_${color}`}></Fragment>
                )
              })}
            </select>
            {colors.map((e, i) => {
              const color = Object.keys(e)[0];
              const { [color]: checked } = colors.filter(e => Object.hasOwn(e, color))[0];
              return (
                checked ?
                  <div
                    key={`${i}-color-tag_${color}`}
                    className="modal-filter__tag"
                    customvalue={color}
                    onClick={colorsRemoveFilter}
                  >
                    {color}<span className="modal-filter__tag-remove-button">&times;</span>
                  </div> :
                    <Fragment key={`${i}-color-tag_${color}`}></Fragment>
              )
            })}
            <br/>
            <h5 className="modal-filter__subheader">Color trait</h5>
            <select className="modal-filter__dropdown" disabled={colorTraits[0].all} onChange={colorTraitsAddFilter}>
              <option defaultValue>select trait</option>
              {colorTraits.map((e, i) => {
                const colorTrait = Object.keys(e)[0];
                const { [colorTrait]: checked } = colorTraits.filter(e => Object.hasOwn(e, colorTrait))[0];
                return (
                  !checked ?
                    <option
                      key={`${i}-color-trait-dropdown-item_${colorTrait}`}
                      value={colorTrait}
                    >{colorTrait}</option> :
                      <Fragment key={`${i}-color-trait-dropdown-item_${colorTrait}`}></Fragment>
                )
              })}
            </select>
            {colorTraits.map((e, i) => {
              const colorTrait = Object.keys(e)[0];
              const { [colorTrait]: checked } = colorTraits.filter(e => Object.hasOwn(e, colorTrait))[0];
              return (
                checked ?
                  <div
                    key={`${i}-color-trait-tag_${colorTrait}`}
                    className="modal-filter__tag"
                    customvalue={colorTrait}
                    onClick={colorTraitsRemoveFilter}
                  >
                    {colorTrait}<span className="modal-filter__tag-remove-button">&times;</span>
                  </div> :
                    <Fragment key={`${i}-color-trait-tag_${colorTrait}`}></Fragment>
              )
            })}
          </div>
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
                  >{highlightText(e.name, searchString)}</div>)}
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

.section-container__header {
  margin: 1.2rem 0 0 0;
}

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