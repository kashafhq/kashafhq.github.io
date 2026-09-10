# Putting Kashaf online, from a phone

Everything is in one folder with no sub-folders, so a phone can upload it.

## 1. Make the repository

In your phone's **browser**, not the GitHub app — the app cannot upload files.

- github.com, sign in, go to your organisation
- **New repository**
- Name it exactly: **kashaf.github.io**
- **Public**
- Do not tick "Add a README"
- **Create repository**

## 2. Upload every file

- On the empty repository page, tap **uploading an existing file**
- **choose your files**, then select **all 29 files** in this folder
- If your phone will not take them all at once, do it in two or three goes.
  `MathWhiteboard.html` is 7 MB, so give it a moment.
- Commit message: `The Kashaf site`
- **Commit changes**

All the files sit at the top level. There is nothing to put in a folder.

## 3. Switch on Pages

- **Settings** (scroll the tabs sideways if you cannot see it)
- **Pages**, in the left menu
- Source: **Deploy from a branch**
- Branch: **main**, folder: **/ (root)**
- **Save**

## 4. Wait, then open it

Two or three minutes. Reload the Pages settings and the address is at the top:

**https://kashaf.github.io**

## 5. Check these on your phone

- The banner rotates, and swiping moves it
- The menu button opens the menu
- **Start teaching** opens the whiteboard
- **Recording now captures sound.** This is the one thing that could never work
  from a downloaded file, because a page opened from storage has no address
  for the microphone permission to belong to.

## If it goes wrong

| What you see | What it means |
|---|---|
| 404 after five minutes | `index.html` is not at the top level |
| No colours or layout | `style.css` did not upload |
| Board will not open | `MathWhiteboard.html` did not upload |
| Banner does not move | `app.js` did not upload |

Upload the missing file and it will be live again in a minute.

## What to do next

`TODO.md` lists what only you can fill in: company name, contact email,
hosting country, prices. `GUIDE.md` has the prompts for the work after that.
