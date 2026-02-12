const totalLights = 40;

const topLights = document.getElementById("lightsTop");
const bottomLights = document.getElementById("lightsBottom");

function createLights(container) {
  for (let i = 0; i < totalLights; i++) {
    const light = document.createElement("div");
    light.classList.add("light");
    container.appendChild(light);
  }
}

createLights(topLights);
createLights(bottomLights);

let toggle = true;

setInterval(() => {
  document.querySelectorAll(".light").forEach((light, index) => {
    if ((index % 2 === 0) === toggle) {
      light.style.opacity = "1";
      light.style.boxShadow = "0 0 15px #ffd966";
    } else {
      light.style.opacity = "0.3";
      light.style.boxShadow = "none";
    }
  });
  toggle = !toggle;
}, 400);

const stage = document.getElementById("stage");
const content = document.getElementById("content");
const rope = document.getElementById("rope");
const sound = document.getElementById("curtainSound");
const music = document.getElementById("siteMusic");


const spotlight = document.getElementById("spotlight");

let opened = false;

/* Start prelude automatically */
sound.loop = true;
sound.volume = 0.5;

window.addEventListener("click", () => {
    if (!opened && sound.paused) {
        sound.play();
    }
}, { once: true });

/* Spotlight follows mouse BEFORE opening */
stage.addEventListener("mousemove", (e) => {
    if (opened) return;

    const x = e.clientX;
    const y = e.clientY;

    spotlight.style.background = `
        radial-gradient(
            circle at ${x}px ${y}px,
            rgba(255, 240, 200, 0.3) 0%,
            rgba(0, 0, 0, 0.85) 60%
        )
    `;
});


/* Rope interaction */
rope.addEventListener("click", () => {
    if (opened) return;
    opened = true;
    sound.pause();

    rope.classList.add("pull");

    
    spotlight.style.background = "none"; 

    setTimeout(() => {
        music.currentTime = 0;
        music.play();

        stage.classList.add("open");
        content.classList.add("show");
    }, 600);

    setTimeout(() => {
        rope.classList.remove("pull");
    }, 600);
});

/* ===== CARROSSEL E A ROUPA ===== */
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-track img");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let index = 0;

function updateCarousel() {
  const slideWidth = slides[0].clientWidth;
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
});

/* opcional: autoplay */
setInterval(() => {
  index = (index + 1) % slides.length;
  updateCarousel();
}, 4000);

window.addEventListener("resize", updateCarousel);