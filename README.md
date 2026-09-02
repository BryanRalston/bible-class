# Kids Bible Class — Lesson Library

Illustrated story lessons for kids' Bible class. Each lesson is a slideshow-style
document: a title page, then alternating **picture** and **narration** pages
("Image 1", "Image 2", …), and a closing **"What We Learn"** page that states the
moral plainly with a "For you" line for the kids — built on the same format as the
original *May Week 5* (Matthew) template.

Every lesson is fully **self-contained**: the HTML has its images embedded, and a
matching **PDF** is generated for printing or projecting. Files are named
`MM-W{week}_{name}` (e.g. `06-W3_lost-son.pdf`) so they sort in teaching order.

## Lessons

| Week | Lesson | Reference | Files |
|------|--------|-----------|-------|
| May W5 | [The Story of the Lost Sheep](lessons/lost-sheep/) | Luke 15:1–7 | [PDF](lessons/lost-sheep/05-W5_lost-sheep.pdf) · [HTML](lessons/lost-sheep/05-W5_lost-sheep.html) |
| Jun W3 | [The Story of the Lost Son](lessons/lost-son/) | Luke 15:11–32 | [PDF](lessons/lost-son/06-W3_lost-son.pdf) · [HTML](lessons/lost-son/06-W3_lost-son.html) |
| Jun W4 | [The Hidden Treasure and the Pearl](lessons/hidden-treasure-pearl/) | Matthew 13:44–46 (+ 4:18–22) | [PDF](lessons/hidden-treasure-pearl/06-W4_hidden-treasure-pearl.pdf) · [HTML](lessons/hidden-treasure-pearl/06-W4_hidden-treasure-pearl.html) |
| Jul W1 | [The Story of the Farmer](lessons/the-farmer/) | Matthew 13:1–23 | [PDF](lessons/the-farmer/07-W1_the-farmer.pdf) · [HTML](lessons/the-farmer/07-W1_the-farmer.html) |
| Jul W2 | [The Parable of the Bags of Gold](lessons/bags-of-gold/) | Matthew 25:14–30 | [PDF](lessons/bags-of-gold/07-W2_bags-of-gold.pdf) · [HTML](lessons/bags-of-gold/07-W2_bags-of-gold.html) |
| Jul W3 | [The Servant Who Had No Mercy](lessons/unmerciful-servant/) | Matthew 18:21–35 | [PDF](lessons/unmerciful-servant/07-W3_unmerciful-servant.pdf) · [HTML](lessons/unmerciful-servant/07-W3_unmerciful-servant.html) |
| Jul W4 | [The Story of the Persistent Widow](lessons/persistent-widow/) | Luke 18:1–8 | [PDF](lessons/persistent-widow/07-W4_persistent-widow.pdf) · [HTML](lessons/persistent-widow/07-W4_persistent-widow.html) |
| Aug W1–W5 | (see `lessons/` — God Made Everything → God Loves Me) | — | built locally |
| Sep W1 | [Daniel and the Lions](lessons/daniel-and-the-lions/) | Daniel 6:1–23 | [PDF](lessons/daniel-and-the-lions/09-W1_daniel-and-the-lions.pdf) · [HTML](lessons/daniel-and-the-lions/09-W1_daniel-and-the-lions.html) |
| Sep W2 | [Hagar and Ishmael](lessons/hagar-and-ishmael/) | Genesis 21:14–20 | [PDF](lessons/hagar-and-ishmael/09-W2_hagar-and-ishmael.pdf) · [HTML](lessons/hagar-and-ishmael/09-W2_hagar-and-ishmael.html) |
| Sep W3 | [The Story of Joseph](lessons/joseph/) | Genesis 37; 39–47 | [PDF](lessons/joseph/09-W3_joseph.pdf) · [HTML](lessons/joseph/09-W3_joseph.html) |
| Sep W4 | [The Story of Jonah](lessons/jonah/) | Jonah 1:1–3:3 | [PDF](lessons/jonah/09-W4_jonah.pdf) · [HTML](lessons/jonah/09-W4_jonah.html) |
| Oct W1 | [Moses and the Burning Bush](lessons/moses-burning-bush/) | Exodus 3:1–4:17 | [PDF](lessons/moses-burning-bush/10-W1_moses-burning-bush.pdf) · [HTML](lessons/moses-burning-bush/10-W1_moses-burning-bush.html) |
| Oct W2 | [Moses and the Sea](lessons/moses-and-the-sea/) | Exodus 13:17–14:31 | [PDF](lessons/moses-and-the-sea/10-W2_moses-and-the-sea.pdf) · [HTML](lessons/moses-and-the-sea/10-W2_moses-and-the-sea.html) |
| Oct W3 | [Elijah and the Widow](lessons/elijah-and-the-widow/) | 1 Kings 17:1–16 | [PDF](lessons/elijah-and-the-widow/10-W3_elijah-and-the-widow.pdf) · [HTML](lessons/elijah-and-the-widow/10-W3_elijah-and-the-widow.html) |
| Oct W4 | [King Hezekiah Prays to God](lessons/hezekiah-prays/) | Isaiah 37:14–21; 38:1–6; 2 Kings 20:1–5 | [PDF](lessons/hezekiah-prays/10-W4_hezekiah-prays.pdf) · [HTML](lessons/hezekiah-prays/10-W4_hezekiah-prays.html) |
| Nov W1 | [Celebrate What God Made](lessons/celebrate-creation/) | Psalm 33; Psalm 100 | [PDF](lessons/celebrate-creation/11-W1_celebrate-creation.pdf) · [HTML](lessons/celebrate-creation/11-W1_celebrate-creation.html) |
| Nov W2 | [Deborah](lessons/deborah/) | Judges 4:1–10, 14; 5:1–31 | [PDF](lessons/deborah/11-W2_deborah.pdf) · [HTML](lessons/deborah/11-W2_deborah.html) |
| Nov W3 | [Miriam Celebrates](lessons/miriam-sings/) | Exodus 15:1–21 | [PDF](lessons/miriam-sings/11-W3_miriam-sings.pdf) · [HTML](lessons/miriam-sings/11-W3_miriam-sings.html) |
| Nov W4 | [The Feast of Booths](lessons/feast-of-booths/) | Deuteronomy 16:13–17; Leviticus 23:33–43 | [PDF](lessons/feast-of-booths/11-W4_feast-of-booths.pdf) · [HTML](lessons/feast-of-booths/11-W4_feast-of-booths.html) |
| Nov W5 | [David Praises God](lessons/david-praises-god/) | 2 Samuel 6:12–15; 1 Chronicles 15–16 | [PDF](lessons/david-praises-god/11-W5_david-praises-god.pdf) · [HTML](lessons/david-praises-god/11-W5_david-praises-god.html) |

