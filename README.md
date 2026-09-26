# The Football Evangelists

> Where the Beautiful Game Meets the Good Book.

A digital cathedral, not a blog. A static site built with **Eleventy (11ty)** and Nunjucks, styled by a single hand-illuminated stylesheet (`sacred-codex.css`), with content managed through **Decap CMS** and deployed free on **Netlify**.

---

## Quick start

```bash
npm install
npm run dev        # serves http://localhost:8080 with live reload
npm run build      # outputs the static site to ./_site
```

## Structure

```
/
├── src/
│   ├── _includes/        base.njk · sermon.njk · page.njk · header.njk · footer.njk
│   ├── _data/site.json   title, description, url, author, benediction
│   ├── sermons/          Markdown scrolls (front matter + Holy Template HTML)
│   ├── pages/            about.njk (The Creed) · archive.njk (The Scriptorium) · 404.njk
│   ├── css/sacred-codex.css   THE stylesheet — everything, nothing else
│   ├── js/chapel.js      dark mode · scroll progress · mobile menu (nothing more)
│   ├── admin/            Decap CMS (index.html + config.yml)
│   └── index.njk         The Nave (homepage)
├── .eleventy.js
├── netlify.toml
└── package.json
```

## Deploy to Netlify

1. Push this repository to GitHub/GitLab.
2. In Netlify: **Add new site → Import an existing project.** Build settings are read from `netlify.toml` (`npx @11ty/eleventy`, publish `_site`, Node 18).
3. The `/* → /404.html` redirect (with 404 status) is already configured.

## Enable the Vestry (Decap CMS)

1. Netlify dashboard → **Identity → Enable Identity**.
2. **Identity → Services → Git Gateway → Enable.**
3. Invite yourself: **Identity → Invite users.** Accept the invite email, then visit `/admin` on your live site to write sermons.

Fields match the front matter exactly: title, subtitle, date, series (canonical list), tags, excerpt, readingTime, featured, body.

## Custom domain (Namecheap)

1. Netlify → **Domain settings → Add custom domain** (e.g. `thefootballevangelists.com`).
2. In Namecheap → **Advanced DNS**:
   - `A` record — host `@` → `75.2.60.5` (Netlify load balancer)
   - `CNAME` record — host `www` → `your-site-name.netlify.app`
3. Back in Netlify, verify DNS and let Let's Encrypt provision HTTPS.

## The two vespers

- **Daylight Vespers** (default): parchment, scarlet, gold, teal.
- **Midnight Vespers** (`html.dark-mode`): tonight's liturgy — midnight nave, softened scarlet, glowing gold. Preference is saved to `localStorage`; falls back to `prefers-color-scheme`.

## Notes for scribes

- Drop a 1200×630 raster image at `src/images/og-cover.jpg` for social sharing (referenced by the Open Graph tags).
- The newsletter form uses Netlify Forms — it activates automatically on first deploy.
- Body text never falls below 16px. All touch targets are ≥44px. Print stylesheet included. Selections are scarlet. Scrollbars are gold. Amen.
