// --- Card flip + yes interaction ---
const card = document.getElementById("card");
const flipBtn = document.getElementById("flipBtn");
const yesBtn = document.getElementById("yesBtn");
const backContent = document.getElementById("backContent");

flipBtn.addEventListener("click", () => {
  card.classList.add("is-flipped");
});

yesBtn.addEventListener("click", () => {
  backContent.innerHTML = `
    <p class="kicker">💖</p>
    <h2 class="title">Yay!!</h2>
    <p class="note">
      You just made me ridiculously happy.
      I love you, Dina — happy Valentine’s Day ❤️
    </p>
    <p class="fine">Now come here so I can kiss you.</p>
  `;
});

// --- Floating hearts generator ---
const heartsLayer = document.querySelector(".hearts");

function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";

  const size = rand(14, 34); // px
  const x = rand(0, 100);    // vw %
  const duration = rand(7, 13); // seconds
  const opacity = rand(0.18, 0.38);
  const drift = rand(-30, 30) + "px";

  heart.style.setProperty("--s", size + "px");
  heart.style.setProperty("--x", x + "vw");
  heart.style.setProperty("--d", duration + "s");
  heart.style.setProperty("--o", opacity);
  heart.style.setProperty("--drift", drift);

  heartsLayer.appendChild(heart);

  // clean up after animation finishes
  setTimeout(() => heart.remove(), duration * 1000);
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// spawn a few immediately for instant vibe
for (let i = 0; i < 12; i++) setTimeout(spawnHeart, i * 250);

// then keep spawning
setInterval(spawnHeart, 450);
