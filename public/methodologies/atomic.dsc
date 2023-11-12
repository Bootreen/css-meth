[title]Atomic CSS
[header]In a nutshell
Placeholder
[pros]
Placeholder
[cons]
Placeholder
[example]
[code]
@function firstchar($str) { $ch: str.index(1); @return $ch; }

.Ai\(c\) { align-items: center; }
.Ai\(st\) { align-items: stretch; }
.As\(fs\) { align-self: flex-start; }

.Ar\(1\/1\) { aspect-ratio: 1/1; }

.Bd\(n\) { border: none; }
.Bdc\(\#333\) { border-color: #333; }
.Bdc\(\#f7e38f\) { border-color: #f7e38f; }
.Bdtc\(\#000\) { border-top-color: #000; }
.Bdendc\(\#000\) { border-right-color: #000; }
.Bdbc\(\#000\) { border-bottom-color: #000; }
$bdStyles: solid, dotted, inset, outset;
@each $bds in $bdStyles { .Bds\(#{firstchar($bds)}\) { border-style: #{$bds}; } }
// .Bds\(s\) { border-style: solid; }
// .Bds\(d\) { border-style: dotted; }
// .Bds\(i\) { border-style: inset; }
// .Bds\(o\) { border-style: outset; }
.Bdts\(s\) { border-top-style: solid; }
.Bdends\(s\) { border-right-style: solid; }
.Bdbs\(s\) { border-bottom-style: solid; }
.Bdw\(0\.125rem\) { border-width: 0.125rem; }
.Bdw\(0\.25rem\) { border-width: 0.25rem; }
.Bdtw\(0\.125rem\) { border-top-width: 0.125rem; }
.Bdendw\(0\.125rem\) { border-right-width: 0.125rem; }
.Bdbw\(0\.125rem\) { border-bottom-width: 0.125rem; }
.Bdrs\(0\.3rem\) { border-radius: 0.3rem; }
.Bdrs\(1rem\) { border-radius: 1rem; }
.Bdrs\(0\.25rem\) { border-radius: 0.25rem; }
.Bdrstend\(1rem\) { border-top-right-radius: 1rem; }

$bgColors: #111, #222, #999, #bbb, #ddd, #fff,
  #e1f7dc, #ffe3e3, #126300, #609255, #8f0404, #d40c02;
@each $bgc in $bgColors { .Bgc\(#{$bgc}\) { background-color: #{$bgc}; } }
.Bgc\(\#ddd\)\:h:hover { background-color: #ddd; }
.Bgc\(\#111\)\:h:hover { background-color: #111; }
$colors: #222, #ddd, #eee, #fff, #f7e38f;
@each $c in $colors { .C\(#{$c}\) { color: #{$c}; } }
$hoverColors: #000, #7fff17, #ffd51a, #f7e38f, red;
@each $hc in $hoverColors { .C\(#{$hc}\)\:h:hover { color: #{$hc}; } }

.Colmg\(0\.5rem\) { column-gap: 0.5rem; }
.Colmg\(1rem\) { column-gap: 1rem; }
.Colmg\(2rem\) { column-gap: 2rem; }
.Cur\(d\)\:h:hover { cursor: default; }
.Cur\(p\)\:h:hover { cursor: pointer; }

$displayStyles: block, flex, grid, none;
@each $dst in $displayStyles { .D\(#{firstchar($dst)}\) { display: #{$dst}; } }
// .D\(b\) { display: block; }
// .D\(f\) { display: flex; }
// .D\(g\) { display: grid; }
// .D\(n\) { display: none; }

.Fxg\(1\) { flex-grow: 1; }
.Fld\(c\) { flex-direction: column; }
.Fld\(r\) { flex-direction: row; }

.Jc\(c\) { justify-content: center; }
.Jc\(sb\) { justify-content: space-between; }

.Fl\(end\) { float: right; }
.Fw\(600\) { font-weight: 600; }

.Fz\(1\.1rem\) { font-size: 1.1rem; }
.Fz\(1\.2rem\) { font-size: 1.2rem; }
.Fz\(1\.4rem\) { font-size: 1.4rem; }
.Fz\(1rem\) { font-size: 1rem; }

.H\(2rem\) { height: 2rem; }
.H\(40rem\) { height: 40rem; }
.Lh\(100\%\) { line-height: 100%; }
.List\(\"\●\ \"\) { list-style-type: "● " }

.M\(a\) { margin: auto; }
.M\(0\) { margin: 0; }
.M\(1rem\) { margin: 1rem; }
.Mt\(2rem\) { margin-top: 2rem; }
.Mt\(1\.2rem\) { margin-top: 1.2rem; }
.Mt\(0\.5rem\) { margin-top: 0.5rem; }
.Mt\(0\.125rem\) { margin-top: 0.125rem; }
.Mend\(0\) { margin-right: 0; }
.Mend\(-0\.7rem\) { margin-right: -0.7rem; }
.Mend\(0\.5rem\) { margin-right: 0.5rem; }
.Mb\(1rem\) { margin-bottom: 1rem; }
.Mb\(0\) { margin-bottom: 0; }
.Mb\(0\.5rem\) { margin-bottom: 0.5rem; }
.Mb\(0\.25rem\) { margin-bottom: 0.25rem; }
.Mstart\(0\) { margin-left: 0; }
.Mstart\(0\.5rem\) { margin-left: 0.5rem; }
.Mstart\(1\.6rem\) { margin-left: 1.6rem; }
.Mstart\(0\.25rem\) { margin-left: 0.25rem; }
.Mx\(1rem\) {
  margin-left: 1rem;
  margin-right: 1rem;
}
.My\(0\) {
  margin-top: 0;
  margin-bottom: 0;
}

.Mih\(1rem\) { min-height: 1rem; }
.Miw\(1rem\) { min-width: 1rem; }

.T\(20\%\) { top: 20%; }
.Start\(50\%\) { left: 50%; }

.Ovy\(a\) { overflow-y: auto; }

.P\(1rem\) { padding: 1rem; }
.P\(0\.125rem\) { padding: 0.125rem; }
.P\(1\.125rem\) { padding: 1.125rem; }
.Px\(0\) {
  padding-left: 0;
  padding-right: 0;
}
.Px\(0\.25rem\), .Pstart\(0\.25rem\) { padding-left: 0.25rem; }
.Px\(0\.25rem\), .Pend\(0\.25rem\) { padding-right: 0.25rem; }
.Px\(0\.5rem\) {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.Py\(0\.8rem\) {
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
}
.Py\(0\), .Pt\(0\) { padding-top: 0; }
.Py\(0\) { padding-bottom: 0; }
.Py\(0\.25rem\) { padding-top: 0.25rem; }
.Py\(0\.25rem\), .Pb\(0\.25rem\) { padding-bottom: 0.25rem; }
.Pt\(0\.6rem\) { padding-top: 0.6rem; }
.Pend\(0\.6rem\) { padding-right: 0.6rem; }
.Pb\(0\.6rem\) { padding-bottom: 0.6rem; }
.Pstart\(1\.2rem\) { padding-left: 1.2rem; }

.Pos\(f\) { position: fixed; }
.Pos\(r\) { position: relative; }

.Ta\(c\) { text-align: center; }
.Td\(n\)\:h:hover { text-decoration: none; }
.Tt\(u\) { text-transform: uppercase; }
.Us\(n\) { user-select: none; }

.W\(100\%\) { width: 100%; }
.W\(60\%\) { width: 60%; }
.W\(6rem\) { width: 6rem; }
.W\(7rem\) { width: 7rem; }
.W\(98\%\) { width: 98%; }
.W\(minc\) { width: min-content; }

.Z\(31\) { z-index: 31; }

.Translate\(-50\%\+20\%\) { transform: translate(-50%, 20%); }

.Gtc\(0\.6fr\ 1\.4fr\) { grid-template-columns: 0.6fr 1.4fr; }
.Gtc\(1\.2fr\ 0\.8fr\) { grid-template-columns: 1.2fr 0.8fr; }
.Gtc\(1fr\ 1fr\ 1fr\ 1fr\ 1fr\) { grid-template-columns: 1fr 1fr 1fr 1fr 1fr;}
.Gta\(\"search\ browser\"\ \"list\ browser\"\) {
  grid-template-areas:
    "search browser"
    "list browser";
}
.Gta\(\"header\ header\"\ \"image\ specs\"\ \"description\ description\"\) {
  grid-template-areas:
    "header header"
    "image specs"
    "description description";
}
.Gta\(\"spiciness\ plantSize\ fruitSize\ fruitShape\ fruitColor\"\) {
  grid-template-areas: "spiciness plantSize fruitSize fruitShape fruitColor";
}
.Ga\(search\) { grid-area: search; }
.Ga\(list\) { grid-area: list; }
.Ga\(browser\) { grid-area: browser; }
.Ga\(header\) { grid-area: header; }
.Ga\(image\) { grid-area: image; }
.Ga\(specs\) { grid-area: specs; }
.Ga\(description\) { grid-area: description; }
.Ga\(spiciness\) { grid-area: spiciness; }
.Ga\(plantSize\) { grid-area: plantSize; }
.Ga\(fruitSize\) { grid-area: fruitSize; }
.Ga\(fruitShape\) { grid-area: fruitShape; }
.Ga\(fruitColor\) { grid-area: fruitColor; }

@for $i from 1 through 6 {
  @if $i == 1 { @media(max-width: 768px) { .mt-#{$i}-sm {padding-left: 0.25rem} } }
  .mt-#{$i} {
    z-index: 31 - $i;
    @if $i == 1 {padding-left: 0.7rem};
  }
}

@media(max-width: 1280px) { .W\(95\%\)--md { width: 95% } }
@media(max-width: 1280px) { body { font-size: 1.1rem; } }
@media(max-width: 1280px) { code { font-size: 1rem; } }
@media(max-width: 768px) { .W\(100\%\)--sm { width: 100% } }
@media(max-width: 768px) { body { font-size: 0.9rem; } }
@media(max-width: 768px) {
  code {
    font-size: 0.8rem;
    padding: 1rem;
  }
}
@media(max-width: 768px) { h1 { font-size: 1.3rem; } }
@media(max-width: 768px) { h2 { font-size: 1.1rem; } }
@media(max-width: 768px) { h3 { font-size: 1rem; } }
@media(max-width: 768px) { h5 { font-size: 0.5rem; } }
@media(max-width: 768px) { p, h3 { padding: 0.3rem 1rem; } }
@media(max-width: 768px) { .M\(0\.25rem\)--sm { margin: 0.25rem; } }
@media(max-width: 768px) { .Pt\(0\.25rem\)--sm { padding-top: 0.25rem } }
@media(max-width: 768px) { .Pend\(0\.25rem\)--sm { padding-right: 0.25rem } }
@media(max-width: 768px) { .Pb\(0\.25rem\)--sm { padding-bottom: 0.25rem } }
@media(max-width: 768px) { .Pstart\(0\.9rem\)--sm { padding-left: 0.9rem } }
@media(max-width: 768px) { .Mend\(-0\.8rem\)--sm { margin-right: -0.8rem } }
@media(max-width: 768px) { .Gtc\(1fr\)--sm { grid-template-columns: 1fr; } }
@media(max-width: 768px) { .Gta\(\"search\"\ \"list\"\ \"browser\"\)--sm {
  grid-template-areas:
    "search"
    "list"
    "browser";
} }
@media(max-width: 768px) { .H\(a\)--sm { height: auto } }
@media(max-width: 768px) { .Gta\(\"header\"\ \"image\"\ \"specs\"\ \"description\"\)--sm {
  grid-template-areas:
    "header"
    "image"
    "specs"
    "description";
} }
@media(max-width: 768px) { .M\(0\.6rem\)--sm { margin: 0.6rem; } }
@media(max-width: 768px) { .M\(a\)--sm { margin: auto; } }
@media(max-width: 768px) { .T\(3\%\)--sm { top: 3%; } }
@media(max-width: 768px) { .Translate\(-50\%\+0\%\)--sm { transform: translate(-50%, 0%); } }
@media(max-width: 768px) { .Fz\(1rem\)--sm { font-size: 1rem; } }
@media(max-width: 768px) { .Fz\(0\.8rem\)--sm { font-size: 0.8rem; } }
@media(max-width: 768px) { .Lh\(120\%\)--sm { line-height: 120%; } }
@media(max-width: 768px) { .Pt\(0\)--sm { padding-top: 0; } }
@media(max-width: 768px) { .Pend\(0\)--sm { padding-right: 0.25rem; } }
@media(max-width: 768px) { .Pb\(0\)--sm { padding-bottom: 0.125rem; } }
@media(max-width: 768px) { .Pstart\(0\)--sm { padding-left: 0.25rem; } }
@media(max-width: 768px) { .Gtc\(1fr\ 1fr\ 1fr\)--sm { grid-template-columns: 1fr 1fr 1fr; } }
@media(max-width: 768px) { .Gta\(\"spiciness\ plant-size\ fruit-size\"\ \"fruit-shape\ fruit-color\ \.\.\.\"\)--sm {
  grid-template-areas:
    "spiciness plant-size fruit-size"
    "fruit-shape fruit-color ...";
} }
@media(max-width: 768px) { .P\(1rem\)--sm { padding: 1rem; } }
@media(max-width: 768px) { .Colmg\(1rem\)--sm { column-gap: 1rem; } }
@media(max-width: 768px) { .Mb\(1rem\)--sm { margin-bottom: 1rem; } }
[/code]