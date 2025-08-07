// Timer: how long the user is on the page
let start = Date.now();
function pad(n){ return n.toString().padStart(2,'0'); }

function updateTimer() {
  const elapsed = Math.floor((Date.now() - start) / 1000); // sec
  const days = Math.floor(elapsed / 86400);
  const hours = Math.floor((elapsed % 86400) / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = pad(hours);
  document.getElementById('minutes').textContent = pad(minutes);
  document.getElementById('seconds').textContent = pad(seconds);
}
setInterval(updateTimer, 1000);
updateTimer();

// Meme rotator
const MEMES = [
  "на богатом ✨",
  "день 1 без подписки: держусь 🥲",
  "когда GPT-5: код сам себя пишет",
  "«ещё мем» — и жизнь заиграла",
  "fps +20 за стиль",
  "мама, я в стартапе",
  "стоп, это не баг — это фича",
  "тут будет ваша реклама на Таймс-сквер",
  "я тигр, а ты? 🐅",
  "пока они спорят — мы строим",
  "кнопка не для кнопки, а для души",
  "standoff 2 > реальность (ну почти)",
  "помни: главное — вайб",
  "99 проблем, но дизайн не одна",
  "новая цель: 10000 сек на этом сайте"
];
const memeText = document.getElementById('meme-text');
const memeCard = document.getElementById('meme-card');
const nextBtn = document.getElementById('next-meme');

function randomMeme(){
  const txt = MEMES[Math.floor(Math.random()*MEMES.length)];
  memeText.textContent = txt;
  // fun pulse
  memeCard.animate([
    { transform: 'scale(1.0)' },
    { transform: 'scale(1.03)' },
    { transform: 'scale(1.0)' }
  ], { duration: 300, easing: 'ease-out' });
  // random bg flare
  const hue = Math.floor(Math.random() * 360);
  memeCard.style.background = `linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05)), radial-gradient(600px 300px at 20% 20%, hsla(${hue},90%,60%,0.25), transparent 60%)`;
}
nextBtn.addEventListener('click', randomMeme);
setInterval(randomMeme, 2500);
randomMeme();

// Standoff hours -> conversions
const hoursInput = document.getElementById('st-hours');
const saveBtn = document.getElementById('save-hours');
const rHours = document.getElementById('r-hours');
const rDays = document.getElementById('r-days');
const rMin = document.getElementById('r-min');
const rSec = document.getElementById('r-sec');

function renderHours(h) {
  const hours = Math.max(0, Math.floor(h || 0));
  const days = Math.floor(hours / 24);
  const minutes = hours * 60;
  const seconds = hours * 3600;

  rHours.textContent = hours.toLocaleString('ru-RU');
  rDays.textContent = days.toLocaleString('ru-RU');
  rMin.textContent = minutes.toLocaleString('ru-RU');
  rSec.textContent = seconds.toLocaleString('ru-RU');
}

function loadHours() {
  const saved = localStorage.getItem('standoff_hours');
  const h = saved ? parseInt(saved, 10) : 1931;
  hoursInput.value = h || "";
  renderHours(h);
}
function saveHours() {
  const value = parseInt(hoursInput.value || "0", 10);
  localStorage.setItem('standoff_hours', String(Math.max(0, value)));
  renderHours(value);
  saveBtn.textContent = "сохранено";
  setTimeout(()=> saveBtn.textContent = "сохранить", 900);
}
saveBtn.addEventListener('click', saveHours);
hoursInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') saveHours();
});

loadHours();
