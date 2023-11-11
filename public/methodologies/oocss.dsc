[title]OOCSS (Object Oriented CSS)
[header]In a nutshell
A more recent but still old methodology, which is based on the principle of class reusability. From the OOCSS perspective, a CSS object is a recurring design pattern that can be formatted as an independent piece of CSS code and then reused. To facilitate the deconstruction of the design, two main rules are used.
1. Separate structure and skin.
[code]
.buttonStructure {
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
}
[/code]
2. Separate container and content. Essentially, this rule prohibits the use of compound CSS selectors because they have higher specificity, which hinders the reusability of CSS code. For example, such tricks in OOCSS are forbidden:
[code]
#sidebar .list .list-header {
  font-size: 16px;
  color: red;
}
[/code]
Sidebar, list, and list-header should not only be separate classes but also have simple one-level selectors, so they can be reused:
[code]
.sidebar {
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
}
[/code]
[pros]
Reusable and more compact CSS code. Excellent scalability.
OOCSS pairs well with CSS preprocessors like SASS. The use of variables, mixins, and other dynamic CSS features allows for even greater reusability of CSS elements.
Better HTML-readability, especially compared to BEM. Additionally, the official OOCSS guideline recommends using camelCase for class names, all in a stylish manner.
[cons]
More classes compared to legacy approaches.
The methodology is very general and allows for a variety of styles and approaches to class grouping, which can be a labor-intensive task in the end.
It's not well-suited for small or even medium-sized projects because the time spent on designing a system of reusable classes may never pay off.
In general, OOCSS is better utilized in the form of ready-made frameworks when all classes, as well as ready templates and primitives for layout, have already been devised for you, and all you need to do is memorize and start using them. The most well-known example of such a framework based on OOCSS is Bootstrap.
[example]
[code]
$backgrounds: bgMT, bgWhite, bgConcrete, bgGreyLight, bgBlack, bgGreyDark,
  bgPros, bgCons, bgGreen, bgGreenPale, bgRedDark, bgRedCoral;
$bgColors: #999, #fff, #bbb, #ddd, #111, #222,
  #e1f7dc, #ffe3e3, #126300, #609255, #8f0404, #d40c02;
@each $name in $backgrounds {
  $i: index($backgrounds, $name);
  .#{$name} {
    background-color: nth($bgColors, $i);
    @if $i == 1 {user-select: none}
  }
}

$colorNames: clWhite, clPaper, clGreyLight, clGreyDark, clYellowPale, clRed;
$colors: #fff, #eee, #ddd, #222, #f7e38f, red;
@each $name in $colorNames {
  $i: index($colorNames, $name);
  .#{$name} {color: nth($colors, $i)}
}

$hoverStyles: hoverLime, hoverYellowPale, hoverActive, hoverRed, hoverCanary;
$hoverColors: #7fff17, #f7e38f, #000, inherit, red, #ffd51a;
$hoverBgs: transparent, #111, #ddd, transparent, transparent;
$hoverCursors: pointer, pointer, auto, pointer, pointer;
@each $name in $hoverStyles {
  $i: index($hoverStyles, $name);
  .#{$name} {
    &:hover {
      color: nth($hoverColors, $i);
      background-color: nth($hoverBgs, $i);
      cursor: nth($hoverCursors, $i);
      text-decoration: none;
    }
  }
}

.borderDarkRounded {
  border: 2px solid #333;
  border-radius: 0.3rem;
}

.borderMT {
  border-top: 0.125rem solid #000;
  border-right: 0.125rem solid #000;
  border-bottom: 0.125rem solid #000;
  border-top-right-radius: 1rem;
}

.borderBottomOff { border-bottom: none; }

.borderDottedYellow { border: 0.125rem dotted #f7e38f; }

.borderInsetRounded {
  border: 0.25rem inset;
  border-radius: 1rem;
}

.borderOutset { border: 0.25rem outset; }

.disabled { display: none; }

.centered { text-align: center; }

.textStrong { font-weight: 600; }

.flexRow {
  display: flex;
  flex-flow: row;
}

.flexColumn {
  display: flex;
  flex-flow: column;
}

.flexWrap { flex-wrap: wrap; }

.flexFill { flex-grow: 1; }

.documentTitle { margin: 2rem 0 1rem; }

.sectionContainer {
  margin: auto;
  width: 60%;
}

.carousel {
  align-items: stretch;
  justify-content: space-between;
}

.buttonContainer {
  align-items: center;
  justify-content: center;
  width: 7rem;
}

.buttonBorderless {
  border: none;
  text-transform: uppercase;
}

.subheader { margin: 1.2rem 0 0 0; }

.sectionTitle {
  margin: auto;
  padding: 0.8rem 0;
}

.paragraph { margin: 0; }

.chiliDb { margin: 1rem; }

.dbTitle { padding: 1rem 0; }

.menuTab {
  padding: 0.6rem 0.6rem 0.6rem 1.2rem;
  margin-right: -0.7rem;
}

@for $i from 1 through 6 {
  .menuTab-#{$i} {
    z-index: 31 - $i;
    @if $i == 1 {padding-left: 0.7rem};
  }
}