_Open the PDF to print or present. Open the HTML in any browser to view or to
**File → Print → Save as PDF** after edits._

## Folder layout

```
bible-class/
  README.md                  <- this index
  build/                     <- the tools (reused by every lesson)
    new-lesson.js              scaffold a new lesson
    generate-images.js         create the 5 illustrations (xAI Grok image API)
    build-lesson.js            story.json + images -> self-contained HTML
    render-pdf.ps1             HTML -> PDF (headless Chrome)
  lessons/
    lost-sheep/
      story.json             <- the lesson content (text + image prompts + moral)
      images/                <- generated illustrations (01..05)
      05-W5_lost-sheep.html  <- viewable / printable
      05-W5_lost-sheep.pdf   <- final document
```

`story.json` is the single source of truth for a lesson — edit it and rebuild.
Set its `month` + `weekOfMonth` and the output files get the dated prefix automatically.

## Add a new lesson (4 steps)

Run from the `build/` folder. Requires `XAI_API_KEY` in the environment (for art)
and Google Chrome installed (for the PDF).

```powershell
cd C:\Cortex\bible-class\build

# 1. Scaffold
node new-lesson.js prodigal-son "The Prodigal Son" "Luke 15:11-32"

# 2. Edit lessons\prodigal-son\story.json
#    - set month + weekOfMonth (controls the dated file name)
#    - fill in bigIdea, memoryVerse, moral (lesson + application), and the 5 beats
#    - keep "character" consistent so every picture matches

# 3. Generate the pictures (skips ones that already exist; --force to redo)
node generate-images.js ..\lessons\prodigal-son

# 4. Build the document (build-lesson prints the dated html name it wrote)
node build-lesson.js ..\lessons\prodigal-son
powershell -ExecutionPolicy Bypass -File render-pdf.ps1 -Html ..\lessons\prodigal-son\07-W3_prodigal-son.html
```

Then add a row to the table above. (To rebuild ALL lessons at once after a tooling
change, the build dir has a `rebuild-all.ps1` you can reuse.)

## Tips

- **Consistent characters:** the `character` field in `story.json` is appended to
  every image prompt so the same shepherd / person appears across all pages.
- **Regenerate one image:** delete that file in `images/` and re-run
  `generate-images.js` (it only fills in what's missing), or pass `--force`.
- **Edit wording without new art:** change `text` in `story.json`, then just
  re-run `build-lesson.js` + `render-pdf.ps1`.
- **Art style** lives in the `style` field — change it once to restyle a whole lesson.
- **The moral** lives in `story.json` → `moral` (`lesson` = the clear takeaway,
  `application` = the "For you" line for kids). It renders as the final page.
- **Rebuild everything** after a tooling change: `powershell -File rebuild-all.ps1`.
