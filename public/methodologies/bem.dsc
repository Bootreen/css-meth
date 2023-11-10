[title]BEM (Block - Element - Modifier)
[header]In a nutshell
Outdated mammoth crap, invented by Yandex back in 2005. It captivates with its simplicity. Hardly used anywhere except in the post-Soviet space.
According to BEM, the entire layout can be divided into functionally isolated blocks. For examples: menu, article, sidebar, and search field. Blocks, in turn, consist of elements (menu item, header, paragraph). For both blocks and elements, additional modifier classes can be created as needed, which change their default properties (e.g., active, selected, disabled, and so on).
Nested block structures are ignored; from the perspective of BEM, all blocks belong to the same global level.
BEM prohibits applying styles through IDs and CSS tags (such as a, p, h1, div, and the like); only classes should be used as selectors.
[pros]
It offers at least some systematic approach to organizing CSS in contrast to complete anarchy. Provides a very simple naming convention.
[code]
.site-search { width: 60px; height: 20px }    /* Block */
.site-search--inactive { display: none }      /* Block Modifier */
.site-search__field { color: #222 }           /* Element */
.site-search__field--focused { color: #666 }  /* Element Modifier */
[/code]
[cons]
It's a highly inflexible system that produces long and unreadable class names, resulting in unnecessarily bloated CSS and HTML files. The names of modifier classes inherit the names of parent block or element classes, which hinders the use of the principles of specificity and inheritance in CSS. For example:
[code]
.article__heading--red { color: red; }
[/code]
[code]
<h1 class="article__heading article__heading--red">Title</h1>
[/code]
This class can only be applied to the first-level heading within the "article" block. If we need a red accent for the heading in any other block, according to BEM, a separate class would need to be created for it. Do you require 10 similar stylizations for different elements? Create 10 separate classes. In most other methodologies, a single global class is created for such modifications, which can be applied to all suitable elements:
[code]
.text-red { color: red; }
[/code]
[code]
<h1 class="article_heading text-red">Title</h1>
<h2 class="article_subheading text-red">Another title</h2>
<p class="paragraph_main text-red">Lorem ipsum dolor sit amet</p>
[/code]
Unlike other methodologies, the structure of HTML blocks and elements (sizes, alignment, padding, and margins) is not separated from the styling (colors, line thickness, shadows, and other stylistic embellishments). Everything is lumped together in a single class.
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

@for $i from 1 through 6 {
  .chili-db__menu-item-#{$i} {
    z-index: 31 - $i;
    @if $i == 1 {padding-left: 0.7rem};
  }
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
  &:hover {
    cursor: default;
  }
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

.chili-db__preview-img { border-radius: 1rem; }

.chili-db__preview-specs {
  grid-area: specs;
  list-style-type: "● ";
  margin: 0.5rem 0 0 1.6rem;
}

.chili-db__preview-specs-item { font-size: 1rem; }

.chili-db__preview-specs-item--strong { font-weight: 600; }

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
  &:hover {
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
  &:hover {
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