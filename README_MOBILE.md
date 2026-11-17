# Friends Tourist — Mobile-Professional Version (v3)

## What this is
Your original static site from `v3-.zip`, made professional on mobile.
**No content was changed** — no text, phone number, email, link,
destination, rating, testimonial, price or image was edited, added
or removed.

## What was wrong before
1. **The zip had no `images/` folder at all.** Every photo on the
   site was a broken image (`images/bg_5.jpg`, `images/destination-1.jpg`,
   etc. were referenced in the HTML but missing from the zip).
   That is now fixed — see below.
2. The navbar container was fixed at `width: 1110px`, which forced
   horizontal scrolling on phones.
3. The hero used `background-attachment: fixed` (broken / jumpy on
   iOS Safari) and `main.js` set the hero height in pixels from
   `$(window).height()`, so the heading got cut when the mobile
   address bar showed / hid.
4. Section padding was `7em` top and bottom — far too tall on a phone.
5. The About image had `margin-top: -100px` and no height on phones,
   so it overlapped / collapsed when stacked.
6. Service icons were pulled `-35px` left, clipping on narrow screens.
7. Tap targets were too small (menu links, social icons, buttons),
   and iOS zoomed in on form fields because the font was under 16px.
8. The sticky WhatsApp / Call buttons could cover the footer text.
9. Testimonial cards had stacks of `<br>`s to equalise height on
   desktop — on phones that left huge blank gaps.
10. The destination carousel had no dots on mobile, so swiping
    wasn't discoverable.

## What was changed (only this)
| File | Change |
|---|---|
| `images/` (new folder) | **Restored from the images you uploaded separately — 52 files.** All 38 images referenced in the HTML are now present. 0 missing. The other 14 uploaded files (`about-21.jpg`, `about-22.jpg`, `about.jpg`, `bg_11.jpg`, `bg_12.jpg`, `bg_51.jpg`, `image_1.jpg`–`image_6.jpg`, `loc.png`, `logo.png`) are included too, even though no page references them yet. |
| `css/mobile.css` (new) | All mobile styling, loaded **after** `css/style.css`. Original `style.css` is untouched. See the comments inside the file for each fix. |
| `js/mobile.js` (new) | Clears the pixel hero height on phones (lets `92svh/92dvh` CSS take over), closes the mobile menu after a link is tapped, and turns on carousel dots on phones. Original `main.js` is untouched. |
| `index.html`, `about.html`, `contact.html`, `destination.html`, `destination1.html`, `destination2.html` | **Exactly 2 lines added per page:** one `<link>` to `css/mobile.css` and one `<script>` to `js/mobile.js`. Nothing else in these files was touched. Verified with `diff`. |
| `index - Copy.html` | **Left completely untouched** — it is an older duplicate of the home page (different heading / no testimonials update). If you want it mobile-fixed too, say so and I will patch it the same way. |
| `.DS_Store` files | Removed (Mac metadata, not site content). |

## How to use / deploy
Upload the **contents** of this folder (not the folder itself) to
your hosting root — the same place `index.html` lives now — so the
structure stays:

```
index.html
about.html
contact.html
destination.html
destination1.html
destination2.html
css/  (includes mobile.css)
js/   (includes mobile.js)
images/  (52 files — do not skip this folder)
fonts/
```

Keep `images/` next to `index.html`. If you upload only the HTML
files, the photos will break again.

## Tested
- All 38 image references resolve (0 missing).
- HTML diff vs original: only the 2 added lines per page.
- `js/mobile.js`: syntax-checked with Node.
- Mobile rules cover: 360px, 390px, 480px, 768px, 991px breakpoints,
  plus safe-area insets (notched phones) and `prefers-reduced-motion`.
- Desktop is unchanged: every mobile rule is inside a
  `max-width` media query, except the global `overflow-x: hidden`
  and background `cover/center` safeguards.

## If something still looks off on your phone
Tell me the phone model + which page, and a screenshot if you can —
the fix will go in `css/mobile.css` only, so your content stays safe.
