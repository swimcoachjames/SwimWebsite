/* =========================================================
   SWIM WITH COACH JAMES — interactions + booking form
   ========================================================= */

/* -------- CONFIG — Coach James, edit these two lines -------- */
const CONFIG = {
  // OPTIONAL: paste your Formspree endpoint to receive bookings instantly by email
  // without opening the visitor's email app. e.g. "https://formspree.io/f/abcd1234".
  // 1) Make a free account at https://formspree.io  2) Create a form  3) Paste its URL here.
  // Leave it as "" and the form will open the visitor's email app pre-filled to you instead.
  formEndpoint: "https://formspree.io/f/mvzjgqwl",
  contactEmail: "Jabbazia99@gmail.com"
};
/* ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");
  const hero = document.querySelector(".hero");
  const floatbook = document.getElementById("floatbook");

  /* ---- Nav: swap to solid bar once past the hero ---- */
  const onScroll = () => {
    const trigger = (hero ? hero.offsetHeight : 600) - 90;
    const past = window.scrollY > trigger;
    nav.classList.toggle("scrolled", past);
    if (floatbook) floatbook.classList.toggle("show", past);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  const setMenu = (open) => {
    menu.hidden = !open;
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setMenu(menu.hidden));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) setMenu(false); });

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in-view"); io.unobserve(en.target); }
      });
    }, { threshold: 0.14 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in-view"));
  }

  /* ---- Pricing buttons pre-select the session type in the form ---- */
  const typeSelect = document.getElementById("f-type");
  document.querySelectorAll("[data-prefill]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-prefill");
      if (typeSelect && [...typeSelect.options].some((o) => o.value === val)) {
        typeSelect.value = val;
      }
    });
  });

  /* ---- Footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Booking form ---- */
  const form = document.getElementById("bookform");
  const errorEl = document.getElementById("bookError");
  const successEl = document.getElementById("bookSuccess");
  const submitBtn = document.getElementById("bookSubmit");

  const showError = (msg) => { errorEl.textContent = msg; errorEl.hidden = false; };
  const clearError = () => { errorEl.hidden = true; };

  const fieldLabels = {
    name: "Name", email: "Email", phone: "Phone", swimmer: "Swimmer name(s)",
    age: "Swimmer age(s)", level: "Swim level", session_type: "Session type",
    location: "Lesson location", start_date: "Preferred start date",
    availability: "Preferred days & times", goals: "Goals / notes"
  };

  const collect = () => {
    const fd = new FormData(form);
    const data = {};
    fd.forEach((v, k) => { data[k] = (v || "").toString().trim(); });
    return data;
  };

  const buildEmailBody = (d) => {
    const lines = ["New swim lesson booking request", "--------------------------------"];
    Object.keys(fieldLabels).forEach((k) => {
      if (d[k]) lines.push(`${fieldLabels[k]}: ${d[k]}`);
    });
    lines.push("", "Sent from swimwithcoachjames website.");
    return lines.join("\n");
  };

  const goSuccess = () => {
    form.hidden = true;
    successEl.hidden = false;
    successEl.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  /* mailto fallback — always works, no setup required */
  const sendViaEmailApp = (d) => {
    const subject = `Swim Lesson Booking — ${d.name || "New request"}`;
    const href = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildEmailBody(d))}`;
    window.location.href = href;
    goSuccess();
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError();

    // Basic required-field validation
    const required = ["name", "email", "swimmer", "age", "location"];
    const data = collect();
    const missing = required.filter((k) => !data[k]);
    if (missing.length) {
      showError(`Please fill in: ${missing.map((k) => fieldLabels[k]).join(", ")}.`);
      const first = form.querySelector(`[name="${missing[0]}"]`);
      if (first) first.focus();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      showError("Please enter a valid email address.");
      form.querySelector('[name="email"]').focus();
      return;
    }

    // If no Formspree endpoint is configured, use the email-app fallback.
    if (!CONFIG.formEndpoint) { sendViaEmailApp(data); return; }

    // Otherwise submit to Formspree via AJAX for instant, seamless delivery.
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      });
      if (res.ok) { goSuccess(); }
      else { sendViaEmailApp(data); }   // graceful fallback if the service errors
    } catch (err) {
      sendViaEmailApp(data);            // offline / network error -> email app
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send booking request";
    }
  });
});
