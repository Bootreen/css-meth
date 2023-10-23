import './oocss.css';
import { useStoreActions } from '../store/store';

const Oocss = () => {
  const { firstSection, lastSection, changeSection } = useStoreActions();
  const onSectionButtonClickHandler = event => changeSection(event.target.id);
  return (
    <main>
      <h1 className="documentTitle">CSS Methodologies</h1>
      <div className="sectionContainer bgGreyLight">
        <div className="carousel bgGreyDark">
          <div className="buttonContainer">
            <button
              id="prev"
              className={`buttonBorderless bgGreyDark${firstSection() ? " disabled" : ""}`}
              onClick={onSectionButtonClickHandler}
            >◄ previous</button>
          </div>
          <h2 className="sectionTitle clYellowPale">OOCSS (Object Oriented CSS)</h2>
          <div className="buttonContainer">
            <button
              id="next"
              className={`buttonBorderless bgGreyDark${lastSection() ? " disabled" : ""}`}
              onClick={onSectionButtonClickHandler}
            >next ►</button>
          </div>
        </div>
        <h3 className="subheader">In a nutshell</h3>
        <p className="paragraph">Более поздняя, но тоже старая методология, в основу которой положен принцип реюзабельности классов. С точки зрения OOCSS, CSS-объект — это повторяющийся дизайн-паттерн, который можно оформить в виде независимого кусочка CSS-кода и затем использовать повторно. Для облегчения деструктурирования дизайна используются два основных правила.</p>
        <p className="paragraph">1. Разделять структуру и скины.</p>
        <code>{`.buttonStructure {
  width: 100px;
  height: 50px;
}

.buttonSkin1 {
  background: #000;
  color: #fff;
}

.buttonSkin2 {
  background: #fff;
  color: #333;
}`}
        </code>
        <p className="paragraph">2. Разделять контейнер и контент. Это правило по сути запрещает использование CSS-комбинаторов (составных селекторов). Потому что они имеют более высокую специфичность, которая мешает повторному использованию CSS-кода. Например, вот такие фокусы в OOCSS — харам:</p>
        <code>{`#sidebar .list .list-header {
  font-size: 16px;
  color: red;
}`}
        </code>
        <p className="paragraph">Sidebar, list и list-header должны быть не просто отдельными классами, но и иметь простые одноуровневые селекторы, чтобы их можно было использовать повторно:</p>
        <code>{`.sidebar {
  padding: 2px;
  left: 0;
  margin: 3px;
  position: absolute;
  width: 140px;
}

.list {
  margin: 3px;
}

.listHeader {
  font-size: 16px;
  color: red
}`}
        </code>
        <h3 className="subheader billetPros">Pros</h3>
        <p className="paragraph bgPros">Реюзабельный и более компактный CSS-код. Хорошая масштабируемость.</p>
        <p className="paragraph bgPros">OOCSS отлично сочетается с CSS-препроцессорами, такими как SASS. Использование переменных, миксинов и прочих штучек позволяет еще больше повысить реюзабельность CSS-элементов.</p>
        <p className="paragraph bgPros">Лучшая читаемость, особенно в сравнении с BEM. Кроме этого, официальный гайдлайн OOCSS рекомендует использование camelCase для наименования классов, все по феншую.</p>
        <h3 className="subheader billetCons">Cons</h3>
        <p className="paragraph bgCons">Большее количество классов в сравнении с legacy-подходами.</p>
        <p className="paragraph bgCons">Методология очень общая, допускает множество стилей и подходов к «нарезанию» классов. Что в итоге может стать очень трудоемкой задачей.</p>
        <p className="paragraph bgCons">Плохо подходит для малых и даже средних проектов, так как затраты времени на продумывание системы реюзабельных классов никогда не окупятся.</p>
        <p className="paragraph bgCons">В целом OOCSS лучше использовать уже в виде готовых фреймворков, когда все классы, а также готовые шаблоны и примитивы для layout уже придумали за тебя, и тебе остается только их запомнить и начать использовать. Самый известный пример такого фреймворка на базе OOCSS — Bootstrap.</p>
        <h3 className="subheader">Пример стилизации текущего документа по OOCSS:</h3>
        <code>{`.documentTitle {
  text-align: center;
  margin: 2rem 0 1rem;
}

.sectionContainer {
  margin: auto;
  width: 60%;
}

.carousel {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
}

.buttonContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7rem;
}

.buttonBorderless {
  border: none;
  color: white;
  text-transform: uppercase;
  &:hover {
    color: #7fff17;
  }
}

.subheader { margin: 1.2rem 0 0 0; }

.sectionTitle {
  margin: auto;
  padding: 0.8rem 0;
  text-align: center;
}

.paragraph { margin: 0; }

.bgGreyLight { background: #ddd; }

.bgGreyDark { background: #111; }

.bgPros { background: #e1f7dc; }

.bgCons { background: #ffe3e3; }

.clYellowPale { color: #f7e38f; }

.billetPros {
  background: #126300;
  color: #ddd;
}

.billetCons {
  background: #8f0404;
  color: #ddd;
}

@media (max-width: 1280px) {
  .sectionContainer { width: 95%; }

  body { font-size: 1.1rem; }

  code { font-size: 1rem; }
}`}
        </code>
      </div>
    </main>
  )
}

export default Oocss;