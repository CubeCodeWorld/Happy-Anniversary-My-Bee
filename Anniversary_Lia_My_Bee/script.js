const song = document.getElementById("ourSong");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
const enterStory = document.getElementById("enterStory");
const jokeBtn = document.getElementById("numberJoke");
const jokeAnswer = document.getElementById("jokeAnswer");
const oneMoreThing = document.getElementById("oneMoreThing");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const backdrop = document.querySelector(".modal-backdrop");

let musicStarted = false;

function updateMusicUI() {
  const playing = !song.paused;
  musicToggle.classList.toggle("playing", playing);
  musicLabel.textContent = playing ? "Pause our song" : "Play our song";
}

async function playSongSoftly() {
  try {
    song.volume = 0.45;
    await song.play();
    musicStarted = true;
    updateMusicUI();
  } catch (e) {
    updateMusicUI();
  }
}

musicToggle.addEventListener("click", async () => {
  if (song.paused) {
    await playSongSoftly();
  } else {
    song.pause();
    updateMusicUI();
  }
});

enterStory.addEventListener("click", async () => {
  document.getElementById("story").scrollIntoView({ behavior: "smooth" });
  if (!musicStarted) await playSongSoftly();
});

jokeBtn.addEventListener("click", () => {
  jokeAnswer.textContent = '“Nmr Liaaa.” — ternyata iya, Bee. Dari sini semua mulai. 😭';
});

function openTheModal() {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeTheModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

oneMoreThing.addEventListener("click", openTheModal);
closeModal.addEventListener("click", closeTheModal);
backdrop.addEventListener("click", closeTheModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeTheModal();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Show hero immediately
setTimeout(() => {
  document.querySelector(".hero .reveal")?.classList.add("visible");
}, 180);
