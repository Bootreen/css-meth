[title]OOCSS (Object Oriented CSS)
[header]In a nutshell
A more recent but still old methodology, which is based on the principle of class reusability. From the OOCSS perspective, a CSS object is a recurring design pattern that can be formatted as an independent piece of CSS code and then reused. To facilitate the deconstruction of the design, two main rules are used.
1. To separate the structure and the skin.
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
Separate container and content. Essentially, this rule prohibits the use of compound CSS selectors because they have higher specificity, which hinders the reusability of CSS code. For example, such tricks in OOCSS are forbidden:
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
Better readability, especially compared to BEM. Additionally, the official OOCSS guideline recommends using camelCase for class names, all in a stylish manner.
[cons]
More classes compared to legacy approaches.
The methodology is very general and allows for a variety of styles and approaches to class grouping, which can be a labor-intensive task in the end.
It's not well-suited for small or even medium-sized projects because the time spent on designing a system of reusable classes may never pay off.
In general, OOCSS is better utilized in the form of ready-made frameworks when all classes, as well as ready templates and primitives for layout, have already been devised for you, and all you need to do is memorize and start using them. The most well-known example of such a framework based on OOCSS is Bootstrap.
[example]
[code]
.documentTitle {
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

.disabled {
  display: none;
}

.subheader {
  margin: 1.2rem 0 0 0;
}

.sectionTitle {
  margin: auto;
  padding: 0.8rem 0;
  text-align: center;
}

.paragraph {
  margin: 0;
}

.bgGreyLight {
  background: #ddd;
}

.bgGreyDark {
  background: #111;
}

.bgPros {
  background: #e1f7dc;
}

.bgCons {
  background: #ffe3e3;
}

.clYellowPale {
  color: #f7e38f;
}

.billetPros {
  background: #126300;
  color: #ddd;
}

.billetCons {
  background: #8f0404;
  color: #ddd;
}

@media (max-width: 1280px) {
  .sectionContainer {
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