# Canvas Publishing and Embed Instructions

## Recommended method: GitHub Pages + Canvas iframe

Canvas does not treat this ZIP as an H5P, SCORM, IMSCC, or Canvas course package. Publish the activity first, then embed its public HTTPS address.

## Step 1: Confirm the GitHub Pages site works

Open:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

You should see the activity start screen.

Do not use:

```text
https://github.com/YOUR-USERNAME/YOUR-REPOSITORY/
```

or:

```text
https://github.com/YOUR-USERNAME/YOUR-REPOSITORY/blob/main/index.html
```

Those are GitHub interface pages, not the published website.

## Step 2: Create or edit a Canvas Page

1. Open the Canvas course.
2. Select **Pages**.
3. Create a new page or edit an existing page.
4. In the Rich Content Editor, open the HTML/source editor. Depending on your Canvas version, this may appear as the `</>` icon.
5. Paste the iframe code below.
6. Replace the example URL with your published GitHub Pages URL.
7. Save and publish the Canvas Page.

```html
<div style="width: 100%;">
  <iframe
    src="https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/"
    title="Garden Detective: Weather or Climate?"
    width="100%"
    height="900"
    style="border: 0; width: 100%;"
    loading="lazy"
    allow="fullscreen">
  </iframe>
</div>
```

## Step 3: Test as a learner

Use Canvas **Student View** and verify:

- the activity appears
- buttons can be reached with the Tab key
- feedback appears after a choice
- the iframe is tall enough
- the activity works in the Canvas mobile experience used by your program

## Canvas troubleshooting

### The ZIP will not import

Expected. It is not a Canvas course package. Do not use **Import Course Content** for this ZIP.

### Canvas removes the iframe after saving

Your institution may restrict external iframe domains. Ask the Canvas administrator to allow the published GitHub Pages domain, usually:

```text
https://YOUR-USERNAME.github.io
```

Institutional security policy controls whether this is allowed.

### The iframe shows a GitHub page or file list

The `src` is a repository URL, not a GitHub Pages URL. Use the address displayed in **GitHub repository → Settings → Pages**.

### The iframe shows 404

Check all of the following:

- `index.html` is at the root of the selected Pages source.
- The publishing branch is `main` or the repository's default branch.
- The Pages folder is `/ (root)`.
- The files have been committed.
- The repository name and capitalization in the URL are exact.
- The Pages deployment completed successfully.

### The page loads without styling or buttons do not work

Confirm that these files are beside `index.html`:

```text
styles.css
script.js
```

Do not rename them unless you also update the references in `index.html`.

### The activity is cut off

Increase the iframe `height`, for example from `900` to `1100`.

### The activity works directly but not inside Canvas

This usually indicates an institutional iframe/domain restriction. Share the direct GitHub Pages URL with your Canvas administrator and request approval for embedding.

## Alternative: External URL module item

When iframe embedding is restricted, add the published activity as a Canvas **External URL** module item and select the option to load it in a new browser tab. This preserves functionality but does not display the activity directly inside a Canvas Page.

## Accessibility note

The iframe includes a descriptive `title`. Do not remove it. Also provide a normal text link beneath the iframe when local policy requires an alternative way to open embedded content:

```html
<p>
  <a href="https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/" target="_blank" rel="noopener">
    Open Garden Detective in a new browser tab
  </a>
</p>
```
