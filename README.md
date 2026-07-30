# Garden Detective

An interactive garden investigation for gardeners, garden educators, and other adult learners. Learners examine real-world garden evidence, decide whether it supports a weather event, a climate pattern, or a need for more evidence, and receive choice-specific coaching.


## Intended audience

This activity is designed for gardeners, garden educators, and other adult learners. Its evidence-based scenarios are appropriate for learners with a range of gardening experience.

## Important: Do not import this ZIP as a Canvas course package

This ZIP is a **static website**, not an H5P, SCORM, IMSCC, or Canvas course-export package.

The reliable workflow is:

1. Publish the files on GitHub Pages or another HTTPS web server.
2. Open the published URL to confirm the activity works.
3. Embed that published URL in a Canvas Page.

Uploading the ZIP to **Canvas → Settings → Import Course Content** will not create a functioning activity.

---


## Photographs and internet access

The activity includes a locally embedded title-page photograph and five licensed scenario photographs hosted by Wikimedia Commons. The title-page photograph works offline. Learners need internet access for the five scenario photographs to appear. The activity text, decisions, and feedback still work if an image does not load.

Each photograph includes:

- descriptive alternative text
- an on-screen attribution
- a link to its Wikimedia Commons source page

The photographs are illustrative. Learners should base their decisions on the written scenario evidence rather than attempting to diagnose a plant from an image alone.

## Package contents

All files needed by GitHub Pages are at the top level of this package:

- `index.html`
- `styles.css`
- `script.js`
- `content.json` — editable text, photographs, scenarios, choices, and feedback
- `.nojekyll`
- `assets/`
- `README.md`
- `CANVAS-INSTRUCTIONS.md`
- `ACCESSIBILITY.md`
- `EDITING-GUIDE.md`
- `preview-windows.bat`
- `preview-mac-linux.command`

Do not upload only `index.html`. It depends on `styles.css`, `script.js`, `content.json`, and the `assets` folder.

---

## Test locally

Because the activity now loads `content.json` separately, most browsers will block it when `index.html` is opened by double-clicking.

Use `preview-windows.bat` on Windows or `preview-mac-linux.command` on macOS/Linux. These start a small local web server at `http://localhost:8000`. Python must be installed.

---

## Publish with GitHub Pages

### 1. Create or open a repository

A public repository is simplest for GitHub Pages. Do not include private learner data in the repository.

### 2. Put the files in the repository root

After uploading, the repository should show:

```text
index.html
styles.css
script.js
content.json
.nojekyll
assets/
README.md
CANVAS-INSTRUCTIONS.md
ACCESSIBILITY.md
```

**Common error:** Do not leave all files inside an extra folder such as:

```text
garden-detective-polished/index.html
```

when GitHub Pages is configured to publish from `main / (root)`. GitHub Pages looks for `index.html` at the top level of the selected publishing folder.

### 3. Commit the files

GitHub Pages cannot publish an empty repository or files that have not been committed.

### 4. Enable Pages

In GitHub:

1. Open the repository.
2. Select **Settings**.
3. In the left navigation, select **Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Select branch **main**.
6. Select folder **/ (root)**.
7. Select **Save**.

### 5. Verify the published activity

GitHub will display a published address similar to:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

Open that exact address before embedding it in Canvas.

The address must:

- begin with `https://`
- display the activity, not a GitHub file list
- end at the repository site path, not at `github.com/.../blob/...`

---

## Embed in Canvas

See `CANVAS-INSTRUCTIONS.md` for detailed instructions and troubleshooting.

Basic embed code:

```html
<iframe
  src="https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/"
  title="Garden Detective"
  width="100%"
  height="900"
  style="border: 0; width: 100%;"
  loading="lazy"
  allow="fullscreen">
</iframe>
```

Replace the example URL with the **published GitHub Pages URL**.

---

## Why the previous instructions could fail

The earlier README was incomplete in several important ways:

1. It did not say that the ZIP was **not directly importable into Canvas**.
2. It did not explain that `index.html` must be in the selected GitHub Pages publishing root.
3. The earlier ZIP placed the project inside a parent folder, so uploading that folder's contents incorrectly could leave `index.html` one level too deep.
4. It did not distinguish a GitHub Pages URL from a normal GitHub repository or `blob` URL.
5. It did not warn that Canvas institutions may restrict external iframe domains.
6. It did not explain that all project files must remain together.

---

## Editing scenarios

Titles, instructions, photographs, scenarios, choices, and feedback are stored in `content.json`. See `EDITING-GUIDE.md` for examples and safeguards.

---

## Learner data

This activity:

- does not send a score to Canvas
- does not collect learner names
- does not store responses on a server
- does not require cookies or external libraries

The final reflection remains only on the learner's current page and disappears when the page is closed or refreshed.

---

## Browser support

Designed for current versions of Chrome, Edge, Firefox, and Safari with JavaScript enabled.

## Learner-facing terminology

The interface avoids technical development labels such as “accessible activity” or “branching scenario.” Accessibility features remain built into the activity, but learners see only the activity title, evidence prompts, and feedback.

## Title-page photograph

The title-page photograph is embedded directly in the package at `assets/gardentour125.jpg`.

**Photo: Joe Kline, Oregon State University. Used with permission.**
