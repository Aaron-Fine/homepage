# Our Fine Family homepage

A small, framework-free static site for `ourfinefamily.com`.

## Local preview

From the repository root:

```bash
python3 -m http.server 8000 --directory public
```

Then open <http://localhost:8000>.

## Cloudflare Pages

Connect this repository to Cloudflare Pages with:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Build command | `exit 0` |
| Build output directory | `public` |
| Root directory | Leave blank |

After the first deployment, add `ourfinefamily.com` under the Pages
project's **Custom domains** settings. Cloudflare will create the DNS record
because the domain is already managed there.

Every push to `main` will deploy to production. Other branches and pull
requests receive Cloudflare preview URLs.

## Replacing the separate portraits with a combined photo

1. Export a landscape or square image as `public/assets/fine-family.webp`.
2. Strip location metadata before committing it.
3. In `public/index.html`, replace:

```html
<div class="portrait-pair">
  <!-- Aaron and Sarah image elements -->
</div>
```

with:

```html
<img
  class="portrait-image"
  src="/assets/fine-family.webp"
  alt="Aaron and his wife"
  width="1200"
  height="900"
>
```

The existing layout will size and crop the image automatically.

## Structure

```text
public/
├── index.html
├── aaron/
├── projects/
│   └── morning-briefing/
├── analysis/
│   └── framework/
├── assets/
├── styles.css
├── 404.html
├── _headers
├── robots.txt
└── sitemap.xml
```

There is intentionally no JavaScript or build system. Edit the HTML and CSS,
commit, and push.
