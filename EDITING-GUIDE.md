# Editing the Activity

Most text and image settings are now stored in **`content.json`**. You usually do not need to edit `index.html`, `styles.css`, or `script.js`.

## Make a backup first

Before editing, duplicate `content.json`. JSON punctuation must remain valid.


## Current local image filenames

| Activity location | Filename |
|---|---|
| Title page | `assets/gardentour125.jpg` |
| Scenario 1: A Hot Weekend | `assets/scenario-1-hot-weekend.jpg` |
| Scenario 2: Earlier Bloom Over Time | `assets/scenario-2-earlier-bloom.jpg` |
| Scenario 3: Early Bloom, Late Freeze | `assets/scenario-3-frost-damage.jpg` |
| Scenario 4: Maria's Garden in Transition | `assets/scenario-4-hydrangea.jpg` |
| Scenario 5: From Observation to Adaptation | `assets/scenario-5-adaptation-garden.jpg` |

### Simplest photo-replacement process

1. Identify the scenario filename in the table above.
2. Rename your replacement JPG to that exact filename.
3. Replace the old file in the `assets` folder.
4. In `content.json`, update only the photograph's `alt` and `credit` values.
5. Commit the changed image and `content.json` to GitHub.

## Change the title-page photograph

1. Add the replacement image to the `assets` folder.
2. Open `content.json`.
3. Find:

```json
"heroImage": {
  "src": "assets/gardentour125.jpg",
  "alt": "...",
  "credit": "Photo: Joe Kline, Oregon State University"
}
```

4. Change `src`, `alt`, and `credit` as needed.
5. Commit the new image and `content.json` to GitHub.

To avoid editing `content.json`, replace `assets/gardentour125.jpg` with another image that has exactly the same filename.

## Change a scenario photograph

Each scenario contains:

```json
"photo": {
  "src": "assets/example.jpg",
  "alt": "Describe the meaningful visual content.",
  "credit": "Photographer and organization",
  "source": ""
}
```

For a local photograph, put the image in `assets/` and use an `assets/...` path. The `source` field may be an empty string when no public source page is needed.

For a remotely hosted photograph, use its complete HTTPS address and provide the public source-page URL.

## Change text or feedback

Edit the appropriate value in `content.json`. Keep quotation marks around text. Use commas between items, but do not add a comma after the final item in an object or list.

## Add or remove scenarios

Each scenario is one object inside the `"scenarios"` list. The `correct` value must match one of the identifiers in `choices`.

Example:

```json
"correct": "weather",
"choices": [
  ["weather", "This is a short-term weather event."],
  ["climate", "This shows a long-term climate pattern."],
  ["more", "More evidence is needed."]
]
```

The `coaching` object should provide feedback for each incorrect identifier.

## Validate JSON

A missing comma or quotation mark can stop the activity from loading. Use a JSON validator or open the browser developer console if the activity displays a loading error.

## Preview locally

Because `content.json` is loaded as a separate file, double-clicking `index.html` may not work.

- Windows: double-click `preview-windows.bat`
- macOS/Linux: double-click or run `preview-mac-linux.command`

Python must be installed. The activity will open at `http://localhost:8000`.

## Update GitHub without reinstalling Canvas

After the activity has been embedded in Canvas, edit or replace files directly in the same GitHub repository. GitHub Pages republishes the changes, and the existing Canvas iframe continues to use the same URL. Browser caching may delay visible changes briefly.
