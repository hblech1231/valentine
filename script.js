/*******************************
 * 1) HTML TEMPLATES (re-usable)
 *******************************/
const originalQuestionHTML = `
  <p class="kicker">One question</p>
  <h2 class="title">Will you be my Valentine?</h2>

  <div class="actions">
    <button class="btn btn--yes" id="yesBtn" type="button">Yes 💘</button>
    <button class="btn btn--no" id="noBtn" type="button">No 🙈</button>
  </div>

  <p class="fine">P.S. You already are… but I still wanted to ask properly.</p>
`;

const yesResultHTML = `
  <p class="kicker">💖</p>
  <h2 class="title">Hooray!!</h2>
  <p class="note">
    You just made me big big happy just like you always do!
  </p>
  <p class="note">
    I love you, Dina, happy Valentine’s Day ❤️
  </p>
  <p class="fine">You're my forever princess</p>
`;

const noResultHTML = `
  <p class="kicker">😅</p>
  <h2 class="title">Oops…</h2>
  <p class="note">
    I think you may have hit the wrong button.
    That one can be tricky sometimes.
  </p>

  <button class="btn btn--primary" id="retryBtn" type="button">
    Try again 💕
  </button>
`;


/*******************************
 * 2) DOM REFERENCES (static)
 *******************************/
const card = document.getElementById("card");
const flipBtn = document.getElementById("flipBtn");
const backContent = document.getElementById("backContent");
const heartsLayer = document.querySelector(".hearts");


/*******************************
 * 3) UTILS
 *******************************/
function rand(min, max) {
  return Math.random() * (max - min) + min;
}


/*******************************
 * 4) HEART BURST (on YES click)
 *******************************/
function heartBurst(x, y, count = 16) {
  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "burst-heart";

    // sizing + motion tuning
    const size = rand(10, 18);        // px
    const duration = rand(650, 1050); // ms
    const angle = rand(0, Math.PI * 2);
    const dist = rand(60, 140);

    const dx = Math.cos(angle) * dist + "px";
    const dy = Math.sin(angle) * dist + "px";

    // CSS variables for animation
    h.style.setProperty("--bs", size + "px");
    h.style.setProperty("--bd", duration + "ms");
    h.style.setProperty("--dx", dx);
    h.style.setProperty("--dy", dy);

    // spawn at click position
    h.style.left = x + "px";
    h.style.top = y + "px";

    document.body.appendChild(h);

    // cleanup
    setTimeout(() => h.remove(), duration + 50);
  }
}


/*******************************
 * 5) BACK-SIDE INTERACTIONS
 *    - We re-render HTML often,
 *      so we must re-bind events.
 *******************************/
function bindBackSideButtons() {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const retryBtn = document.getElementById("retryBtn");

  // YES button -> burst + final message
  if (yesBtn) {
    yesBtn.addEventListener("click", (e) => {
      // burst from center of button
      const r = e.currentTarget.getBoundingClientRect();
      heartBurst(r.left + r.width / 2, r.top + r.height / 2, 18);

      // show final message
      backContent.innerHTML = yesResultHTML;
    });
  }

  // NO button -> playful "wrong button" message
  if (noBtn) {
    noBtn.addEventListener("click", () => {
      backContent.innerHTML = noResultHTML;

      // after we swap HTML, we need to bind retry
      bindBackSideButtons();
    });

    // NO button dodge behavior (desktop + mobile)
    const dodge = () => {
      const x = rand(-180, 180); // farther = more evasive
      const y = rand(-120, 120);
      noBtn.style.transform = `translate(${x}px, ${y}px)`;
    };

    ["mouseenter", "touchstart"].forEach((evt) => {
      noBtn.addEventListener(evt, dodge, { passive: true });
    });
  }

  // RETRY button -> restore question state
  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      backContent.innerHTML = originalQuestionHTML;
      bindBackSideButtons();
    });
  }
}


/*******************************
 * 6) CARD FLIP
 *******************************/
flipBtn.addEventListener("click", () => {
  // flip to back
  card.classList.add("is-flipped");

  // ensure back side buttons work (in case user flips immediately)
  bindBackSideButtons();
});


/*******************************
 * 7) FLOATING HEARTS BACKGROUND
 *******************************/
function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";

  const size = rand(14, 34);     // px
  const x = rand(0, 100);        // vw %
  const duration = rand(7, 13);  // seconds
  const opacity = rand(0.18, 0.38);
  const drift = rand(-30, 30) + "px";

  heart.style.setProperty("--s", size + "px");
  heart.style.setProperty("--x", x + "vw");
  heart.style.setProperty("--d", duration + "s");
  heart.style.setProperty("--o", opacity);
  heart.style.setProperty("--drift", drift);

  heartsLayer.appendChild(heart);

  // cleanup after animation finishes
  setTimeout(() => heart.remove(), duration * 1000);
}

// instant vibe
for (let i = 0; i < 12; i++) setTimeout(spawnHeart, i * 250);

// steady stream
setInterval(spawnHeart, 450);


/*******************************
 * 8) INITIAL BIND (optional)
 *    - If the back already has
 *      buttons in the DOM on load.
 *******************************/
bindBackSideButtons();
