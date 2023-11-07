[title]BEM (Block - Element - Modifier)
[header]In a nutshell
Устаревшее говно мамонта, изобретенное в Яндексе еще в 2005. Подкупает своей простотой. Практически нигде, кроме постсовка, не используется.
Согласно BEM весь layout можно разбить на функционально обособленные блоки. Примеры блоков: меню, статья, сайдбар, поле поиска. Блоки, в свою очередь, состоят из элементов (элемент меню, заголовок, абзац). Для блоков и для элементов при необходимости можно создать дополнительные классы-модификаторы, которые меняют их дефолтные свойства (active, selected, disabled и т.п.).
Вложенная структура блоков игнорируется, с точки зрения BEM все блоки принадлежат к одному глобальному уровню.
BEM запрещает назначать стили через ID и CSS tag (a, p, h1, div и т.п.), в качестве селекторов всегда должны использоваться только классы.
[pros]
Хоть какой-то системный подход для организации CSS в противовес полной анархии. Очень простой naming convention.
[code]
.site-search { width: 60px; height: 20px }    /* Block */
.site-search--inactive { display: none }      /* Block Modifier */
.site-search__field { color: #222 }           /* Element */
.site-search__field--focused { color: #666 }  /* Element Modifier */
[/code]
[cons]
Совершенно не гибкая система, продуцирующая длинные нечитаемые имена классов и неоправданно раздутые CSS- и HTML-файлы.
Названия классов-модификаторов наследуют имена родительских классов блока или элемента, что мешает использовать принципы каскадности и наследуемости в CSS. Например:
[code]
.article__heading--red { color: red; }
[/code]
[code]
<h1 class="article__heading article__heading--red">Title</h1>
[/code]
Этот класс можно применить только к заголовку первого уровня внутри блока article. Если нам понадобится красный акцент заголовка в любом другом блоке, согласно BEM для него нужно будет создавать отдельный класс. Необходимо 10 однотипных стилизаций для разных элементов? Создавай 10 отдельных классов. В большинстве других методологий для подобных модификаций создается один глобальный класс, который можно применять ко всем подходящим элементам:
[code]
.text-red { color: red; }
[/code]
[code]
<h1 class="article_heading text-red">Title</h1>
<h2 class="article_subheading text-red">Another title</h2>
<p class="paragraph_main text-red">Lorem ipsum dolor sit amet>
[/code]
В отличие от других методологий, структура HTML-блоков и элементов (размеры, выравнивание, поля и отступы) не сепарируется от оформления (цвета, толщина линий, тени и прочие стилистические свистелки и перделки). Все свалено в одну кучу в одном классе.
[example]
[code]
.document-title {
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

.carousel__button--disabled {
  display: none;
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

.section-container__paragraph {
  margin: 0;
}

.section-container__paragraph--pros {
  background: #e1f7dc;
}

.section-container__paragraph--cons {
  background: #ffe3e3;
}

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

.chili-db__menu-item-1 {
  padding-left: 0.7rem;
  z-index: 30;
}

.chili-db__menu-item-2 {
  z-index: 29;
}

.chili-db__menu-item-3 {
  z-index: 28;
}

.chili-db__menu-item-4 {
  z-index: 27;
}

.chili-db__menu-item-5 {
  z-index: 26;
}

.chili-db__menu-item-6 {
  z-index: 25;
}

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
    "image specs"
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
  grid-area: specs;
  list-style-type: "● ";
  margin: 0.5rem 0 0 1.6rem;
}

.chili-db__preview-specs-item {
  font-size: 1rem;
}

.chili-db__preview-specs-item--strong {
  font-weight: 600;
}

.chili-db__preview-description {
  grid-area: description;
  font-size: 1.1rem;
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

.modal-filter--visible {
  display: block;
}

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
  .section-container {
    width: 95%;
  }

  body {
    font-size: 1.1rem;
  }

  code {
    font-size: 1rem;
  }
}
[/code]