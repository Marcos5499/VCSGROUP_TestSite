# VCS Group: website concepts D, E and F

These are three multi-page corporate site concepts. Each one has a home page, seven sector pages (ICT, Automobile, Distribution, Tourism, Printing, Media, Investment), About and Contact. Every sector page links to the websites of its companies wherever the 2025 company profile names one.

| Folder | Concept | Type | Interactive feature |
|---|---|---|---|
| `d-monument/` | **The name as a monument.** The VCS letters set as architecture across an inset picture | Archivo | "What do you need?" company finder |
| `e-annual/` | **The printed annual.** The company profile as a printed report: chapters, a sector strip, solid colour pages | Bodoni Moda + Jost | Year slider (1991 to 2023) showing which companies had joined |
| `f-statement/` | **Type and nothing else.** The Group's firsts told as typographic set pieces | Anton + Work Sans | Live count of days at work since 2 Dec 1991, plus the time in Victoria |

`index.html` is a review window: it lists the concepts and their pages and shows the live site at desktop, tablet or phone width.

## Built with the installed skills
- **taste-skill** (Leonxlnx/taste-skill): `draw.mjs` produced one art direction per concept, with the brand palette kept fixed. Every page passes `lint.mjs` with no findings. `inspect.mjs` was run at 1440, 768 and 390 px.
- **emil-design-eng** (emilkowalski/skills): custom easing curves, `scale(0.97)` press feedback, hover effects only on devices that can hover, menus that open from where they were clicked, exits faster than entrances, staggered entrances, clip-path shutter reveals, and full support for reduced-motion settings.

## Editing
The content comes from `build/data.mjs`. To rebuild: `node build/build.mjs` (needs Node 22).

## Photography
The sandbox could not reach any photo source, so the pictures are flat drawings in the brand colours (`build/art.mjs`), apart from the network image from the profile cover. The inspector's "few pictures" check fails for this reason alone.

To use real photos, put them in `assets/photos/`, list them in `assets/photos/photos.json` (`{"tourism": {"file": "island-star.jpg", "alt": "...", "w": 1600, "h": 1200}}`), and rebuild. Slot names are the sector slugs plus `mahe` and `clock`.

## To confirm before launch
- Website addresses for Savy & Sons, Switch, TODAY in Seychelles, Crown Motors and Autoland (the profile doesn't list any).
- The Facebook links taken from the profile (`facebook.com/hondaseychelles`, `/executivemotors`, `/printhouse`).