.menuItemPlaceholder { border-bottom: 0.125rem solid #000; }

.dbBrowser {
  display: grid;
  grid-template-columns: 0.6fr 1.4fr;
  grid-template-areas:
    "search browser"
    "list browser";
}

.dbSearchContainer {
  grid-area: search;
  column-gap: 0.5rem;
  padding: 1rem;
}

.dbFilterButton {
  width: 6rem;
  height: 2rem;
}

.dbSearchField {
  width: 100%;
  height: 2rem;
  padding-left: 0.25rem;
}

.dbListContainer {
  grid-area: list;
  height: 40rem;
  margin: 0 1rem;
  overflow-y: auto;
}

.dbListItem {
  padding: 0.125rem;
  &:hover {
    cursor: default;
  }
}

.dbPreviewColumn {
  grid-area: browser;
  align-self: flex-start;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  grid-template-areas:
    "header header"
    "image specs"
    "description description";
  margin: 0.5rem 0.5rem 0.5rem 0;
}

.dbPreviewTitle { grid-area: header; }

.dbImageContainer {
  margin-left: 0.5rem;
  grid-area: image;
  width: 98%;
  aspect-ratio: 1 / 1;
  position: relative;
}

.dbImage { border-radius: 1rem; }

.dbPreviewSpecs {
  grid-area: specs;
  list-style-type: "● ";
  margin: 0.5rem 0 0 1.6rem;
}

.dbPreviewSpecsItem { font-size: 1rem; }

.dbPreviewDescription {
  grid-area: description;
  font-size: 1.1rem;
}

.modalFilter {
  display: none;
  position: fixed;
  z-index: 31;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 20%);
}

.visible { display: block; }

.modalFilterHeader {
  font-size: 1.4rem;
  margin-top: 0.125rem;
}

.modalFilterSubheader {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.closeButton {
  float: right;
  padding: 0 0.25rem;
  user-select: none;
}

.columnsContainer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "Spiciness PlantSize FruitSize FruitShape FruitColor";
  padding: 1.125rem;
  column-gap: 2rem;
}

.column { margin-bottom: 0; }

$columnNames: Spiciness, PlantSize, FruitSize, FruitShape, FruitColor;
@each $name in $columnNames {
  .column#{$name} {grid-area: $name}
}

.checkbox {
  min-width: 1rem;
  min-height: 1rem;
  margin: 0.25rem 0;
}

.checkboxLabel {
  font-size: 1.2rem;
  margin-left: 0.5rem;
}

.dropdown {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.tag {
  font-size: 1.2rem;
  line-height: 100%;
  width: min-content;
  padding: 0 0.25rem 0.25rem 0.25rem;
  margin-bottom: 0.25rem;
  border-radius: 0.25rem;
}

.tagRemoveButton {
  font-size: 1.4rem;
  margin-left: 0.25rem;
}

.controlsContainer {
  margin-bottom: 1rem;
  justify-content: center;
  column-gap: 1rem;
}

.controlButton {
  font-size: 1.1rem;
  padding: 0.25rem 0.5rem;
}

@media (max-width: 1280px) {
  .sectionContainer { width: 95%; }

  body { font-size: 1.1rem; }

  code { font-size: 1rem; }
}

@media (max-width: 768px) {
  .sectionContainer { width: 100%; }

  body { font-size: 0.9rem; }

  code {
    font-size: 0.8rem;
    padding: 1rem;
  }

  h1 { font-size: 1.3rem;}

  h2 { font-size: 1.1rem;}

  h3 { font-size: 1rem;}

  h5 { font-size: 0.6rem;}

  p, h3 { padding: 0.3rem 1rem; }

  .menuTab {
    padding: 0.3rem 0.3rem 0.3rem 1rem;
    margin-right: -0.7rem;
  }

  .menuTab-1 { padding-left: 0.3rem; }

  .dbBrowser {
    grid-template-columns: 1fr;
    grid-template-areas:
      "search"
      "list"
      "browser";
  }

  .dbListContainer { height: auto }

  .dbPreviewColumn {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "image"
      "specs"
      "description";
    margin: 0.6rem;
  }

  .dbImageContainer { margin: auto; }

  .modalFilterHeader { font-size: 1rem; }

  .modalFilterSubheader,
  .checkboxLabel,
  .dropdown,
  .tag,
  .tagRemoveButtonn,
  .controlButton { font-size: 0.8rem; }

  .tag {
    line-height: 120%;
    padding: 0 0.25rem 0.125rem 0.25rem;
  }

  .columnsContainer {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "Spiciness PlantSize FruitSize"
      "FruitShape FruitColor ...";
    padding: 1rem;
    column-gap: 1rem;
  }

  .column { margin-bottom: 1rem; }
}
[/code]