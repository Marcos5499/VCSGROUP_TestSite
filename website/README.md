# VCS Group website (Deep Ocean direction)

A static site: plain HTML, CSS and JavaScript, with no build step needed to view it. Open `index.html`.

- `index.html`: the homepage
- `css/main.css`: all styles
- `js/main.js`: header, "Our businesses" mega menu, full-page menu, scroll reveals and testimonials
- `assets/img/`: section backgrounds (2000×1250 JPEG)
- `tools/gen_backgrounds.py`: makes those backgrounds (`python3 tools/gen_backgrounds.py [name]`)

## Backgrounds
`hero.jpg` is the network image from the 2025 company profile cover. The other nine (ict, automobile, distribution, tourism, printing, media, investment, values, cta) are scenes made in code, because no photo library could be reached from the build machine. To use a real photo, replace the file and keep its name.

## Still to build
The sector pages (`sectors/*.html`), `about.html` (with the journey timeline), `careers.html` and `contact.html`. The links to them are already in place.
