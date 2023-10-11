import './bem.css';
import Image from 'next/image';
import { firstSection, lastSection } from '../store/store';
import { useState, useEffect } from 'react';
import { chilies, imagePrefix } from '../chiliesdb/chiliesdb';

const Bem = ( {handler} ) => {
  const tabs = ['all', 'annuum', 'frutescens', 'baccatum', 'chinense', 'pubescens'];
  const [tab, setTab] = useState(0);
  const filterList = () => chilies.filter(e => tabs[tab] === 'all' ? true : e.species === tabs[tab]);
  const [list, setList] = useState(filterList());
  const [listItem, setListItem] = useState(0);

  // extract number from the supplement class "...menu-item--${number}" to the tab variable
  const menuHandler = event => {
    setTab(Number(event.currentTarget.className.replace(/\D+/g, '')) - 1);
    setListItem(0);
  };

  const listHandler = event => {
    setListItem(Number(event.currentTarget.id));
  };

  // render list on tab change
  useEffect(() =>
    setList(filterList()) // eslint-disable-next-line react-hooks/exhaustive-deps
  , [tab]);

  return (
    <main>
      <h1 className="document-title">CSS Methodologies</h1>
      <div className="section-container">
        <div className="carousel">
          <div className="carousel__button-container">
            <button
              id="prev"
              className={`carousel__button${firstSection() ? " carousel__button--disabled" : ""}`}
              onClick={handler}
            >◄ previous</button>
          </div>
          <h2 className="section-container__header section-container__header--main">BEM (Block - Element - Modifier)</h2>
          <div className="carousel__button-container">
            <button
              id="next"
              className={`carousel__button${lastSection() ? " carousel__button--disabled" : ""}`}
              onClick={handler}
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
              <h4
                key={i}
                className={`chili-db__menu-item chili-db__menu-item--${i + 1}
                ${ tab === i ? " chili-db__menu-item--active" : "" }`}
                onClick={menuHandler}
              >{e[0].toLocaleUpperCase() + e.slice(1)}</h4>)}
            <div className="chili-db__menu-item--placeholder"></div>
          </div>
          <div className="chili-db__browser">
            <div className="chili-db__list-container">
              <div className="chili-db__list-search-field"></div>
              <div className="chili-db__list-column">
                {list.map((e, i) =>
                  <div
                    id={i}
                    key={i}
                    className={`chili-db__list-item
                    ${ listItem === i ? "chili-db__list-item--active" : "" }`}
                    onClick={listHandler}
                >{e.name}</div>)}
              </div>
            </div>
            <div className="chili-db__preview-column">
              <h3 className="chili-db__preview-title">{list[listItem].name}</h3>
              <div className="chili-db__preview-img-container">
                <Image
                  className="chili-db__preview-img"
                  fill={true}
                  src={imagePrefix + list[listItem].image}
                  alt={list[listItem].name}
                />
              </div>
              <ul className="chili-db__preview-specs">
                <li className="chili-db__preview-specs-item chili-db__preview-specs-item--species">
                  <span className="chili-db__preview-specs-item--strong">C. {list[listItem].species}</span>
                </li>
                <li className="chili-db__preview-specs-item chili-db__preview-specs-item--plant-size">
                  Plant: <span className="chili-db__preview-specs-item--strong">{list[listItem].plantSize}</span>
                </li>
                <li className="chili-db__preview-specs-item chili-db__preview-specs-item--fruit-size">
                  Fruit: <span className="chili-db__preview-specs-item--strong">{list[listItem].fruitSize}</span>
                </li>
                <li className="chili-db__preview-specs-item chili-db__preview-specs-item--spiciness">
                  Spiciness: <span className="chili-db__preview-specs-item--strong">{list[listItem].heatLevel}</span>
                </li>
                <li className="chili-db__preview-specs-item chili-db__preview-specs-item--shape">
                  Shape: <span className="chili-db__preview-specs-item--strong">{list[listItem].fruitShape}</span>
                </li>
                <li className="chili-db__preview-specs-item chili-db__preview-specs-item--color">
                  Color: <span className="chili-db__preview-specs-item--strong">{list[listItem].fruitColor}</span>
                </li>
              </ul>
              <p className="chili-db__preview-description">{list[listItem].description}</p>
            </div>
          </div>
          <div className="chili-db__footer"></div>
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