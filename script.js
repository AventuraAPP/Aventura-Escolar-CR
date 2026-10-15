const header = document.querySelector('.site-header');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 18), { passive: true });
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
  lightboxImage.src = item.dataset.src;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}));
const closeLightbox = () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); };
lightbox.querySelector('button').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });

const labTabs = document.querySelectorAll('.lab-tab');
const labPanels = document.querySelectorAll('.lab-panel');
labTabs.forEach(tab => tab.addEventListener('click', () => {
  labTabs.forEach(item => { item.classList.toggle('active', item === tab); item.setAttribute('aria-selected', item === tab); });
  labPanels.forEach(panel => { const active = panel.id === `${tab.dataset.lab}-panel`; panel.classList.toggle('active', active); panel.hidden = !active; });
}));

let xp = 0;
const addXp = amount => { xp += amount; document.querySelector('#xp-count').textContent = `${xp} XP`; };
const wheel = document.querySelector('#knowledge-wheel');
const wheelResult = document.querySelector('#wheel-result');
let rotation = 0;
const topics = ['¡Reto de Español! Completá una oración con la palabra correcta.', '¡Reto de Matemática! Resolvé una misión de números.', '¡Reto de Ciencias! Descubrí por qué sucede un fenómeno.', '¡Reto de Sociales! Viajá por la historia de Costa Rica.'];
document.querySelector('#spin-button').addEventListener('click', () => {
  const selected = Math.floor(Math.random() * topics.length);
  rotation += 1440 + selected * 90 + Math.floor(Math.random() * 55);
  wheel.style.transform = `rotate(${rotation}deg)`;
  wheelResult.textContent = 'La ruleta está buscando tu misión…';
  setTimeout(() => { wheelResult.textContent = topics[selected]; addXp(5); }, 3250);
});

const mythResult = document.querySelector('#myth-result');
document.querySelectorAll('.choice').forEach(choice => choice.addEventListener('click', () => {
  const correct = choice.dataset.answer === 'myth';
  document.querySelectorAll('.choice').forEach(item => item.classList.remove('correct', 'incorrect'));
  choice.classList.add(correct ? 'correct' : 'incorrect');
  mythResult.classList.toggle('good', correct);
  mythResult.innerHTML = correct ? '<b>¡Correcto! ✨</b><span>Es un mito: los rayos pueden caer varias veces en un mismo lugar, especialmente en puntos altos como torres o árboles.</span>' : '<b>¡Casi! Intentá otra vez.</b><span>Una pista: los lugares altos y conductores eléctricos reciben rayos con más frecuencia.</span>';
  if (correct) addXp(10);
}));

document.querySelector('#story-button').addEventListener('click', () => {
  const topic = document.querySelector('#story-topic').value.trim() || 'el aprendizaje';
  const characters = document.querySelector('#story-characters').value.trim() || 'dos exploradores curiosos';
  document.querySelector('#story-result').innerHTML = `<b>Una misión para imaginar ✨</b><p>Un día, ${characters} emprendieron una aventura para aprender sobre ${topic}. Entre pistas, preguntas y mucha curiosidad, descubrieron que pedir ayuda, pensar con calma y practicar transforma cualquier reto en una nueva habilidad.</p>`;
  addXp(10);
});
