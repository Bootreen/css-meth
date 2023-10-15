import './bem.css';
import Image from 'next/image';
import { useDbStore, useStoreActions } from '../store/store';
import { imagePrefix } from '../chiliesdb/chiliesdb';

const Bem = () => {
  const {
    firstSection,
    lastSection,
    changeSection,
    setActiveTab,
    filterList,
    setActiveListItem
  } = useStoreActions();

  const activeTab = useDbStore(state => state.activeTab);
  const tabs = useDbStore(state => state.tabs);
  const activeListItem = useDbStore(state => state.activeListItem);
  const list = useDbStore(state => state.list);

  const sectionHandler = event => changeSection(event.target.id);

  const menuHandler = event => {
    // extract the number from the supplement class "...menu-item--${number}"
    setActiveTab(Number(event.target.className.replace(/\D+/g, '')) - 1);
    filterList(document.getElementById("search").value);
    setActiveListItem(0);
  };

  const listHandler = event => setActiveListItem(Number(event.target.id));

  const searchHandler = () => {
    filterList(document.getElementById("search").value);
    setActiveListItem(0);
  };

  return (
    <main>
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
              <h4
                key={i}
                className={`chili-db__menu-item chili-db__menu-item--${i + 1}
                ${ activeTab === i ? " chili-db__menu-item--active" : "" }`}
                onClick={menuHandler}
              >{e[0].toLocaleUpperCase() + e.slice(1)}</h4>)}
            <div className="chili-db__menu-item--placeholder"></div>
          </div>
          <div className="chili-db__browser">
            <div className="chili-db__list-container">
              <input
                id="search"
                type="search"
                placeholder="Quick search"
                onChange={searchHandler}
                className="chili-db__list-search-field"
              ></input>
              {list.length > 0 && <div className="chili-db__list-column">
                {list.map((e, i) =>
                  <div
                    id={i}
                    key={i}
                    className={`chili-db__list-item
                    ${ activeListItem === i ? "chili-db__list-item--active" : "" }`}
                    onClick={listHandler}
                  >{e.name}</div>)}
              </div>}
            </div>
            {list.length > 0 && <div className="chili-db__preview-column">
              <h3 className="chili-db__preview-title">{list[activeListItem].name}</h3>
              <div className="chili-db__preview-img-container">
                <Image
                  className="chili-db__preview-img"
                  fill={true}
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