# Kashaf — putting the site live, and what to do next

Two parts. **Part 1** gets the site on the internet today. **Part 2** is prompts
for the work after that.

---

# Part 1 — get it live

You already have a GitHub organisation. This uses it.

## Step 1 — a repository for the site · 5 minutes

The repository name decides the address, so this matters.

**For a bare `github.io` address**, name it exactly `kashaf.github.io`
(your org name, then `.github.io`). The site then lives at
`https://kashaf.github.io`.

**For anything else**, name it `site` and the address becomes
`https://kashaf.github.io/site/`. Both work; the first is tidier.

- Your organisation page → **New repository**
- Name it as above
- **Public** — GitHub Pages needs it, unless you pay
- Do not add a README; the folder already has files
- **Create repository**

## Step 2 — upload · 5 minutes

- On the empty repository page → **uploading an existing file**
- Drag in **everything inside** `kashaf-site`, including the `app` folder
- Commit message: `The Kashaf site`
- **Commit changes**

Make sure `index.html` sits at the top level, not inside another folder. If you
see `kashaf-site/index.html` in the listing, you dragged the folder rather than
its contents. Delete and redo.

## Step 3 — switch Pages on · 2 minutes

- Repository **Settings** → **Pages** in the left menu
- Source: **Deploy from a branch**
- Branch: **main**, folder: **/ (root)** → **Save**
- Wait two or three minutes and reload. The address appears at the top.

## Step 4 — check it on your phone · 5 minutes

Open the address on your phone and check:

- The banner rotates, and swiping moves it
- The **☰** button opens the menu, and a link closes it
- Numbers count up as you scroll to them
- **Start teaching** opens the board
- The board records **with sound** — this is the thing that could not work
  from storage

## Step 5 — your own domain · optional, later

Buy `kashaf.com` or similar, then Settings → Pages → Custom domain. GitHub
issues the certificate itself. Do this before printing the address anywhere.

---

# Part 2 — prompts for the work ahead

One per session. Paste `CLAUDE.md` first if the assistant has not read it.

## Prompt A — the pages that are still thin

```
The Kashaf site is live. index.html has a proper banner and landing page, but
these pages are still plain and need the same treatment:

  for-teachers.html   the main sales page for a teacher
  board.html          currently just two buttons
  worksheets.html     the same
  books.html          nearly empty
  about.html          nearly empty

For each one:
- Open with a short banner section using the navy background, an eyebrow label,
  a headline and one sentence. Not a rotating carousel — one panel.
- Then alternating sections: white, soft teal, white, soft purple.
- Use the existing classes: .cards, .card, .product, [data-reveal], .stats.
- Every screenshot or diagram is inline SVG. No images fetched from anywhere.
- Keep the brand hierarchy: navy leads, teal acts, purple accents, gold
  highlights only.

Do not invent features. Read app/MathWhiteboard.html and
app/WorksheetStudio.html and describe what is actually there.
```

## Prompt B — screenshots of the real thing

```
The site describes the whiteboard but never shows it. Add real screenshots.

Take them yourself at 1440x900 and at 390x844, of:
  the board with an equation and a graph on it
  the shapes panel open
  the statistics panel with a histogram
  the worksheet generator mid-way through
  a generated worksheet with its answer key

Put them in an images/ folder as PNG, and again as WebP. Use <picture> so the
browser takes the smaller one. Every one needs alt text that says what is being
shown, not "screenshot".

Then place them: one in for-teachers.html, one each in board.html and
worksheets.html, and swap the second banner slide on the home page for a real
worksheet screenshot.

Nothing may be loaded from another domain.
```

## Prompt C — search engines and sharing

```
Add the things that make a site findable and make links look right.

- A unique <title> and meta description for each page, written for a teacher
  searching, not for a robot.
- Open Graph and Twitter card tags, with a 1200x630 share image built from the
  logo and the wordmark on the navy background. Generate it as a PNG.
- sitemap.xml listing every page, and robots.txt pointing at it.
- JSON-LD for Organization on the home page and SoftwareApplication on the
  board and worksheet pages.
- A canonical link on every page.

Then tell me what to submit to Google Search Console and how.
```

## Prompt D — speed and the checks

```
Make sure the site stays fast and correct as it grows.

- A GitHub Action that runs on every push and fails if: any page references an
  external domain, any page has more or fewer than one h1, any internal link is
  broken, or app.js has a syntax error.
- Compress every PNG. The logo files are larger than they need to be.
- Add width and height to every image so the page does not jump while loading.
- Check the whole site with Lighthouse on mobile and give me the numbers before
  and after.

The rule that nothing is fetched from another domain is not negotiable. The
action must enforce it.
```

## Prompt E — before you charge anyone

```
Work through TODO.md with me. For each item, either ask me the question you
need answered, or tell me what a sensible default would be.

Then produce:
- A one-page summary of what a school's data protection officer will ask and
  where on the site each answer lives.
- A list of exactly what needs a lawyer, so I can brief one in a single email
  rather than paying for a discovery conversation.
```

---

# What is in the folder

| | |
|---|---|
| `index.html` | The landing page: rotating banner, numbers, the three products |
| `for-teachers.html` `board.html` `worksheets.html` `books.html` `about.html` | The main pages |
| `features.html` `for-schools.html` `pricing.html` `help.html` `contact.html` | Supporting |
| 10 legal pages | privacy, student privacy, terms, acceptable use, cookies, security, sub-processors, DPA, accessibility, data requests |
| `style.css` | Every brand token as a variable, at the top |
| `app.js` | Banner, menu, reveals, counters. First-party, no libraries |
| `logo-mark.png` `logo-full.png` | Your logo, cropped, background removed |
| `app/` | Both tools, self-contained |
| `TODO.md` | What still needs you |

## Changing the colours

Everything comes from the variables at the top of `style.css`. Change one line
and it changes everywhere.

One caution: `--teal-ink` (`#22807C`) exists because your `#36A9A5` on white is
2.85:1, and text needs 4.5:1. Keep `#36A9A5` for fills and borders; keep the
darker one for anything carrying words.

---

# Order I would do it in

1. **Part 1** — get it live. An hour at most, and it fixes voice recording.
2. **Prompt B** — screenshots. Teachers believe what they can see.
3. **Prompt A** — fill out the thin pages.
4. **Prompt C** — so people can find it.
5. **Prompt E** — before any money changes hands.
6. **Prompt D** — when the site is big enough to break quietly.

Getting it live matters more than any of the rest. Everything after that is
easier when there is a real address to look at.
