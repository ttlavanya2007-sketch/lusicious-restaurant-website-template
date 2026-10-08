const nav = document.querySelector(".nav");
const menuBtn = document.querySelector(".menu-btn");

menuBtn?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

// Reveal sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (!entry.isIntersecting) return;
    entry.target.style.transitionDelay = `${Math.min(index * .05, .25)}s`;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, {threshold:.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Smooth parallax
const parallaxItems = document.querySelectorAll(".parallax");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  parallaxItems.forEach(item => {
    const speed = .055;
    const rect = item.getBoundingClientRect();
    const offset = rect.top + rect.height / 2 - innerHeight / 2;
    item.style.translate = `0 ${-offset * speed}px`;
  });
}, {passive:true});

// Tilt cards
document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("pointermove", e => {
    if (innerWidth < 900) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform =
      `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

// Magnetic buttons
document.querySelectorAll(".magnetic").forEach(button => {
  button.addEventListener("pointermove", e => {
    const r = button.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * .10;
    const y = (e.clientY - r.top - r.height / 2) * .10;
    button.style.transform = `translate(${x}px, ${y}px)`;
  });

  button.addEventListener("pointerleave", () => {
    button.style.transform = "";
  });
});

// Desktop cursor
const cursor = document.querySelector(".cursor");
window.addEventListener("pointermove", e => {
  if (matchMedia("(pointer: coarse)").matches) return;
  cursor.style.opacity = "1";
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.querySelectorAll("a,button").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "35px";
    cursor.style.height = "35px";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.width = "22px";
    cursor.style.height = "22px";
  });
});

// Add visitor reviews to the page immediately
document.getElementById("reviewForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("reviewName").value.trim();
  const rating = Number(document.getElementById("reviewRating").value);
  const reviewText = document.getElementById("reviewText").value.trim();
  const liveReviews = document.getElementById("liveReviews");

  if (!name || !rating || !reviewText || !liveReviews) return;

  const card = document.createElement("article");
  card.className = "live-review";

  const stars = "★★★★★".slice(0, rating) + "☆☆☆☆☆".slice(0, 5 - rating);

  const starsEl = document.createElement("div");
  starsEl.className = "stars";
  starsEl.textContent = stars;

  const textEl = document.createElement("p");
  textEl.textContent = `“${reviewText}”`;

  const nameEl = document.createElement("strong");
  nameEl.textContent = name;

  card.append(starsEl, textEl, nameEl);
  liveReviews.prepend(card);

  e.target.reset();
});