# Swim with Coach James — Website

A fast, single-page marketing site with an easy **booking request form**, styled in a clean
black/white "performance lab" aesthetic (WHOOP-inspired) with a single violet accent.

Built as plain HTML/CSS/JS — **no build step, no dependencies**. It works by simply opening
the file or uploading the folder to any web host.

---

## 📁 What's in this folder

```
index.html      ← all the page content
styles.css      ← all the styling / design system
script.js       ← menu, animations, and the booking form logic
images/         ← swim photos used on the site
README.md       ← this file
.claude/        ← a tiny local preview server (safe to ignore or delete)
```

---

## 👀 Preview it on your computer

**Easiest:** double-click `index.html` — it opens in your browser. (Everything works except,
on some browsers, photos may need the option below.)

**With the included local server (recommended for an exact preview):**
1. Open PowerShell in this folder.
2. Run: `powershell -ExecutionPolicy Bypass -File .claude/preview-server.ps1`
3. Visit **http://localhost:5050** in your browser.
4. Press `Ctrl + C` in PowerShell to stop it.

---

## ✅ The 3 things to do before you go live

### 1. Set your real prices  *(important)*
Open **`index.html`**, search for `TODO COACH JAMES`. Right below it are the three session
cards. Change the prices — each is the text inside `<span class="price__num">$90</span>`
(and the `/ lesson` part next to it). Edit the bullet lists and descriptions to match what
you actually offer. The numbers in there now ($90 / $640 / $130) are **placeholders**.

### 2. Decide how bookings reach you
Right now the form **works out of the box**: when a visitor submits, it opens *their* email
app with a pre-filled message addressed to **Jabbazia99@gmail.com**. They just hit send.

**Recommended upgrade — get bookings delivered automatically (free):**
1. Sign up at **https://formspree.io** (free plan is fine).
2. Create a form; it gives you a URL like `https://formspree.io/f/abcd1234`.
3. Open **`script.js`**, find the line `formEndpoint: ""`, and paste your URL between the quotes:
   `formEndpoint: "https://formspree.io/f/abcd1234"`.

Now submissions are emailed to you instantly and silently — the visitor never has to open
their own email app. (If Formspree is ever down, it automatically falls back to the email-app
method, so you never lose a booking.)

### 3. Swap in your own photos *(optional)*
Your headshot (`coach-james.jpg`) is already in place in the "Meet your coach" section. The
remaining photos in `images/` are free stock swim photos (from Unsplash) used as placeholders —
replace them with your own anytime by dropping new images into `images/` using the **same filenames**:

| File | Where it shows |
|------|----------------|
| `coach-james.jpg` | "Meet your coach" — **your headshot (already added)** |
| `backyard-pool.jpg` | "At your own pool" card |
| `pool-dive.jpg` | "Confidence first" card |
| `swimmer-butterfly.jpg` | "Technique that lasts" card |
| `open-water.jpg` | Background of the closing "unforgettable summer" band |
| `swim-lanes.jpg` | Background of the "reach out directly" contact card |

Keep them roughly the same shape (the coach photo is tall/portrait; the rest are flexible).

---

## 🎨 Easy tweaks

- **Contact info:** in `index.html`, your email, Instagram, and LinkedIn are in the footer and
  the booking section. In `script.js`, `contactEmail` controls where the form sends.
- **Accent color:** the whole site uses one accent (violet `#4a53ff`). To match your blue
  flyer instead, open `styles.css` and change the single line `--accent: ...` near the top to,
  e.g., `--accent: #1f6fd6;`. Everything (buttons, badges, links) re-themes instantly.
- **Wording:** all headlines and text live in `index.html` — edit them directly.
- **Announcement bar:** the violet strip at the very top ("Now booking Summer 2026…") is the
  first block in `index.html`.

---

## 🚀 Publishing it (making it a real website)

Any static host works. Easiest options (all have free tiers):

- **Netlify Drop** — go to https://app.netlify.com/drop and drag this whole folder onto the page.
  You get a live link in seconds. (You can connect a custom domain like `swimwithcoachjames.com` later.)
- **GitHub Pages**, **Vercel**, **Cloudflare Pages** — also free and simple.
- **Your own web host** — upload the folder's contents via their file manager / FTP.

No server or database is required.

---

## Notes
- Stock photos are from **Unsplash** (free to use). Swapping in your own photos is encouraged.
- The site is fully responsive (looks good on phones, tablets, and desktops) and works without
  JavaScript for reading — JS only powers the menu, animations, and form convenience.
