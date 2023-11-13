[title]Atomic CSS
[header]In a nutshell
Atomic CSS takes the principle of class reusability to the absolute. In this methodology, each CSS property is extracted into a separate utility class.
This is a straightforward, obvious, and simple methodology. Classes are immutable – they don’t change. This makes the application of CSS predictable and reliable as classes will always do exactly the same thing. The scope of adding or removing a utility class in an HTML file is unambiguous, giving you the confidence that you aren’t breaking anything else.
In general, this is the most rational and modern approach to styling web applications, which has found its embodiment in popular frameworks such as Tailwind CSS.
[pros]
Predictability due to class immutability. Simplicity of debugging.
Better reusability compared to other methodologies, as no CSS property is duplicated in different classes (excluding breakpoints and pseudo-classes).
No need to invent class names; everything is already done for you. Class names immediately indicate their purpose.
Well-suited for automation using scripts and utilities. Due to its characteristics and ideology, it practically begs to be the basis for creating frameworks.
More compact CSS files compared to other methodologies. If SASS is used to generate identical classes, the savings are even greater.
Performance gain in large projects that use a large number of styles.
[cons]
Not suitable for "manual" work due to the huge number of class names that need to be memorized.
CSS files are visually unreadable; editing them is extremely difficult. With mass usage of dynamic selector generation, it's practically impossible.
HTML files look blatantly ugly due to the enormous number of classes on each element. While CSS sources in Atomic are more compact than other methodologies, HTML, on the contrary, is inflated to indecency. If an element has additional styles for different breakpoints and/or pseudo-classes like hover, the situation worsens proportionally to their quantity, as each breakpoint or pseudo-class can add a dozen new classes to the element. Even a modest element in this system looks something like this (believe me, this is not the worst case):
[code]
<div class="Fz(1.2rem) Lh(100%) W(minc) Pt(0) Pend(0.25rem) Pb(0.25rem) Pstart(0.25rem) Mb(0.25rem) Bdrs(0.25rem) Bgc(#609255) C(#eee) C(#ffd51a):h Td(n):h Cur(p):h Fz(0.8rem)--sm Lh(120%)--sm Pt(0)--sm Pend(0.25rem)--sm Pb(0.125rem)--sm Pstart(0.25rem)--sm" customvalue="all">all<span class="Fz(1.4rem) Mstart(0.25rem) Fz(0.8rem)--sm">×</span></div>
[/code]
Another drawback of classic Atomic is the widespread use of non-alphabetic and non-numeric symbols in class names, all of which need to be escaped, further disfiguring an already unreadable CSS file.
Classic Atomic does not get along well with CSS shorthand notation because any compound value in such notation can be written in multiple ways. For example, a solid 1px border with the color #000 can be written in 6 different ways, resulting in 6 different class names for one property:
[code]
(1px solid #000)
(1px #000 solid)
(solid #000 1px)
(solid 1px #000)
(#000 1px solid)
(#000 solid 1px)
[/code]
What's even worse is that spaces or commas in compound values cannot be used in CSS class names, even if escaped.
Even less compatibility with arbitrary compound values in CSS attributes such as grid-template-areas, grid-template-columns, and similar ones. For such cases, custom classes need to be created:
[code]
$GtcBrowser: 1.2fr 0.8fr;
$GtaBrowser: "header header" "image specs" "description description";
.Gtc\(GtcBrowser\) { grid-template-columns: $GtcBrowser; }
.Gta\(GtaBrowser\) { grid-template-areas: $GtaBrowser; }
[/code]
Media breakpoints are also atomized, which not only inflates HTML as mentioned before, but also complicates reading CSS.
[example]
[code]
@use "sass:string";

// custom variables
$CustomBullet: "● ";
$GtcDb: 0.6fr 1.4fr;
$GtcDb_sm: 1fr;
$GtcBrowser: 1.2fr 0.8fr;
$GtcBrowser_sm: 1fr;
$GtcDesc: 1fr 1fr 1fr 1fr 1fr;
$GtcDesc_sm: 1fr 1fr 1fr;
$GtaDb: "search browser" "list browser";
$GtaDb_sm: "search" "list" "browser";
$GtaBrowser: "header header" "image specs" "description description";
$GtaBrowser_sm: "header" "image" "specs" "description";
$GtaDesc: "spiciness plantSize fruitSize fruitShape fruitColor";
$GtaDesc_sm: "spiciness plantSize fruitSize" "fruitShape fruitColor ...";

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
// Border style generation
$bdStyles: solid, dotted, inset, outset;
@each $bds in $bdStyles { .Bds\(#{string.slice($bds, 1, 1)}\) { border-style: #{$bds}; } }
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

// color and bg-colors generation
$bgColors: 111, 222, 999, bbb, ddd, fff, e1f7dc, ffe3e3, 126300, 609255, 8f0404, d40c02;
@each $bgc in $bgColors { .Bgc\(\##{$bgc}\) { background-color: #{"#"+$bgc}; } }
.Bgc\(\#ddd\)\:h:hover { background-color: #ddd; }
.Bgc\(\#111\)\:h:hover { background-color: #111; }
$colors: 222, ddd, eee, fff, f7e38f;
@each $c in $colors { .C\(\##{$c}\) { color: #{"#"+$c}; } }
$hoverColors: 000, 7fff17, ffd51a, f7e38f, f00;
@each $hc in $hoverColors { .C\(\##{$hc}\)\:h:hover { color: #{"#"+$hc}; } }

.Colmg\(0\.5rem\) { column-gap: 0.5rem; }
.Colmg\(1rem\) { column-gap: 1rem; }
.Colmg\(2rem\) { column-gap: 2rem; }
.Cur\(d\)\:h:hover { cursor: default; }
.Cur\(p\)\:h:hover { cursor: pointer; }

// display styles generation
$displayStyles: block, flex, grid, none;
@each $dst in $displayStyles { .D\(#{string.slice($dst, 1, 1)}\) { display: #{$dst}; } }

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
.List\(CustomBullet\) { list-style-type: $CustomBullet }

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
.Mx\(0\) {
  margin-left: 0;
  margin-right: 0;
}
.Mx\(1rem\) {
  margin-left: 1rem;
  margin-right: 1rem;
}
.My\(0\) {
  margin-top: 0;
  margin-bottom: 0;
}
.My\(0\.25rem\) {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
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
.Py\(1rem\) {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
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

.Gtc\(GtcDb\) { grid-template-columns: $GtcDb; }
.Gtc\(GtcBrowser\) { grid-template-columns: $GtcBrowser; }
.Gtc\(GtcDesc\) { grid-template-columns: $GtcDesc; }
.Gta\(GtaDb\) { grid-template-areas: $GtaDb; }
.Gta\(GtaBrowser\) { grid-template-areas: $GtaBrowser; }
.Gta\(GtaDesc\) { grid-template-areas: $GtaDesc; }

// grid areas generation
$gridAreas: search, list, browser, header, image, specs, description, spiciness, plantSize, fruitSize, fruitShape, fruitColor;
@each $area in $gridAreas { .Ga\(#{$area}\) { grid-area: #{$area}; } }

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
@media(max-width: 768px) { code { font-size: 0.8rem; padding: 1rem; } }
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
@media(max-width: 768px) { .Gtc\(GtcDb_sm\)--sm { grid-template-columns: $GtcDb_sm; } }
@media(max-width: 768px) { .Gta\(GtaDb_sm\)--sm { grid-template-areas: $GtaDb_sm; } }
@media(max-width: 768px) { .H\(a\)--sm { height: auto } }
@media(max-width: 768px) { .Gtc\(GtcBrowser_sm\)--sm { grid-template-columns: $GtcBrowser_sm; } }
@media(max-width: 768px) { .Gta\(GtaBrowser_sm\)--sm { grid-template-areas: $GtaBrowser_sm; } }
@media(max-width: 768px) { .M\(0\.6rem\)--sm { margin: 0.6rem; } }
@media(max-width: 768px) { .M\(a\)--sm { margin: auto; } }
@media(max-width: 768px) { .T\(3\%\)--sm { top: 3%; } }
@media(max-width: 768px) { .Translate\(-50\%\+0\%\)--sm { transform: translate(-50%, 0%); } }
@media(max-width: 768px) { .Fz\(1rem\)--sm { font-size: 1rem; } }
@media(max-width: 768px) { .Fz\(0\.8rem\)--sm { font-size: 0.8rem; } }
@media(max-width: 768px) { .Lh\(120\%\)--sm { line-height: 120%; } }
@media(max-width: 768px) { .Pt\(0\)--sm { padding-top: 0; } }
@media(max-width: 768px) { .Pend\(0\.25rem\)--sm { padding-right: 0.25rem; } }
@media(max-width: 768px) { .Pb\(0\.125rem\)--sm { padding-bottom: 0.125rem; } }
@media(max-width: 768px) { .Pstart\(0\.25rem\)--sm { padding-left: 0.25rem; } }
@media(max-width: 768px) { .Gtc\(GtcDesc_sm\)--sm { grid-template-columns: $GtcDesc_sm; } }
@media(max-width: 768px) { .Gta\(GtaDesc_sm\)--sm { grid-template-areas: $GtaDesc_sm; } }
@media(max-width: 768px) { .P\(1rem\)--sm { padding: 1rem; } }
@media(max-width: 768px) { .Colmg\(1rem\)--sm { column-gap: 1rem; } }
@media(max-width: 768px) { .Mb\(1rem\)--sm { margin-bottom: 1rem; } }
@media(max-width: 768px) { .mt-1 { padding-left: 0.25rem; } }
[/code]