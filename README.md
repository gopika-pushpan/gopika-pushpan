# Gopika Pushpan — Portfolio

Personal portfolio. Computer science student working on machine learning, data, and generative AI — and learning Java full-stack.

**Live site:** [[https://gopika-pushpan.github.io/gopika-pushpan/](https://gopika-pushpan.vercel.app/)](https://gopika-pushpan.vercel.app/)

## About the build
- Warm editorial design: cream paper, ink, single vermillion accent, Fraunces display serif.
- Sections: Hero → About → Work → Skills → Experience → Education → Awards → Contact.
- Every project card links to its GitHub repo.
- Tasteful motion only: scroll reveals, hero type reveal, count-up facts, marquee, hover states. Respects `prefers-reduced-motion`.
- Optimized for mobile and desktop.
- Zero build step. Plain HTML / CSS / vanilla JS. No frameworks, no bundler.

## Structure
```
.
├── index.html
├── styles.css
├── script.js
├── .nojekyll
└── assets/
    ├── avatar.jpg
    └── Gopika-Pushpan-Resume.pdf
```

## Run locally
Open `index.html`, or serve the folder:
```bash
python -m http.server 8000     # http://localhost:8000
```

## Deploy (GitHub Pages)
1. Push these files to the repo root (branch `main`).
2. GitHub → **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / root.
3. Live at `https://gopika-pushpan.github.io/gopika-pushpan/`.

## Customize
- Text/links: `index.html`.
- Colors/fonts: CSS variables at the top of `styles.css`.
