// Valores (variables) — puedes cambiarlos desde aquí o mediante los botones
const defaults = { happiness: 80, life: 100, hunger: 30, clean: 85 };
const caps = { min: 0, max: 100 };

// Decaimiento por segundo (puedes ajustarlo)
const decay = { happiness: 0.02, life: 0.003, hunger: 0.04, clean: 0.015 };

// Carga / guarda
const STORAGE_KEY = 'mascota_virtual_v1';

let state = loadState() || createStateFrom(defaults);

// Elementos
const petEl = document.getElementById('pet');
const petMsg = document.getElementById('petMsg');
const lastAction = document.getElementById('lastAction');
const savedAt = document.getElementById('savedAt');

const barHappiness = document.getElementById('barHappiness');
const barLife = document.getElementById('barLife');
const barHunger = document.getElementById('barHunger');
const barClean = document.getElementById('barClean');

const valHappiness = document.getElementById('valHappiness');
const valLife = document.getElementById('valLife');
const valHunger = document.getElementById('valHunger');
const valClean = document.getElementById('valClean');

const btnPlay = document.getElementById('btnPlay');
const btnFeed = document.getElementById('btnFeed');
const btnClean = document.getElementById('btnClean');
const btnHeal = document.getElementById('btnHeal');

const lowWarnings = document.getElementById('lowWarnings');

// Actualiza UI
function render(){
  setBar(barHappiness, state.happiness);
  setBar(barLife, state.life);
  setBar(barHunger, state.hunger);
  setBar(barClean, state.clean);

  valHappiness.textContent = Math.round(state.happiness);
  valLife.textContent = Math.round(state.life);
  valHunger.textContent = Math.round(state.hunger);
  valClean.textContent = Math.round(state.clean);

  savedAt.textContent = state.savedAt ? new Date(state.savedAt).toLocaleString() : '—';

  // Cambia la emoji según estados
  petEl.classList.remove('bounce');
  void petEl.offsetWidth; // reflow para reiniciar animación
  petEl.classList.add('bounce');

  petEl.textContent = chooseEmoji();

  // Color de números en rojo si están bajos
  valHunger.className = state.hunger < 20 ? 'danger' : '';
  valClean.className = state.clean < 20 ? 'danger' : '';
  valHappiness.className = state.happiness < 20 ? 'danger' : '';
  valLife.className = state.life < 20 ? 'danger' : '';
}

function setBar(el, value){ el.style.width = clamp(value, caps.min, caps.max) + '%'; }

function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

function chooseEmoji(){
  // Prioriza vida: si vida baja -> enfermo
  if(state.life <= 0) return '💀';
  if(state.life < 30) return '🤒';
  if(state.hunger < 15) return '😿';
  if(state.clean < 10) return '🤢';
  if(state.happiness > 75) return '😸';
  if(state.happiness > 40) return '😺';
  return '😐';
}

// Simula el paso del tiempo: decaimiento
let lastTick = Date.now();
function tick(){
  const now = Date.now();
  const dt = (now - lastTick) / 1000; // segundos
  lastTick = now;

  // Aplica decaimiento proporcional al tiempo transcurrido
  state.happiness = clamp(state.happiness - decay.happiness * dt * 60, caps.min, caps.max);
  state.life = clamp(state.life - decay.life * dt * 60, caps.min, caps.max);
  state.hunger = clamp(state.hunger - decay.hunger * dt * 60, caps.min, caps.max); // el hambre sube
  state.clean = clamp(state.clean - decay.clean * dt * 60, caps.min, caps.max);

  // Si hambre muy alta -> reduce vida y felicidad
  if(state.hunger < 25){ state.life -= 0.02 * dt * 60; state.happiness -= 0.03 * dt * 60; }

  // Guarda periódicamente
  if(now - (state._lastSaved || 0) > 5000){ saveState(); }

  render();
  requestAnimationFrame(tick);
}

// Interacciones
btnPlay.addEventListener('click', ()=>{
  state.happiness = clamp(state.happiness + 18, caps.min, caps.max);
  state.hunger = clamp(state.hunger - 6, caps.min, caps.max);
  state.clean = clamp(state.clean - 3, caps.min, caps.max);
  state.lastAction = 'Jugaste con tu mascota';
  flashMsg('');
  saveState();
});

btnFeed.addEventListener('click', ()=>{
  state.hunger = clamp(state.hunger + 30, caps.min, caps.max);
  state.happiness = clamp(state.happiness + 6, caps.min, caps.max);
  state.lastAction = 'Le diste de comer';
  flashMsg('');
  saveState();
});

btnClean.addEventListener('click', ()=>{
  state.clean = clamp(state.clean + 35, caps.min, caps.max);
  state.happiness = clamp(state.happiness + 4, caps.min, caps.max);
  state.lastAction = 'Lo limpiaste';
  flashMsg('');
  saveState();
});

btnHeal.addEventListener('click', ()=>{
  state.life = clamp(state.life + 25, caps.min, caps.max);
  state.happiness = clamp(state.happiness + 2, caps.min, caps.max);
  state.lastAction = 'Le diste medicina';
  flashMsg('');
  saveState();
});

// Mensaje flotante temporal
function flashMsg(text, time=1200){
  petMsg.textContent = text;
  petMsg.style.opacity = '1';
  setTimeout(()=>{ petMsg.style.opacity = '0'; petMsg.textContent = ''; }, time);
}

function saveState(){
  state.savedAt = Date.now();
  state._lastSaved = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  savedAt.textContent = new Date(state.savedAt).toLocaleString();
  lastAction.textContent = state.lastAction || '—';
}

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return null;
    const parsed = JSON.parse(raw);
    // Normaliza
    parsed.happiness = Number(parsed.happiness) || 0;
    parsed.life = Number(parsed.life) || 0;
    parsed.hunger = Number(parsed.hunger) || 0;
    parsed.clean = Number(parsed.clean) || 0;
    return parsed;
  }catch(e){ console.warn('No se pudo cargar estado', e); return null; }
}

function createStateFrom(obj){
  return {
    happiness: obj.happiness || 50,
    life: obj.life || 100,
    hunger: obj.hunger || 50,
    clean: obj.clean || 50,
    lastAction: 'Iniciado',
    savedAt: null
  };
}

// Inicia
render();
requestAnimationFrame(()=>{ lastTick = Date.now(); tick(); });

// Guardado manual antes de cerrar
window.addEventListener('beforeunload', ()=>{ saveState(); });

// Atajos de teclado (opcional)
window.addEventListener('keydown', (e)=>{
  if(e.key === '1') btnPlay.click();
  if(e.key === '2') btnFeed.click();
  if(e.key === '3') btnClean.click();
  if(e.key === '4') btnHeal.click();
});

// Exponer estado en consola para pruebas (es variable JS)
window.mascota = state;

lastAction