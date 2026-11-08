/**
 * ==============================================================================
 * MODULE 1: MUSIC THEORY & CHROMATIC REFERENCE
 * ==============================================================================
 */
const BASE_PITCHES = {
  'L': { midi: 62, note: "D4",  color: "var(--btn-l)", hex: [100, 116, 139] },
  'R': { midi: 65, note: "F4",  color: "var(--btn-r)", hex: [100, 116, 139] },
  'A': { midi: 69, note: "A4",  color: "var(--btn-a)", hex: [59, 130, 246] },
  'Y': { midi: 71, note: "B4",  color: "var(--btn-y)", hex: [16, 185, 129] },
  'X': { midi: 74, note: "D5",  color: "var(--btn-x)", hex: [6, 182, 212] }
};

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function midiToName(midi) {
  const rounded = Math.round(midi);
  const oct = Math.floor(rounded / 12) - 1;
  return `${NOTE_NAMES[((rounded % 12) + 12) % 12]}${oct}`;
}

function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

const CHROMATIC_GUIDE = [
  { pitch: "B3",        midi: 59, btn: "L", notation: "L+b+vv", mod: "Stick Down (Full) + D-Pad Down", alt: "---",                          altNotation: "---",    sY: 1.0,  dpad: -1, stickDir: "down-full" },
  { pitch: "C4",        midi: 60, btn: "L", notation: "L+vv",   mod: "Stick Down (Full)",              alt: "---",                          altNotation: "---",    sY: 1.0,  dpad: 0,  stickDir: "down-full" },
  { pitch: "C#4 / Db4", midi: 61, btn: "L", notation: "L+b",    mod: "D-Pad Down",                     alt: "---",                          altNotation: "---",    sY: 0,    dpad: -1, stickDir: null },
  { pitch: "D4",        midi: 62, btn: "L", notation: "L",      mod: "(Base Note)",                    alt: "---",                          altNotation: "---",    sY: 0,    dpad: 0,  stickDir: null },
  { pitch: "D#4 / Eb4", midi: 63, btn: "L", notation: "L+#",    mod: "D-Pad Up",                       alt: "R + Stick Down (Full)",        altNotation: "R+vv",   sY: 0,    dpad: 1,  stickDir: null },
  { pitch: "E4",        midi: 64, btn: "R", notation: "R+b",    mod: "D-Pad Down",                     alt: "L + Stick Up (Full)",          altNotation: "L+^^",   sY: 0,    dpad: -1, stickDir: null },
  { pitch: "F4",        midi: 65, btn: "R", notation: "R",      mod: "(Base Note)",                    alt: "---",                          altNotation: "---",    sY: 0,    dpad: 0,  stickDir: null },
  { pitch: "F#4 / Gb4", midi: 66, btn: "R", notation: "R+#",    mod: "D-Pad Up",                       alt: "---",                          altNotation: "---",    sY: 0,    dpad: 1,  stickDir: null },
  { pitch: "G4",        midi: 67, btn: "R", notation: "R+^^",   mod: "Stick Up (Full)",                alt: "A + Stick Down (Full)",        altNotation: "A+vv",   sY: -1.0, dpad: 0,  stickDir: "up-full" },
  { pitch: "G#4 / Ab4", midi: 68, btn: "A", notation: "A+b",    mod: "D-Pad Down",                     alt: "R + Stick Up (Full) + D-Pad Up", altNotation: "R+#+^^", sY: 0,  dpad: -1, stickDir: null },
  { pitch: "A4",        midi: 69, btn: "A", notation: "A",      mod: "(Base Note)",                    alt: "---",                          altNotation: "---",    sY: 0,    dpad: 0,  stickDir: null },
  { pitch: "A#4 / Bb4", midi: 70, btn: "A", notation: "A+#",    mod: "D-Pad Up",                       alt: "Y + D-Pad Down",               altNotation: "Y+b",    sY: 0,    dpad: 1,  stickDir: null },
  { pitch: "B4",        midi: 71, btn: "Y", notation: "Y",      mod: "(Base Note)",                    alt: "---",                          altNotation: "---",    sY: 0,    dpad: 0,  stickDir: null },
  { pitch: "C5",        midi: 72, btn: "Y", notation: "Y+#",    mod: "D-Pad Up",                       alt: "X + Stick Down (Full)",        altNotation: "X+vv",   sY: 0,    dpad: 1,  stickDir: null },
  { pitch: "C#5 / Db5", midi: 73, btn: "X", notation: "X+b",    mod: "D-Pad Down",                     alt: "Y + Stick Up (Full)",          altNotation: "Y+^^",   sY: 0,    dpad: -1, stickDir: null },
  { pitch: "D5",        midi: 74, btn: "X", notation: "X",      mod: "(Base Note)",                    alt: "---",                          altNotation: "---",    sY: 0,    dpad: 0,  stickDir: null },
  { pitch: "D#5 / Eb5", midi: 75, btn: "X", notation: "X+#",    mod: "D-Pad Up",                       alt: "---",                          altNotation: "---",    sY: 0,    dpad: 1,  stickDir: null },
  { pitch: "E5",        midi: 76, btn: "X", notation: "X+^^",   mod: "Stick Up (Full)",                alt: "---",                          altNotation: "---",    sY: -1.0, dpad: 0,  stickDir: "up-full" },
  { pitch: "F5",        midi: 77, btn: "X", notation: "X+#+^^", mod: "Stick Up (Full) + D-Pad Up",     alt: "---",                          altNotation: "---",    sY: -1.0, dpad: 1,  stickDir: "up-full" }
];

function getDpadSvg(direction = 'up', size = 20) {
  const isUp = direction === 'up';
  const upColor = isUp ? '#facc15' : '#334155';
  const downColor = !isUp ? '#facc15' : '#334155';
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" style="vertical-align:middle; filter:drop-shadow(0 1px 2px rgba(0,0,0,0.35)); pointer-events:none;">
    <rect x="8" y="1" width="8" height="22" rx="2" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
    <rect x="1" y="8" width="22" height="8" rx="2" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
    <rect x="8.5" y="1.5" width="7" height="7" rx="1.2" fill="${upColor}"/>
    ${isUp ? '<polygon points="12,2.8 9.5,6.5 14.5,6.5" fill="#713f12"/>' : ''}
    <rect x="8.5" y="15.5" width="7" height="7" rx="1.2" fill="${downColor}"/>
    ${!isUp ? '<polygon points="12,21.2 9.5,17.5 14.5,17.5" fill="#713f12"/>' : ''}
    <circle cx="12" cy="12" r="1.5" fill="#64748b"/>
  </svg>`;
}

function getStickSvg(direction = 'up', intensity = 'full', size = 20) {
  let nubY = 12;
  let nubColor = "#06b6d4";
  let strokeColor = "#38bdf8";
  let glyph = "";

  if (direction === 'up') {
    nubY = (intensity === 'full') ? 6 : 8.5;
    glyph = '<polygon points="12,3.8 9.2,7.2 14.8,7.2" fill="#ffffff"/>';
  } else if (direction === 'down') {
    nubY = (intensity === 'full') ? 18 : 15.5;
    glyph = '<polygon points="12,20.2 9.2,16.8 14.8,16.8" fill="#ffffff"/>';
  } else if (direction === 'vibrato') {
    nubColor = "#a855f7";
    strokeColor = "#e9d5ff";
    glyph = '<path d="M 7 12 Q 9.5 9 12 12 T 17 12" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>';
  }

  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" style="vertical-align:middle; filter:drop-shadow(0 1px 2px rgba(0,0,0,0.35)); pointer-events:none;">
    <circle cx="12" cy="12" r="10.5" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
    <circle cx="12" cy="${nubY}" r="5.5" fill="${nubColor}" stroke="${strokeColor}" stroke-width="1.2"/>
    ${glyph}
  </svg>`;
}

function appendNoteFromTable(notation, pitch) {
  const cInput = document.getElementById('text-notes-input');
  const rInput = document.getElementById('raw-notes-input');
  const cVal = cInput.value.trim();
  const rVal = rInput.value.trim();
  cInput.value = cVal ? `${cVal}, ${notation}:0.38` : `${notation}:0.38`;
  rInput.value = rVal ? `${rVal}, ${pitch}:0.38` : `${pitch}:0.38`;
  loadFromTextInput(false);
  saveToLocalStorage();
}

function populateFingeringTable() {
  const tbody = document.getElementById('fingering-table-body');
  tbody.innerHTML = "";
  CHROMATIC_GUIDE.forEach(item => {
    const tr = document.createElement('tr');
    const bg = BASE_PITCHES[item.btn]?.color || "#334155";
    let icons = [];
    if (item.dpad === 1) icons.push(getDpadSvg('up', 16));
    if (item.dpad === -1) icons.push(getDpadSvg('down', 16));
    if (item.sY < 0) icons.push(getStickSvg('up', 'full', 16));
    if (item.sY > 0) icons.push(getStickSvg('down', 'full', 16));
    const iconHtml = icons.length ? `<span style="display:inline-flex; gap:3px; margin:0 3px; vertical-align:middle;">${icons.join('')}</span>` : '';

    const altDisplay = item.alt !== "---" 
      ? `<span>${item.alt}</span> <code class="notation-code alt-notation">${item.altNotation}</code>`
      : `<span style="color:#64748b;">---</span>`;

    const pitchName = item.pitch.split('/')[0].trim();

    tr.innerHTML = `
      <td style="font-weight:700; color:#fff; font-size:13.5px;">${item.pitch}</td>
      <td><code class="notation-code">${item.notation}</code></td>
      <td><span class="pill" style="background:${bg}">${item.btn}</span> ${iconHtml} + ${item.mod}</td>
      <td style="color:#cbd5e1; font-size:12.5px;">${altDisplay}</td>
      <td style="text-align:center;">
        <button class="btn-preset" style="padding:4px 8px; color:var(--gold-highlight); font-weight:700;" title="Append note to sequence" onclick="event.stopPropagation(); appendNoteFromTable('${item.notation}', '${pitchName}')">+ Add</button>
      </td>
    `;
    tr.onclick = () => {
      startNote(item.midi);
      const mock = { L: false, R: false, A: false, X: false, Y: false, dUp: item.dpad === 1, dDown: item.dpad === -1, stickX: 0, stickY: item.sY, vibrato: false };
      mock[item.btn] = true;
      updateControllerSVG(mock);
      document.getElementById('mon-pitch').innerText = pitchName;
      document.getElementById('mon-detune').innerText = `${Math.round(-item.sY * 200 + item.dpad * 100)} cents`;
      setTimeout(() => {
        stopNote();
        updateControllerSVG({ L: false, R: false, A: false, X: false, Y: false, dUp: false, dDown: false, stickX: 0, stickY: 0, vibrato: false });
      }, 550);
    };
    tbody.appendChild(tr);
  });
}
window.addEventListener('DOMContentLoaded', populateFingeringTable);

/**
 * ==============================================================================
 * MODULE 2: AUDIO ENGINE (SoundFont Sampled Ocarina + Dual Synth Fallback)
 * ==============================================================================
 */
const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let soundfontInstrument = null;
let activeSoundfontNode = null;
let vibratoLfo = null;
let vibratoGain = null;
let fallbackOsc = null;
let fallbackSubOsc = null;
let fallbackGain = null;

function initAudio() {
  if (!audioCtx) audioCtx = new AudioCtxClass();
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function loadSoundfont() {
  initAudio();
  if (window.Soundfont) {
    Soundfont.instrument(audioCtx, 'ocarina', { soundfont: 'FluidR3_GM' })
      .then(inst => {
        soundfontInstrument = inst;
        document.getElementById('midi-status').innerHTML = `<span class="badge badge-connected">MIDI: Ocarina (Ready)</span>`;
      })
      .catch(err => {
        console.warn("Soundfont fallback active:", err);
        document.getElementById('midi-status').innerHTML = `<span class="badge" style="background:#854d0e;color:#fef08a;">WebAudio Synth Active</span>`;
      });
  }
}
window.addEventListener('load', loadSoundfont);
window.addEventListener('pointerdown', () => { if (!audioCtx) initAudio(); }, { once: true });

function setNoteVibrato(enable) {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  if (enable) {
    if (vibratoLfo) return;
    const hasSfDetune = activeSoundfontNode && activeSoundfontNode.source && activeSoundfontNode.source.detune;
    const hasFallback = fallbackOsc && fallbackSubOsc;
    if (!hasSfDetune && !hasFallback) return;

    vibratoLfo = audioCtx.createOscillator();
    vibratoLfo.frequency.setValueAtTime(5.6, now);
    vibratoGain = audioCtx.createGain();
    vibratoGain.gain.setValueAtTime(32, now);
    vibratoLfo.connect(vibratoGain);

    if (hasSfDetune) vibratoGain.connect(activeSoundfontNode.source.detune);
    if (hasFallback) {
      vibratoGain.connect(fallbackOsc.detune);
      vibratoGain.connect(fallbackSubOsc.detune);
    }
    vibratoLfo.start(now);
  } else {
    if (vibratoLfo) {
      try { vibratoLfo.stop(); } catch(e) {}
      try { vibratoGain.disconnect(); } catch(e) {}
      vibratoLfo = null;
      vibratoGain = null;
    }
  }
}

function startNote(midiNumber, initialDetuneCents = 0, hasVibrato = false) {
  initAudio();
  stopNote();
  const now = audioCtx.currentTime;

  if (soundfontInstrument) {
    activeSoundfontNode = soundfontInstrument.play(midiNumber, now, { gain: 1.4, loop: true });
    if (activeSoundfontNode && activeSoundfontNode.source && activeSoundfontNode.source.detune) {
      activeSoundfontNode.source.detune.setValueAtTime(initialDetuneCents, now);
    }
  } else {
    const freq = midiToFreq(midiNumber);
    fallbackGain = audioCtx.createGain();
    fallbackGain.gain.setValueAtTime(0.001, now);
    fallbackGain.gain.exponentialRampToValueAtTime(0.38, now + 0.04);

    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2600, now);

    fallbackOsc = audioCtx.createOscillator();
    fallbackOsc.type = "triangle";
    fallbackOsc.frequency.setValueAtTime(freq, now);
    fallbackOsc.detune.setValueAtTime(initialDetuneCents, now);

    fallbackSubOsc = audioCtx.createOscillator();
    fallbackSubOsc.type = "sine";
    fallbackSubOsc.frequency.setValueAtTime(freq, now);
    fallbackSubOsc.detune.setValueAtTime(initialDetuneCents, now);

    fallbackOsc.connect(filter);
    fallbackSubOsc.connect(filter);
    filter.connect(fallbackGain);
    fallbackGain.connect(audioCtx.destination);

    fallbackOsc.start(now);
    fallbackSubOsc.start(now);
  }

  if (hasVibrato) setNoteVibrato(true);
}

function updateContinuousPitchBend(detuneCents, hasVibrato = false) {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  if (activeSoundfontNode && activeSoundfontNode.source && activeSoundfontNode.source.detune) {
    activeSoundfontNode.source.detune.setValueAtTime(detuneCents, now);
  }
  if (fallbackOsc && fallbackSubOsc) {
    fallbackOsc.detune.setValueAtTime(detuneCents, now);
    fallbackSubOsc.detune.setValueAtTime(detuneCents, now);
  }
  setNoteVibrato(hasVibrato);
}

function stopNote() {
  setNoteVibrato(false);
  if (activeSoundfontNode) {
    try { activeSoundfontNode.stop(); } catch(e) {}
    activeSoundfontNode = null;
  }
  if (fallbackGain && audioCtx) {
    const now = audioCtx.currentTime;
    fallbackGain.gain.cancelScheduledValues(now);
    fallbackGain.gain.setValueAtTime(fallbackGain.gain.value, now);
    fallbackGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    const o1 = fallbackOsc;
    const o2 = fallbackSubOsc;
    setTimeout(() => { try { o1 && o1.stop(); o2 && o2.stop(); } catch(e) {} }, 60);
    fallbackOsc = null;
    fallbackSubOsc = null;
    fallbackGain = null;
  }
}

/**
 * ==============================================================================
 * MODULE 3: INPUT SUBSYSTEM, UNDO/REDO & JOYSTICK
 * ==============================================================================
 */
let isRecording = false;
let isPlaying = false;
let isLooping = false;
let playbackAborted = false;
let activePlaybackTimeout = null;
let recordStartTime = 0;
let recordedEvents = [];
let activeRecordedNote = null;
let showNoteDurations = true;
let playbackSpeed = 1.0;

let undoStack = [];
let redoStack = [];

let keyboardState = { L: false, R: false, A: false, X: false, Y: false, dUp: false, dDown: false, vibrato: false };
let touchActiveButtons = new Set();
let mouseLatchedDpad = 0;
let stickState = { x: 0, y: 0 };
let isDraggingStick = false;
let currentNoteState = null;

function pushHistory() {
  undoStack.push(JSON.stringify(recordedEvents));
  if (undoStack.length > 40) undoStack.shift();
  redoStack = [];
  updateUndoRedoButtons();
}

function undo() {
  if (undoStack.length === 0) return;
  if (isPlaying) stopPlayback();
  redoStack.push(JSON.stringify(recordedEvents));
  recordedEvents = JSON.parse(undoStack.pop());
  recalcStartTimes();
  syncInputsFromEvents();
  renderSheetMusic();
  updateSessionButtons();
  updateUndoRedoButtons();
  saveToLocalStorage();
}

function redo() {
  if (redoStack.length === 0) return;
  if (isPlaying) stopPlayback();
  undoStack.push(JSON.stringify(recordedEvents));
  recordedEvents = JSON.parse(redoStack.pop());
  recalcStartTimes();
  syncInputsFromEvents();
  renderSheetMusic();
  updateSessionButtons();
  updateUndoRedoButtons();
  saveToLocalStorage();
}

function updateUndoRedoButtons() {
  const btnUndo = document.getElementById('btn-undo');
  const btnRedo = document.getElementById('btn-redo');
  if (btnUndo) btnUndo.disabled = undoStack.length === 0 || isPlaying || isRecording;
  if (btnRedo) btnRedo.disabled = redoStack.length === 0 || isPlaying || isRecording;
}

function releaseAllHeldInputs() {
  keyboardState = { L: false, R: false, A: false, X: false, Y: false, dUp: false, dDown: false, vibrato: false };
  touchActiveButtons.clear();
  isDraggingStick = false;
  stickState.x = 0;
  stickState.y = 0;
  if (!isPlaying && currentNoteState !== null) {
    stopNote();
    currentNoteState = null;
    if (isRecording && activeRecordedNote) commitActiveNote();
  }
}
window.addEventListener('blur', releaseAllHeldInputs);
document.addEventListener('visibilitychange', () => { if (document.hidden) releaseAllHeldInputs(); });

window.addEventListener('keydown', (e) => {
  const isTextInput = e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT';

  if (isTextInput && (e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    if (e.target.id === 'raw-notes-input') translateRawNotesToController();
    else if (e.target.id === 'text-notes-input') loadFromTextInput(true);
    return;
  }

  if (e.key === 'Escape') {
    const modal = document.getElementById('export-modal');
    if (modal && modal.style.display === 'flex') {
      closeExportModal();
      return;
    }
    if (isPlaying) {
      stopPlayback();
      return;
    }
  }

  if (!isTextInput && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
    e.preventDefault();
    if (e.shiftKey) redo(); else undo();
    return;
  }
  if (!isTextInput && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
    e.preventDefault();
    redo();
    return;
  }

  if (!isTextInput && e.target.tagName !== 'BUTTON' && e.code === 'Space') {
    e.preventDefault();
    if (isPlaying) stopPlayback();
    else if (recordedEvents.length > 0 && !isRecording) playSong();
    return;
  }

  if (isTextInput || e.repeat) return;
  const k = e.key.toLowerCase();
  if (k === 'q') keyboardState.L = true;
  if (k === 'w') keyboardState.R = true;
  if (k === 'l') keyboardState.A = true;
  if (k === 'k') keyboardState.X = true;
  if (k === 'j') keyboardState.Y = true;
  if (e.key === 'ArrowUp') keyboardState.dUp = true;
  if (e.key === 'ArrowDown') keyboardState.dDown = true;
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || k === 'v') keyboardState.vibrato = true;
});

window.addEventListener('keyup', (e) => {
  if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
  const k = e.key.toLowerCase();
  if (k === 'q') keyboardState.L = false;
  if (k === 'w') keyboardState.R = false;
  if (k === 'l') keyboardState.A = false;
  if (k === 'k') keyboardState.X = false;
  if (k === 'j') keyboardState.Y = false;
  if (e.key === 'ArrowUp') keyboardState.dUp = false;
  if (e.key === 'ArrowDown') keyboardState.dDown = false;
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || k === 'v') keyboardState.vibrato = false;
});

window.addEventListener("gamepadconnected", (e) => {
  document.getElementById('gamepad-status').innerHTML = `<span class="badge badge-connected">Gamepad: ${e.gamepad.id.slice(0, 16)}...</span>`;
});
window.addEventListener("gamepaddisconnected", () => {
  document.getElementById('gamepad-status').innerHTML = `<span class="badge badge-disconnected">No Gamepad Detected</span>`;
});

function setSpeed(speed, btnEl) {
  playbackSpeed = speed;
  document.getElementById('speed-display').innerText = `${speed.toFixed(speed % 1 === 0 ? 1 : 2)}x`;
  document.querySelectorAll('.active-speed').forEach(b => b.classList.remove('active-speed'));
  if (btnEl) btnEl.classList.add('active-speed');
}

function toggleLoop() {
  isLooping = !isLooping;
  const btn = document.getElementById('btn-loop');
  if (btn) {
    btn.innerHTML = isLooping ? `🔁 Loop: ON` : `🔁 Loop: OFF`;
    btn.className = isLooping ? `btn-success` : `btn-secondary`;
  }
}

function setupAnalogStickDrag() {
  const stickGroup = document.getElementById('grp-stick');
  const svg = document.getElementById('controller-svg');

  const onPointerDown = (e) => {
    e.preventDefault();
    isDraggingStick = true;
    stickGroup.style.cursor = 'grabbing';
    try { stickGroup.setPointerCapture(e.pointerId); } catch(err) {}
    updateStickFromPointer(e);
  };
  const onPointerMove = (e) => {
    if (!isDraggingStick) return;
    e.preventDefault();
    updateStickFromPointer(e);
  };
  const onPointerUp = (e) => {
    if (!isDraggingStick) return;
    isDraggingStick = false;
    stickGroup.style.cursor = 'grab';
    stickState.x = 0;
    stickState.y = 0;
    try { stickGroup.releasePointerCapture(e.pointerId); } catch(err) {}
  };

  function updateStickFromPointer(e) {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    const dx = svgP.x - 110;
    const dy = svgP.y - 78;
    const maxRadius = 16;
    const distance = Math.hypot(dx, dy);
    const clampedDistance = Math.min(distance, maxRadius);
    const angle = Math.atan2(dy, dx);
    stickState.x = (clampedDistance / maxRadius) * Math.cos(angle);
    stickState.y = (clampedDistance / maxRadius) * Math.sin(angle);
  }

  stickGroup.addEventListener('pointerdown', onPointerDown);
  stickGroup.addEventListener('pointermove', onPointerMove);
  stickGroup.addEventListener('pointerup', onPointerUp);
  stickGroup.addEventListener('pointercancel', onPointerUp);
}
setupAnalogStickDrag();

function setupTouchAndMouseControls() {
  const registerFaceBtn = (id, key) => {
    const el = document.getElementById(id);
    if (!el) return;
    const press = (e) => { e.preventDefault(); touchActiveButtons.add(key); };
    const release = (e) => { e.preventDefault(); touchActiveButtons.delete(key); };
    el.addEventListener('pointerdown', press);
    el.addEventListener('pointerup', release);
    el.addEventListener('pointercancel', release);
    el.addEventListener('pointerleave', release);
  };

  registerFaceBtn('grp-btn-l', 'L');
  registerFaceBtn('grp-btn-r', 'R');
  registerFaceBtn('grp-btn-a', 'A');
  registerFaceBtn('grp-btn-x', 'X');
  registerFaceBtn('grp-btn-y', 'Y');

  const dpadUp = document.getElementById('pad-dpad-up');
  const dpadDown = document.getElementById('pad-dpad-down');

  dpadUp.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    mouseLatchedDpad = (mouseLatchedDpad === 1) ? 0 : 1;
  });

  dpadDown.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    mouseLatchedDpad = (mouseLatchedDpad === -1) ? 0 : -1;
  });
}
setupTouchAndMouseControls();

function updateSessionButtons() {
  const hasNotes = recordedEvents.length > 0;
  document.getElementById('btn-play').disabled = !hasNotes || isRecording || isPlaying;
  const btnStopPlayback = document.getElementById('btn-stop-playback');
  if (btnStopPlayback) btnStopPlayback.disabled = !isPlaying;
  document.getElementById('btn-open-preview').disabled = !hasNotes || isRecording || isPlaying;
  const btnExpMidi = document.getElementById('btn-export-midi');
  const btnExpTxt = document.getElementById('btn-export-txt');
  const btnCopyTxt = document.getElementById('btn-copy-txt');
  const btnQuant = document.getElementById('btn-quantize');
  if (btnExpMidi) btnExpMidi.disabled = !hasNotes || isRecording || isPlaying;
  if (btnExpTxt) btnExpTxt.disabled = !hasNotes || isRecording || isPlaying;
  if (btnCopyTxt) btnCopyTxt.disabled = !hasNotes || isRecording || isPlaying;
  if (btnQuant) btnQuant.disabled = !hasNotes || isRecording || isPlaying;
  updateUndoRedoButtons();
}

function handleTimeToggle(isChecked) {
  showNoteDurations = isChecked;
  const tMain = document.getElementById('toggle-time-main');
  const tModal = document.getElementById('toggle-time-modal');
  if (tMain) tMain.checked = showNoteDurations;
  if (tModal) tModal.checked = showNoteDurations;

  renderSheetMusic();
  const modal = document.getElementById('export-modal');
  if (modal && modal.style.display === 'flex') {
    renderPrintableHTMLSheet();
  }
}

function pollInput() {
  if (isPlaying) {
    requestAnimationFrame(pollInput);
    return;
  }

  const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
  const gp = gamepads[0] || gamepads[1] || gamepads[2] || gamepads[3];

  let raw = {
    L: keyboardState.L || touchActiveButtons.has('L'),
    R: keyboardState.R || touchActiveButtons.has('R'),
    A: keyboardState.A || touchActiveButtons.has('A'),
    X: keyboardState.X || touchActiveButtons.has('X'),
    Y: keyboardState.Y || touchActiveButtons.has('Y'),
    dUp: keyboardState.dUp || mouseLatchedDpad === 1,
    dDown: keyboardState.dDown || mouseLatchedDpad === -1,
    stickX: stickState.x,
    stickY: stickState.y,
    vibrato: keyboardState.vibrato || Math.abs(stickState.x) > 0.35
  };

  if (gp) {
    raw.L = raw.L || gp.buttons[4]?.pressed;
    raw.R = raw.R || gp.buttons[5]?.pressed;
    raw.A = raw.A || gp.buttons[1]?.pressed;
    raw.X = raw.X || gp.buttons[3]?.pressed;
    raw.Y = raw.Y || gp.buttons[2]?.pressed;
    raw.dUp = raw.dUp || gp.buttons[12]?.pressed;
    raw.dDown = raw.dDown || gp.buttons[13]?.pressed;

    const deadzone = 0.08;
    const axX = Math.abs(gp.axes[0]) > deadzone ? gp.axes[0] : 0;
    const axY = Math.abs(gp.axes[1]) > deadzone ? gp.axes[1] : 0;
    if (axX !== 0 || axY !== 0) {
      raw.stickX = axX;
      raw.stickY = axY;
      if (Math.abs(axX) > 0.3) raw.vibrato = true;
    }
  }

  updateControllerSVG(raw);

  let activeBtn = null;
  if (raw.X) activeBtn = 'X';
  else if (raw.Y) activeBtn = 'Y';
  else if (raw.A) activeBtn = 'A';
  else if (raw.R) activeBtn = 'R';
  else if (raw.L) activeBtn = 'L';

  let dpadSemis = 0;
  if (raw.dUp) dpadSemis += 1;
  if (raw.dDown) dpadSemis -= 1;

  const analogBendCents = -raw.stickY * 200;
  const totalDetuneCents = (dpadSemis * 100) + analogBendCents;

  let stickDir = null;
  if (raw.stickY <= -0.7) stickDir = 'up-full';
  else if (raw.stickY <= -0.25) stickDir = 'up-half';
  else if (raw.stickY >= 0.7) stickDir = 'down-full';
  else if (raw.stickY >= 0.25) stickDir = 'down-half';

  let displayTokens = [];
  let pdfTokens = [];

  if (dpadSemis === 1) { displayTokens.push("+ ▲ D-Pad"); pdfTokens.push("D-PAD UP"); }
  if (dpadSemis === -1) { displayTokens.push("+ ▼ D-Pad"); pdfTokens.push("D-PAD DN"); }
  if (stickDir === 'up-full') { displayTokens.push("+ ⮝ Stick Full"); pdfTokens.push("STICK UP FULL"); }
  else if (stickDir === 'up-half') { displayTokens.push("+ ⮝ Stick ½"); pdfTokens.push("STICK UP HALF"); }
  else if (stickDir === 'down-full') { displayTokens.push("+ ⮟ Stick Full"); pdfTokens.push("STICK DN FULL"); }
  else if (stickDir === 'down-half') { displayTokens.push("+ ⮟ Stick ½"); pdfTokens.push("STICK DN HALF"); }
  if (raw.vibrato) { displayTokens.push("+ ~ Vib"); pdfTokens.push("VIBRATO"); }

  const comboDisplay = displayTokens.length > 0 ? displayTokens.join("<br>") : "(Just Press)";
  const comboPlain = displayTokens.length > 0 ? displayTokens.join(" ") : "(Just Press)";
  const pdfModifier = pdfTokens.length > 0 ? pdfTokens.join(" + ") : "NATURAL";

  if (activeBtn) {
    const base = BASE_PITCHES[activeBtn];
    const soundingMidi = base.midi + (totalDetuneCents / 100);
    const finalNoteName = midiToName(soundingMidi);

    const hasButtonChanged = !currentNoteState || currentNoteState.btn !== activeBtn;

    if (hasButtonChanged) {
      if (isRecording && activeRecordedNote) commitActiveNote();

      currentNoteState = { btn: activeBtn, baseMidi: base.midi };
      startNote(base.midi, totalDetuneCents, raw.vibrato);

      if (isRecording) {
        activeRecordedNote = {
          isRest: false,
          button: activeBtn,
          dpad: dpadSemis,
          stickDir: stickDir,
          comboDisplay: comboDisplay,
          comboPlain: comboPlain,
          pdfMod: pdfModifier,
          hasVibrato: raw.vibrato,
          pitch: finalNoteName,
          midi: base.midi + Math.round(totalDetuneCents / 100),
          startTime: (performance.now() - recordStartTime) / 1000
        };
      }
    } else {
      updateContinuousPitchBend(totalDetuneCents, raw.vibrato);

      if (isRecording && activeRecordedNote) {
        if (raw.vibrato && !activeRecordedNote.hasVibrato) {
          activeRecordedNote.hasVibrato = true;
          activeRecordedNote.comboDisplay = comboDisplay;
          activeRecordedNote.comboPlain = comboPlain;
          activeRecordedNote.pdfMod = pdfModifier;
        }
        const heldSec = ((performance.now() - recordStartTime) / 1000) - activeRecordedNote.startTime;
        if (heldSec < 0.12 && (dpadSemis !== activeRecordedNote.dpad || stickDir !== activeRecordedNote.stickDir)) {
          activeRecordedNote.dpad = dpadSemis;
          activeRecordedNote.stickDir = stickDir;
          activeRecordedNote.comboDisplay = comboDisplay;
          activeRecordedNote.comboPlain = comboPlain;
          activeRecordedNote.pdfMod = pdfModifier;
          activeRecordedNote.pitch = finalNoteName;
          activeRecordedNote.midi = base.midi + Math.round(totalDetuneCents / 100);
        }
      }
    }

    document.getElementById('mon-pitch').innerText = finalNoteName;
    document.getElementById('mon-detune').innerText = `${Math.round(totalDetuneCents)} cents`;
    document.getElementById('mon-expr').innerText = raw.vibrato ? "Vibrato (Active)" : "Smooth Bend";
  } else {
    if (currentNoteState !== null) {
      stopNote();
      currentNoteState = null;
      if (isRecording && activeRecordedNote) commitActiveNote();
    }
    document.getElementById('mon-pitch').innerText = "---";
    document.getElementById('mon-detune').innerText = `${Math.round(totalDetuneCents)} cents`;
    document.getElementById('mon-expr').innerText = raw.vibrato ? "Vibrato Ready" : "None";
  }

  if (isRecording) {
    const elapsed = (performance.now() - recordStartTime) / 1000;
    const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const secs = (elapsed % 60).toFixed(1).padStart(4, '0');
    document.getElementById('clock').innerText = `${mins}:${secs}`;
  }

  requestAnimationFrame(pollInput);
}

function commitActiveNote() {
  if (activeRecordedNote) {
    pushHistory();
    const nowSec = (performance.now() - recordStartTime) / 1000;
    activeRecordedNote.duration = Math.max(0.12, nowSec - activeRecordedNote.startTime);

    if (recordedEvents.length > 0) {
      const prev = recordedEvents[recordedEvents.length - 1];
      prev.gap = Math.max(0, activeRecordedNote.startTime - (prev.startTime + prev.duration));
    }
    activeRecordedNote.gap = 0.06;

    recordedEvents.push(activeRecordedNote);
    syncInputsFromEvents();
    renderSheetMusic();
    updateSessionButtons();
    saveToLocalStorage();
    activeRecordedNote = null;
  }
}

function updateControllerSVG(raw) {
  toggleSVGClass('pad-btn-l', 'btn-l-active active', raw.L);
  toggleSVGClass('pad-btn-r', 'btn-r-active active', raw.R);
  toggleSVGClass('pad-btn-a', 'btn-a-active active', raw.A);
  toggleSVGClass('pad-btn-x', 'btn-x-active active', raw.X);
  toggleSVGClass('pad-btn-y', 'btn-y-active active', raw.Y);
  toggleSVGClass('pad-dpad-up', 'dpad-active active', raw.dUp);
  toggleSVGClass('pad-dpad-down', 'dpad-active active', raw.dDown);

  const thumb = document.getElementById('pad-stick-thumb');
  if (thumb) {
    const pxX = raw.stickX * 15;
    const pxY = raw.stickY * 15;
    thumb.setAttribute('cx', pxX);
    thumb.setAttribute('cy', pxY);

    if (raw.vibrato) {
      thumb.className.baseVal = "vibrato-active";
    } else if (Math.hypot(raw.stickX, raw.stickY) > 0.15) {
      thumb.className.baseVal = "stick-active";
    } else {
      thumb.className.baseVal = "";
    }
  }
}

function toggleSVGClass(id, className, condition) {
  const el = document.getElementById(id);
  if (!el) return;
  className.split(' ').forEach(c => {
    if (condition) el.classList.add(c);
    else el.classList.remove(c);
  });
}

/**
 * ==============================================================================
 * MODULE 4: CARD EDITING, DELETION, AUDITION, QUANTIZE & LOCALSTORAGE
 * ==============================================================================
 */
function recalcStartTimes() {
  let cur = 0;
  for (let i = 0; i < recordedEvents.length; i++) {
    const ev = recordedEvents[i];
    ev.startTime = cur;
    const gapAfter = ev.isRest ? 0 : (typeof ev.gap === 'number' ? ev.gap : 0.06);
    cur += (ev.duration || 0.38) + gapAfter;
  }
}

function deleteCard(idx) {
  if (isPlaying) stopPlayback();
  pushHistory();
  recordedEvents.splice(idx, 1);
  recalcStartTimes();
  syncInputsFromEvents();
  renderSheetMusic();
  updateSessionButtons();
  saveToLocalStorage();
}

function editCardDuration(idx) {
  if (isPlaying) stopPlayback();
  const item = recordedEvents[idx];
  if (!item) return;
  const oldDur = (item.duration || 0.38).toFixed(2);
  const promptVal = prompt(`Edit hold time (in seconds) for Step #${idx + 1} (${item.pitch}):\nPresets: 0.25 (short), 0.5 (medium), 1.0 (long)`, oldDur);
  if (promptVal !== null) {
    let cleanVal = promptVal.trim().toLowerCase();
    let newDur = parseFloat(cleanVal);
    if (cleanVal.includes('ms')) newDur /= 1000;
    if (!isNaN(newDur) && newDur > 0.02) {
      pushHistory();
      item.duration = Math.max(0.05, newDur);
      recalcStartTimes();
      syncInputsFromEvents();
      renderSheetMusic();
      saveToLocalStorage();
    }
  }
}

function auditionCard(idx) {
  if (isPlaying || isRecording) return;
  const item = recordedEvents[idx];
  if (!item || item.isRest) return;
  startNote(item.midi, 0, item.hasVibrato);

  let stickY = 0;
  let dUp = item.dpad === 1;
  let dDown = item.dpad === -1;
  if (item.stickDir === 'up-full') stickY = -1.0;
  else if (item.stickDir === 'up-half') stickY = -0.5;
  else if (item.stickDir === 'down-full') stickY = 1.0;
  else if (item.stickDir === 'down-half') stickY = 0.5;

  const mock = { L: false, R: false, A: false, X: false, Y: false, dUp, dDown, stickX: 0, stickY, vibrato: item.hasVibrato };
  mock[item.button] = true;
  updateControllerSVG(mock);

  document.getElementById('mon-pitch').innerText = item.pitch;
  document.getElementById('mon-detune').innerText = `${Math.round(-stickY * 200 + (dUp ? 100 : dDown ? -100 : 0))} cents`;
  document.getElementById('mon-expr').innerText = item.hasVibrato ? "Vibrato" : "Audition";

  setTimeout(() => {
    stopNote();
    updateControllerSVG({ L: false, R: false, A: false, X: false, Y: false, dUp: false, dDown: false, stickX: 0, stickY: 0, vibrato: false });
    document.getElementById('mon-pitch').innerText = "---";
  }, 420);
}

function quantizeTimings() {
  if (recordedEvents.length === 0) return;
  if (isPlaying) stopPlayback();
  pushHistory();
  const grid = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
  recordedEvents.forEach(e => {
    let closest = grid[0];
    let minDiff = Math.abs(e.duration - grid[0]);
    for (let g of grid) {
      const diff = Math.abs(e.duration - g);
      if (diff < minDiff) {
        minDiff = diff;
        closest = g;
      }
    }
    e.duration = closest;
  });
  recalcStartTimes();
  syncInputsFromEvents();
  renderSheetMusic();
  saveToLocalStorage();

  const btn = document.getElementById('btn-quantize');
  if (btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = "✓ Snapped!";
    btn.style.color = "#4ade80";
    setTimeout(() => { btn.innerHTML = orig; btn.style.color = ""; }, 1400);
  }
}

function syncInputsFromEvents() {
  const textNotesInput = document.getElementById('text-notes-input');
  if (textNotesInput) {
    textNotesInput.value = recordedEvents.map((ev, idx, arr) => eventToTextToken(ev, idx, arr)).join(", ");
  }
  const rawNotesInput = document.getElementById('raw-notes-input');
  if (rawNotesInput) {
    rawNotesInput.value = recordedEvents.map(ev => `${ev.pitch}:${Number((ev.duration || 0.38).toFixed(2))}`).join(", ");
  }
}

function saveToLocalStorage() {
  try {
    localStorage.setItem('oot_studio_events', JSON.stringify(recordedEvents));
  } catch(e) {}
}

function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem('oot_studio_events');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        recordedEvents = parsed;
        syncInputsFromEvents();
        renderSheetMusic();
        updateSessionButtons();
      }
    }
  } catch(e) {}
}
window.addEventListener('load', loadFromLocalStorage);

/**
 * ==============================================================================
 * MODULE 5: TRANSLATOR, FORGIVING PARSER & AI PROMPT COPY
 * ==============================================================================
 */
const PITCH_SEMITONES = {
  'C': 0, 'B#': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3,
  'E': 4, 'Fb': 4, 'F': 5, 'E#': 5, 'F#': 6, 'Gb': 6, 'G': 7,
  'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11, 'Cb': 11
};

async function copyAiPrompt() {
  const promptText = `Write out the melody for [Song Name] using standard pitch notation with durations in seconds, formatted as a comma-separated list: Note:Duration (e.g., D4:0.5, F#4:0.25, A4:1.0). Keep all pitches strictly within the range of B3 to F5 (19 semitones). If the song is outside that range, transpose the entire key so it fits. Output only the note list.`;
  const btn = document.getElementById('btn-copy-ai-prompt');
  try {
    await navigator.clipboard.writeText(promptText);
    const origText = btn.innerHTML;
    btn.innerHTML = `✓ Copied!`;
    setTimeout(() => { btn.innerHTML = origText; }, 2000);
  } catch (err) {
    alert("Copied Prompt:\n\n" + promptText);
  }
}

function translateRawNotesToController() {
  if (isPlaying) stopPlayback();
  const rawInput = document.getElementById('raw-notes-input');
  const rawVal = rawInput.value.trim();
  const alertEl = document.getElementById('translate-alert');
  alertEl.style.display = 'none';

  if (!rawVal) {
    alert("Please enter some raw pitch notes first.");
    return;
  }

  const tokens = rawVal.split(/[\s,]+/);
  let parsedNotes = [];

  for (let tok of tokens) {
    tok = tok.trim();
    if (!tok) continue;

    const parts = tok.split(':');
    let pitchStr = parts[0].trim().replace('♯', '#').replace('♭', 'b');
    let dur = 0.38;
    let gap = 0.06;

    if (parts.length > 1) {
      let val = parseFloat(parts[1]);
      if (!isNaN(val)) {
        if (parts[1].toLowerCase().includes('ms')) val /= 1000;
        dur = Math.max(0.08, val);
      }
    }
    if (parts.length > 2) {
      let valGap = parseFloat(parts[2]);
      if (!isNaN(valGap)) {
        if (parts[2].toLowerCase().includes('ms')) valGap /= 1000;
        gap = Math.max(0, valGap);
      }
    }

    const upper = pitchStr.toUpperCase();
    if (upper.startsWith('REST') || upper.startsWith('_') || upper.startsWith('WAIT') || upper.startsWith('PAUSE')) {
      parsedNotes.push({ isRest: true, dur: dur, gap: gap });
      continue;
    }

    const m = pitchStr.match(/^([a-gA-G])([#bB]?)(-?\d+)?$/);
    if (!m) continue;

    const letter = m[1].toUpperCase();
    let acc = m[2] ? m[2].toLowerCase() : '';
    let noteKey = letter + acc;
    const octave = m[3] !== undefined ? parseInt(m[3], 10) : 4;
    const semi = PITCH_SEMITONES[noteKey];
    if (semi === undefined) continue;

    const midi = (octave + 1) * 12 + semi;
    parsedNotes.push({ isRest: false, midi: midi, dur: dur, gap: gap });
  }

  const pitchNotes = parsedNotes.filter(n => !n.isRest);
  if (pitchNotes.length === 0) {
    alert("No valid notes recognized. Ensure you use note names like D4, F#4, A4, or Bb4.");
    return;
  }

  // SMART AUTO-TRANSPOSE (B3 to F5: MIDI 59 to 77)
  let minMidi = Math.min(...pitchNotes.map(n => n.midi));
  let maxMidi = Math.max(...pitchNotes.map(n => n.midi));
  let transposeShift = 0;
  const span = maxMidi - minMidi;

  if (span <= 18) {
    while (minMidi + transposeShift < 59) transposeShift += 12;
    while (maxMidi + transposeShift > 77) transposeShift -= 12;
    while (minMidi + transposeShift < 59) transposeShift += 1;
    while (maxMidi + transposeShift > 77) transposeShift -= 1;
  } else {
    const midPoint = (minMidi + maxMidi) / 2;
    transposeShift = Math.round(68 - midPoint);
  }

  if (transposeShift !== 0) {
    parsedNotes.forEach(n => { if (!n.isRest) n.midi += transposeShift; });
    alertEl.style.display = 'block';
    alertEl.className = "status-alert info";
    alertEl.innerText = `🎵 Smart Auto-Transpose: Melody shifted by ${transposeShift > 0 ? '+' : ''}${transposeShift} semitone(s) to match the Switch 2 Ocarina range (B3–F5).`;
  } else {
    alertEl.style.display = 'block';
    alertEl.className = "status-alert success";
    alertEl.innerText = `✓ Perfectly in range (B3–F5). No transposition needed!`;
  }

  let controllerTokens = [];
  parsedNotes.forEach(n => {
    if (n.isRest) {
      controllerTokens.push(`REST:${Number(n.dur.toFixed(2))}`);
      return;
    }
    const clampedMidi = Math.max(59, Math.min(77, n.midi));
    const guideItem = CHROMATIC_GUIDE.find(g => g.midi === clampedMidi) || CHROMATIC_GUIDE[3];
    let tok = `${guideItem.notation}:${Number(n.dur.toFixed(2))}`;
    if (n.gap > 0.08) tok += `:${Number(n.gap.toFixed(2))}`;
    controllerTokens.push(tok);
  });

  document.getElementById('text-notes-input').value = controllerTokens.join(", ");
  loadFromTextInput(false);
  saveToLocalStorage();
}

/**
 * ==============================================================================
 * MODULE 6: CONTROLLER TEXT SONG PARSER & EXPANDED PRESETS
 * ==============================================================================
 */
function loadFromTextInput(syncRawBox = true) {
  if (isPlaying) stopPlayback();
  const txt = document.getElementById('text-notes-input').value;
  if (!txt.trim()) return;

  const tokens = txt.trim().split(/[\s,]+/);
  const parsed = [];
  let currentTime = 0;

  tokens.forEach(rawTok => {
    rawTok = rawTok.trim();
    if (!rawTok) return;

    const upperTok = rawTok.toUpperCase();
    if (upperTok.startsWith('REST') || upperTok.startsWith('_') || upperTok.startsWith('WAIT') || upperTok.startsWith('PAUSE')) {
      const restParts = rawTok.split(':');
      let restDur = 0.44;
      if (restParts.length > 1) {
        let val = parseFloat(restParts[1]);
        if (!isNaN(val)) {
          if (restParts[1].toLowerCase().includes('ms')) val /= 1000;
          restDur = Math.max(0.05, val);
        }
      }
      parsed.push({
        isRest: true,
        button: 'REST',
        dpad: 0,
        stickDir: null,
        comboDisplay: "(Pause)",
        comboPlain: "REST",
        pdfMod: "REST",
        hasVibrato: false,
        pitch: "REST",
        midi: null,
        startTime: currentTime,
        duration: restDur,
        gap: 0
      });
      currentTime += restDur;
      return;
    }

    const colonParts = rawTok.split(':');
    let tok = colonParts[0].toUpperCase().trim();
    let noteDur = 0.38;
    let noteGap = 0.06;

    if (colonParts.length > 1) {
      let durVal = parseFloat(colonParts[1]);
      if (!isNaN(durVal)) {
        if (colonParts[1].toLowerCase().includes('ms')) durVal /= 1000;
        noteDur = Math.max(0.08, durVal);
      }
    }
    if (colonParts.length > 2) {
      let gapVal = parseFloat(colonParts[2]);
      if (!isNaN(gapVal)) {
        if (colonParts[2].toLowerCase().includes('ms')) gapVal /= 1000;
        noteGap = Math.max(0.0, gapVal);
      }
    }

    const match = tok.match(/([LRAYX])/);
    if (!match) return;
    const btn = match[1];
    let modStr = tok.replace(btn, '');

    let hasVib = false;
    if (modStr.includes('~') || modStr.includes('VIB')) {
      hasVib = true;
      modStr = modStr.replace(/VIB/g, '').replace(/~/g, '');
    }

    let offset = 0;
    let dpad = 0;
    let stickDir = null;
    let comboTokens = [];
    let pdfTokens = [];

    if (modStr.includes('+D^') || modStr.includes('#') || modStr.includes('+▲') || modStr.includes('▲')) {
      offset += 1; dpad = 1;
      comboTokens.push("D-Pad ▲"); pdfTokens.push("D-PAD UP");
      modStr = modStr.replace(/\+D\^/g, '').replace(/#/g, '').replace(/\+▲/g, '').replace(/▲/g, '');
    } else if (modStr.includes('+DV') || modStr.includes('+B') || modStr.includes('B') || modStr.includes('+▼') || modStr.includes('▼')) {
      offset -= 1; dpad = -1;
      comboTokens.push("D-Pad ▼"); pdfTokens.push("D-PAD DN");
      modStr = modStr.replace(/\+DV/g, '').replace(/\+B/g, '').replace(/B/g, '').replace(/\+▼/g, '').replace(/▼/g, '');
    }

    if (modStr.includes('^^') || modStr.includes('UU')) {
      offset += 2; stickDir = 'up-full';
      comboTokens.push("Stick ⮝ Full"); pdfTokens.push("STICK UP FULL");
    } else if (modStr.includes('^') || modStr.includes('U')) {
      offset += 1; stickDir = 'up-half';
      comboTokens.push("Stick ⮝ ½"); pdfTokens.push("STICK UP HALF");
    } else if (modStr.includes('VV') || modStr.includes('DD')) {
      offset -= 2; stickDir = 'down-full';
      comboTokens.push("Stick ⮟ Full"); pdfTokens.push("STICK DN FULL");
    } else if (modStr.includes('V') || modStr.includes('D')) {
      offset -= 1; stickDir = 'down-half';
      comboTokens.push("Stick ⮟ ½"); pdfTokens.push("STICK DN HALF");
    }

    if (hasVib) {
      comboTokens.push("Vibrato");
      pdfTokens.push("VIBRATO");
    }

    const base = BASE_PITCHES[btn];
    const finalMidi = base.midi + offset;
    const pitch = midiToName(finalMidi);

    parsed.push({
      isRest: false,
      button: btn,
      dpad: dpad,
      stickDir: stickDir,
      comboDisplay: comboTokens.length > 0 ? comboTokens.join("<br>") : "(Natural)",
      comboPlain: comboTokens.length > 0 ? "+ " + comboTokens.join(" + ") : "(Natural)",
      pdfMod: pdfTokens.length > 0 ? pdfTokens.join(" + ") : "NATURAL",
      hasVibrato: hasVib,
      pitch: pitch,
      midi: finalMidi,
      startTime: currentTime,
      duration: noteDur,
      gap: noteGap
    });
    currentTime += (noteDur + noteGap);
  });

  if (parsed.length > 0) {
    pushHistory();
    recordedEvents = parsed;
    renderSheetMusic();
    updateSessionButtons();
    saveToLocalStorage();

    const rawBox = document.getElementById('raw-notes-input');
    if (rawBox && (syncRawBox || !rawBox.value.trim())) {
      rawBox.value = recordedEvents.map(e => `${e.pitch}:${Number(e.duration.toFixed(2))}`).join(", ");
    }
  }
}

function setPreset(name) {
  const presets = {
    'ZeldasLullaby': {
      raw: "F#4:1.0, A4:0.5, E4:1.5, F#4:1.0, A4:0.5, E4:1.5, F#4:1.0, A4:0.5, E5:1.0, D5:0.5, A4:1.0, G4:0.25, F#4:0.25, E4:1.0",
      controller: "R+#:1.0, A:0.5, R+b:1.5, R+#:1.0, A:0.5, R+b:1.5, R+#:1.0, A:0.5, X+^^:1.0, X:0.5, A:1.0, R+^^:0.25, R+#:0.25, R+b:1.0"
    },
    'SongOfStorms': {
      raw: "D4:0.4, F4:0.4, D5:0.8, D4:0.4, F4:0.4, D5:0.8, E5:0.6, F5:0.2, E5:0.2, F5:0.2, E5:0.2, C5:0.4, A4:0.8",
      controller: "L:0.4, R:0.4, X:0.8, L:0.4, R:0.4, X:0.8, X+^^:0.6, X+#+^^:0.2, X+^^:0.2, X+#+^^:0.2, X+^^:0.2, Y+#:0.4, A:0.8"
    },
    'SongOfTime': {
      raw: "A4:0.5, D4:1.0, F4:0.5, A4:0.5, D4:1.0, F4:0.5, A4:0.25, C5:0.25, B4:0.5, G4:0.5, F4:0.25, G4:0.25, A4:0.5, D4:0.5, C4:0.25, E4:0.25, D4:1.0",
      controller: "A:0.5, L:1.0, R:0.5, A:0.5, L:1.0, R:0.5, A:0.25, Y+#:0.25, Y:0.5, R+^^:0.5, R:0.25, R+^^:0.25, A:0.5, L:0.5, L+vv:0.25, R+b:0.25, L:1.0"
    },
    'Epona': {
      raw: "D5:0.5, B4:0.5, A4:1.0, D5:0.5, B4:0.5, A4:1.0, D5:0.5, B4:0.5, A4:0.5, B4:0.5, A4:1.0",
      controller: "X:0.5, Y:0.5, A:1.0, X:0.5, Y:0.5, A:1.0, X:0.5, Y:0.5, A:0.5, Y:0.5, A:1.0"
    },
    'SariasSong': {
      raw: "F4:0.3, A4:0.3, B4:0.6, F4:0.3, A4:0.3, B4:0.6, F4:0.3, A4:0.3, B4:0.3, E5:0.3, D5:0.6, B4:0.3, C5:0.3, B4:0.3, G4:0.3, E4:0.9",
      controller: "R:0.3, A:0.3, Y:0.6, R:0.3, A:0.3, Y:0.6, R:0.3, A:0.3, Y:0.3, X+^^:0.3, X:0.6, Y:0.3, Y+#:0.3, Y:0.3, R+^^:0.3, R+b:0.9"
    },
    'SongOfHealing': {
      raw: "B4:0.5, A4:0.5, F4:0.5, B4:0.5, A4:0.5, F4:0.5, B4:0.5, A4:0.5, E4:0.5, D4:0.5, E4:1.0",
      controller: "Y:0.5, A:0.5, R:0.5, Y:0.5, A:0.5, R:0.5, Y:0.5, A:0.5, R+b:0.5, L:0.5, R+b:1.0"
    },
    'BoleroOfFire': {
      raw: "F4:0.25, D4:0.25, F4:0.25, D4:0.25, A4:0.25, F4:0.25, A4:0.25, F4:0.75",
      controller: "R:0.25, L:0.25, R:0.25, L:0.25, A:0.25, R:0.25, A:0.25, R:0.75"
    },
    'GerudoValley': {
      raw: "C#4:0.25, D4:0.25, F#4:0.25, A4:0.25, D5:0.5, C#5:0.5, B4:0.5, A4:0.5, G4:0.5, F#4:0.5, E4:1.0",
      controller: "L+b:0.25, L:0.25, R+#:0.25, A:0.25, X:0.5, X+b:0.5, Y:0.5, A:0.5, R+^^:0.5, R+#:0.5, R+b:1.0"
    }
  };
  if (presets[name]) {
    document.getElementById('translate-alert').style.display = 'none';
    document.getElementById('raw-notes-input').value = presets[name].raw;
    document.getElementById('text-notes-input').value = presets[name].controller;
    loadFromTextInput(false);
  }
}

/**
 * ==============================================================================
 * MODULE 7: SEQUENCER RECORDING & PLAYBACK
 * ==============================================================================
 */
function sleepCancellable(ms) {
  return new Promise((resolve) => {
    activePlaybackTimeout = setTimeout(() => {
      activePlaybackTimeout = null;
      resolve();
    }, ms);
  });
}

function clearPlayheadGlow() {
  document.querySelectorAll('#sheet-music .note-card').forEach(c => c.classList.remove('active-playhead'));
}

function formatClockTime(sec) {
  const mins = Math.floor(sec / 60).toString().padStart(2, '0');
  const secs = (sec % 60).toFixed(1).padStart(4, '0');
  return `${mins}:${secs}`;
}

function stopPlayback() {
  if (!isPlaying) return;
  playbackAborted = true;
  if (activePlaybackTimeout) {
    clearTimeout(activePlaybackTimeout);
    activePlaybackTimeout = null;
  }
  clearPlayheadGlow();
  stopNote();
  updateControllerSVG({ L: false, R: false, A: false, X: false, Y: false, dUp: false, dDown: false, stickX: 0, stickY: 0, vibrato: false });
  document.getElementById('mon-pitch').innerText = "---";
  document.getElementById('mon-detune').innerText = "0 cents";
  document.getElementById('mon-expr').innerText = "None";
  isPlaying = false;
  document.getElementById('btn-record').disabled = false;
  updateSessionButtons();
}

function toggleRecord() {
  const btn = document.getElementById('btn-record');
  if (!isRecording) {
    if (isPlaying) stopPlayback();
    if (recordedEvents.length > 0) pushHistory();
    isRecording = true;
    recordedEvents = [];
    activeRecordedNote = null;
    recordStartTime = performance.now();
    btn.innerHTML = `<span style="font-size:14px;">■</span> Stop`;
    btn.className = "btn-danger";
    updateSessionButtons();
    renderSheetMusic();
  } else {
    isRecording = false;
    commitActiveNote();
    btn.innerHTML = `<span style="font-size:14px;">&bull;</span> Record`;
    btn.className = "btn-danger";
    updateSessionButtons();
  }
}

function clearSong() {
  if (isPlaying) stopPlayback();
  if (isRecording) toggleRecord();
  if (recordedEvents.length > 0) pushHistory();
  clearPlayheadGlow();
  recordedEvents = [];
  activeRecordedNote = null;
  document.getElementById('clock').innerText = "00:00.0";
  document.getElementById('text-notes-input').value = "";
  document.getElementById('raw-notes-input').value = "";
  document.getElementById('translate-alert').style.display = 'none';
  updateSessionButtons();
  renderSheetMusic();
  saveToLocalStorage();
}

async function playSong() {
  if (recordedEvents.length === 0 || isPlaying) return;
  isPlaying = true;
  playbackAborted = false;
  document.getElementById('btn-record').disabled = true;
  updateSessionButtons();

  const lastEv = recordedEvents[recordedEvents.length - 1];
  const totalSongSec = lastEv ? (lastEv.startTime + lastEv.duration) : 0;

  do {
    let playheadTime = 0;
    const speed = Math.max(0.2, playbackSpeed || 1.0);
    const cards = document.querySelectorAll('#sheet-music .note-card');

    for (let i = 0; i < recordedEvents.length; i++) {
      if (playbackAborted) break;

      const item = recordedEvents[i];
      const restDelay = (item.startTime - playheadTime) / speed;
      if (restDelay > 0.005) {
        clearPlayheadGlow();
        await sleepCancellable(restDelay * 1000);
        if (playbackAborted) break;
      }

      clearPlayheadGlow();
      if (cards[i]) {
        cards[i].classList.add('active-playhead');
        cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }

      document.getElementById('clock').innerText = `${formatClockTime(item.startTime)} / ${formatClockTime(totalSongSec)}`;

      if (!item.isRest) {
        let stickY = 0;
        let dUp = item.dpad === 1;
        let dDown = item.dpad === -1;
        if (item.stickDir === 'up-full') stickY = -1.0;
        else if (item.stickDir === 'up-half') stickY = -0.5;
        else if (item.stickDir === 'down-full') stickY = 1.0;
        else if (item.stickDir === 'down-half') stickY = 0.5;

        const mock = { L: false, R: false, A: false, X: false, Y: false, dUp, dDown, stickX: 0, stickY, vibrato: item.hasVibrato };
        mock[item.button] = true;
        updateControllerSVG(mock);

        document.getElementById('mon-pitch').innerText = item.pitch;
        document.getElementById('mon-detune').innerText = `${Math.round(-stickY * 200 + (dUp ? 100 : dDown ? -100 : 0))} cents`;
        document.getElementById('mon-expr').innerText = item.hasVibrato ? "Vibrato" : "Playing";

        startNote(item.midi, 0, item.hasVibrato);
      } else {
        document.getElementById('mon-pitch').innerText = "REST";
        document.getElementById('mon-detune').innerText = "0 cents";
        document.getElementById('mon-expr').innerText = "Rest";
      }

      await sleepCancellable((item.duration / speed) * 1000);
      stopNote();

      updateControllerSVG({ L: false, R: false, A: false, X: false, Y: false, dUp: false, dDown: false, stickX: 0, stickY: 0, vibrato: false });
      if (playbackAborted) break;

      playheadTime = item.startTime + item.duration;
      document.getElementById('clock').innerText = `${formatClockTime(playheadTime)} / ${formatClockTime(totalSongSec)}`;
    }

    if (playbackAborted) break;
    if (isLooping) {
      clearPlayheadGlow();
      await sleepCancellable(380);
    }
  } while (isLooping && !playbackAborted);

  clearPlayheadGlow();
  stopNote();
  updateControllerSVG({ L: false, R: false, A: false, X: false, Y: false, dUp: false, dDown: false, stickX: 0, stickY: 0, vibrato: false });
  document.getElementById('mon-pitch').innerText = "---";
  document.getElementById('mon-detune').innerText = "0 cents";
  document.getElementById('mon-expr').innerText = "None";
  isPlaying = false;
  playbackAborted = false;
  document.getElementById('btn-record').disabled = false;
  updateSessionButtons();
}

function buildModifierIconsHtml(n, iconPx) {
  let icons = [];
  if (n.dpad === 1) icons.push(getDpadSvg('up', iconPx));
  if (n.dpad === -1) icons.push(getDpadSvg('down', iconPx));
  if (n.stickDir === 'up-full') icons.push(getStickSvg('up', 'full', iconPx));
  if (n.stickDir === 'up-half') icons.push(getStickSvg('up', 'half', iconPx));
  if (n.stickDir === 'down-full') icons.push(getStickSvg('down', 'full', iconPx));
  if (n.stickDir === 'down-half') icons.push(getStickSvg('down', 'half', iconPx));
  if (n.hasVibrato) icons.push(getStickSvg('vibrato', 'none', iconPx));
  return icons;
}

function renderSheetMusic() {
  const container = document.getElementById('sheet-music');
  const summaryBadge = document.getElementById('sheet-summary-badge');

  if (recordedEvents.length === 0) {
    if (summaryBadge) summaryBadge.innerText = "0 Notes";
    container.innerHTML = `<div class="sheet-empty">No notes recorded yet. Play notes with your controller, load from text, or import a .mid file!</div>`;
    return;
  }

  const count = recordedEvents.length;
  const lastEv = recordedEvents[count - 1];
  const totalSec = (lastEv.startTime + lastEv.duration).toFixed(1);
  if (summaryBadge) {
    summaryBadge.innerText = `${count} ${count === 1 ? 'Note' : 'Notes'} • ${totalSec}s`;
  }

  let iconPx = count <= 6 ? 32 : count <= 12 ? 28 : 24;
  let cardMinW = count <= 6 ? 112 : count <= 12 ? 98 : 84;
  let badgePx = count <= 6 ? 40 : count <= 12 ? 34 : 30;
  let badgeFont = count <= 6 ? 17 : count <= 12 ? 15 : 14;
  let pitchFont = count <= 6 ? 13 : 11.5;

  container.innerHTML = "";
  recordedEvents.forEach((n, idx) => {
    const card = document.createElement('div');
    card.className = `note-card ${n.isRest ? 'rest-card' : ''}`;
    card.style.minWidth = `${cardMinW}px`;
    card.style.padding = count <= 6 ? "12px 10px" : "8px 6px";
    card.onclick = () => auditionCard(idx);

    const bg = n.isRest ? "#334155" : (BASE_PITCHES[n.button]?.color || "#334155");
    const icons = buildModifierIconsHtml(n, iconPx);
    const iconRow = icons.length > 0
      ? `<div class="combo-icon-row" style="min-height:${iconPx}px;">${icons.join('')}</div>`
      : `<div style="min-height:${iconPx}px;"></div>`;

    const badgeSymbol = n.isRest ? "⏸" : n.button;
    const shoulderClass = (n.button === 'L' || n.button === 'R') ? `shoulder-${n.button.toLowerCase()}` : '';

    card.innerHTML = `
      <div class="card-delete-btn" title="Remove note" onclick="event.stopPropagation(); deleteCard(${idx});">✕</div>
      <div class="badge-icon ${shoulderClass}" style="background:${bg}; width:${badgePx}px; height:${badgePx}px; font-size:${badgeFont}px;">${badgeSymbol}</div>
      <div class="card-combo" style="flex-direction:column; gap:3px;">
        ${iconRow}
        <div class="combo-text ${icons.length === 0 ? 'natural-text' : ''}" style="font-size:${count <= 6 ? '11px' : '10px'};">${n.comboPlain}</div>
        ${showNoteDurations ? `<div class="card-dur-badge" title="Click to edit hold time" onclick="event.stopPropagation(); editCardDuration(${idx});">⏱ ${n.duration.toFixed(2)}s</div>` : ''}
      </div>
      <div class="card-pitch" style="font-size:${pitchFont}px; color:#cbd5e1; font-weight:700;">${n.pitch}</div>
    `;
    container.appendChild(card);
  });
  container.scrollTop = container.scrollHeight;
}

/**
 * ==============================================================================
 * MODULE 8: HIGH-PERFORMANCE MULTI-PAGE EXPORTER (LIGHTWEIGHT PDF, PNG, PRINT)
 * ==============================================================================
 */
function renderPrintableHTMLSheet() {
  const container = document.getElementById('sheet-pages-container');
  if (!container) return;

  const count = recordedEvents.length;
  if (count === 0) {
    container.innerHTML = `<div style="color:#94a3b8; padding:40px; text-align:center;">No notes to export.</div>`;
    return;
  }

  const lastEv = recordedEvents[count - 1];
  const totalTime = (lastEv.startTime + lastEv.duration).toFixed(1);

  // Pagination Architecture:
  // Page 1: 20 notes (accommodates title, header & full legend)
  // Page 2+: 25 notes per page (5 rows of 5)
  let pagesData = [];
  if (count <= 20) {
    pagesData.push(recordedEvents.slice(0));
  } else {
    pagesData.push(recordedEvents.slice(0, 20));
    let offset = 20;
    while (offset < count) {
      pagesData.push(recordedEvents.slice(offset, offset + 25));
      offset += 25;
    }
  }

  const totalPages = pagesData.length;
  const pageBadge = document.getElementById('modal-page-info');
  if (pageBadge) {
    pageBadge.innerText = `${totalPages} ${totalPages === 1 ? 'Page' : 'Pages'} • ${count} Notes`;
  }

  let tierClass = '';
  let iconPx = 32;
  if (count <= 6) { tierClass = 'tier-xl'; iconPx = 42; }
  else if (count <= 12) { tierClass = 'tier-lg'; iconPx = 36; }

  container.innerHTML = "";

  pagesData.forEach((pageNotes, pageIdx) => {
    const pageNum = pageIdx + 1;
    const isFirstPage = pageNum === 1;
    const globalOffset = isFirstPage ? 0 : 20 + (pageIdx - 1) * 25;

    const cardsHtml = pageNotes.map((n, idxOnPage) => {
      const globalIdx = globalOffset + idxOnPage;
      const rgb = n.isRest ? [71, 85, 105] : (BASE_PITCHES[n.button]?.hex || [100, 116, 139]);
      const badgeColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      const icons = buildModifierIconsHtml(n, iconPx);
      const isNatural = !n.pdfMod || n.pdfMod === "NATURAL";
      const badgeSymbol = n.isRest ? "⏸" : n.button;
      const shoulderClass = (n.button === 'L' || n.button === 'R') ? `shoulder-${n.button.toLowerCase()}` : '';

      return `
        <div class="print-card ${n.isRest ? 'rest-card' : ''}">
          <span class="print-card-step">#${globalIdx + 1}</span>
          <div class="print-badge ${shoulderClass}" style="background:${badgeColor};">${badgeSymbol}</div>
          <div class="print-mod-area">
            ${icons.length > 0 ? `<div class="combo-icon-row">${icons.join('')}</div>` : ''}
            <span class="print-mod-pill ${isNatural ? 'natural' : 'active'}">${isNatural ? 'Natural' : n.pdfMod}</span>
            ${showNoteDurations ? `<span class="print-dur-badge">⏱ ${n.duration.toFixed(2)}s</span>` : ''}
          </div>
          <div class="print-pitch">${n.pitch}</div>
        </div>
      `;
    }).join('');

    const pageEl = document.createElement('div');
    pageEl.className = 'sheet-page';

    let headerHtml = "";
    if (isFirstPage) {
      headerHtml = `
        <div>
          <div class="sheet-page-header">
            <h1>Ocarina of Time — Action Tablature</h1>
            <div class="sheet-page-meta">
              <span>🎵 Notes: ${count}</span>
              ${showNoteDurations ? `<span>•</span><span>⏱ ~${totalTime}s</span>` : ''}
              <span>•</span>
              <span>🎮 Switch 2 Standard Tuning</span>
              <span>•</span>
              <span>📄 Page 1 of ${totalPages}</span>
            </div>
          </div>
          <div class="sheet-page-legend">
            <div><b>1. Base Buttons:</b> [L] Low D4 &bull; [R] F4 &bull; [A] A4 &bull; [Y] B4 &bull; [X] High D5</div>
            <div><b>2. Modifiers:</b> D-Pad Up/Down (±1 semitone) &bull; Analog Stick Up/Down (Half ±1, Full ±2, Horiz = Vibrato)</div>
            ${showNoteDurations ? `<div><b>3. Timing:</b> Blue badge indicates hold duration in seconds.</div>` : ''}
          </div>
        </div>
      `;
    } else {
      headerHtml = `
        <div class="sheet-running-header">
          <span>Ocarina of Time — Action Tablature (Cont.)</span>
          <span>Page ${pageNum} of ${totalPages} &bull; Notes #${globalOffset + 1}–#${globalOffset + pageNotes.length}</span>
        </div>
      `;
    }

    const footerHtml = `
      <div class="sheet-page-footer">
        <span>Ocarina of Time Studio &bull; Switch 2 Tuning</span>
        <span>Page ${pageNum} of ${totalPages}</span>
      </div>
    `;

    pageEl.innerHTML = `
      ${headerHtml}
      <div class="sheet-page-grid ${tierClass}">
        ${cardsHtml}
      </div>
      ${footerHtml}
    `;

    container.appendChild(pageEl);
  });
}

function openExportModal() {
  if (recordedEvents.length === 0) return;
  const tModal = document.getElementById('toggle-time-modal');
  if (tModal) tModal.checked = showNoteDurations;
  renderPrintableHTMLSheet();
  document.getElementById('export-modal').style.display = 'flex';
}

function closeExportModal() {
  document.getElementById('export-modal').style.display = 'none';
}

/**
 * High-Speed, Lightweight Multi-Page PDF Exporter:
 * Generates compact ~1MB PDFs without UI lag.
 */
async function exportPDF() {
  if (recordedEvents.length === 0) return;
  const pageEls = document.querySelectorAll('.sheet-page');
  if (!pageEls || pageEls.length === 0) return;

  const btn = document.getElementById('btn-export-pdf');
  const origText = btn ? btn.innerHTML : "📄 Export PDF";
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `⏳ Exporting...`;
  }

  try {
    const { jsPDF } = window.jspdf;
    // Standard US Letter (612pt x 792pt)
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "letter",
      compress: true
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pageEls.length; i++) {
      if (btn) btn.innerHTML = `⏳ Page ${i + 1}/${pageEls.length}...`;
      await new Promise(r => setTimeout(r, 20));

      // Capture single page with balanced scale (1.8x gives ~170 DPI, crisp text & tiny memory footprint)
      const canvas = await html2canvas(pageEls[i], {
        scale: 1.8,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false
      });

      // High quality JPEG (0.90) compresses each page to ~180KB instead of 50MB raw PNG
      const imgData = canvas.toDataURL("image/jpeg", 0.90);

      if (i > 0) pdf.addPage("letter", "portrait");
      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
    }

    if (btn) btn.innerHTML = `⏳ Saving PDF...`;
    await new Promise(r => setTimeout(r, 20));
    pdf.save("ocarina_action_sheet.pdf");
  } catch (err) {
    console.error("PDF Export error:", err);
    alert("PDF generation encountered an error: " + err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  }
}

async function downloadPNG() {
  const pageEls = document.querySelectorAll('.sheet-page');
  if (!pageEls || pageEls.length === 0) return;

  const btn = document.getElementById('btn-export-png');
  const origText = btn ? btn.innerHTML : "🖼 Download PNG";
  if (btn) { btn.disabled = true; btn.innerHTML = "⏳ Generating..."; }

  try {
    for (let i = 0; i < pageEls.length; i++) {
      const canvas = await html2canvas(pageEls[i], {
        scale: 2.0,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false
      });
      const suffix = pageEls.length > 1 ? `_page_${i + 1}` : "";
      const a = document.createElement('a');
      a.download = `ocarina_action_sheet${suffix}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
      if (pageEls.length > 1) await new Promise(r => setTimeout(r, 300));
    }
  } catch (err) {
    alert("PNG download encountered an error: " + err.message);
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = origText; }
  }
}

function printSheet() {
  const container = document.getElementById('sheet-pages-container');
  if (!container) return;

  const win = window.open('', '_blank');
  if (!win) {
    alert("Pop-up blocked! Please allow pop-ups for this site or use the PDF download button.");
    return;
  }

  const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map(el => el.outerHTML)
    .join('\n');

  win.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Ocarina Tablature</title>
        ${styles}
        <style>
          body {
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
            display: block !important;
          }
          .sheet-pages-wrapper {
            gap: 0 !important;
            padding: 0 !important;
          }
          .sheet-page {
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            page-break-after: always !important;
            break-after: page !important;
            border-top: none !important;
          }
          @page {
            size: letter portrait;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="sheet-pages-wrapper">
          ${container.innerHTML}
        </div>
        <script>
          setTimeout(() => {
            window.focus();
            window.print();
          }, 350);
        <\/script>
      </body>
    </html>
  `);
  win.document.close();
}

/**
 * ==============================================================================
 * MODULE 9: FULL IMPORT & EXPORT SUBSYSTEM (MIDI, TXT, CLIPBOARD)
 * ==============================================================================
 */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2500);
}

function eventToTextToken(ev, idx, allEvents) {
  if (ev.isRest) return `REST:${Number((ev.duration || 0.44).toFixed(2))}`;

  let tok = ev.button;
  if (ev.dpad === 1) tok += "+#";
  else if (ev.dpad === -1) tok += "+b";

  if (ev.stickDir === 'up-full') tok += "+^^";
  else if (ev.stickDir === 'up-half') tok += "+^";
  else if (ev.stickDir === 'down-full') tok += "+vv";
  else if (ev.stickDir === 'down-half') tok += "+v";

  if (ev.hasVibrato) tok += "+~";

  const durVal = Number((ev.duration || 0.38).toFixed(2));
  tok += `:${durVal}`;

  if (allEvents && idx < allEvents.length - 1) {
    const nextEv = allEvents[idx + 1];
    const gap = nextEv.startTime - (ev.startTime + ev.duration);
    if (gap > 0.08) tok += `:${Number(gap.toFixed(2))}`;
  }

  return tok;
}

function exportTxtSong() {
  if (recordedEvents.length === 0) return;
  const textContent = recordedEvents.map((ev, idx, arr) => eventToTextToken(ev, idx, arr)).join(", ");
  const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
  downloadBlob(blob, "ocarina_song.txt");
}

async function copyTxtSong() {
  if (recordedEvents.length === 0) return;
  const textContent = recordedEvents.map((ev, idx, arr) => eventToTextToken(ev, idx, arr)).join(", ");
  const textarea = document.getElementById('text-notes-input');
  if (textarea) textarea.value = textContent;

  const btn = document.getElementById('btn-copy-txt');
  try {
    await navigator.clipboard.writeText(textContent);
    showCopySuccess(btn);
  } catch (err) {
    if (textarea) {
      textarea.select();
      document.execCommand('copy');
      showCopySuccess(btn);
    } else {
      alert("Failed to copy to clipboard.");
    }
  }
}

function showCopySuccess(btn) {
  if (!btn) return;
  const originalHtml = btn.innerHTML;
  btn.innerHTML = "✓ Copied!";
  btn.style.color = "#4ade80";
  setTimeout(() => {
    btn.innerHTML = originalHtml;
    btn.style.color = "";
  }, 1800);
}

function encodeVLQ(val) {
  val = Math.max(0, Math.round(val));
  let bytes = [val & 0x7F];
  val >>= 7;
  while (val > 0) {
    bytes.unshift((val & 0x7F) | 0x80);
    val >>= 7;
  }
  return bytes;
}

function generateMidiBlob(events) {
  const ticksPerBeat = 480;
  const ticksPerSec = 960;

  let rawEvents = [];
  events.forEach(n => {
    if (n.isRest || !n.midi) return;
    rawEvents.push({ time: n.startTime, type: 0x90, midi: n.midi, vel: 90 });
    rawEvents.push({ time: n.startTime + n.duration, type: 0x80, midi: n.midi, vel: 0 });
  });
  rawEvents.sort((a, b) => a.time === b.time ? a.type - b.type : a.time - b.time);

  let trackBytes = [];
  const nameBytes = [0x4F, 0x63, 0x61, 0x72, 0x69, 0x6E, 0x61];
  trackBytes.push(0x00, 0xFF, 0x03, nameBytes.length, ...nameBytes);
  trackBytes.push(0x00, 0xFF, 0x51, 0x03, 0x07, 0xA1, 0x20);
  trackBytes.push(0x00, 0xC0, 79);

  let lastTick = 0;
  rawEvents.forEach(ev => {
    let currentTick = Math.round(ev.time * ticksPerSec);
    let delta = Math.max(0, currentTick - lastTick);
    lastTick = currentTick;
    trackBytes.push(...encodeVLQ(delta));
    trackBytes.push(ev.type, ev.midi, ev.vel);
  });

  trackBytes.push(0x00, 0xFF, 0x2F, 0x00);

  let headerBytes = [
    0x4D, 0x54, 0x68, 0x64,
    0x00, 0x00, 0x00, 0x06,
    0x00, 0x00,
    0x00, 0x01,
    (ticksPerBeat >> 8) & 0xFF, ticksPerBeat & 0xFF
  ];

  let trkLen = trackBytes.length;
  let trkHeader = [
    0x4D, 0x54, 0x72, 0x6B,
    (trkLen >> 24) & 0xFF,
    (trkLen >> 16) & 0xFF,
    (trkLen >> 8) & 0xFF,
    trkLen & 0xFF
  ];

  const fullBytes = new Uint8Array([...headerBytes, ...trkHeader, ...trackBytes]);
  return new Blob([fullBytes], { type: 'audio/midi' });
}

function exportMidiSong() {
  if (recordedEvents.length === 0) return;
  const blob = generateMidiBlob(recordedEvents);
  downloadBlob(blob, "ocarina_song.mid");
}

function parseMidiFile(arrayBuffer) {
  const data = new DataView(arrayBuffer);
  let offset = 0;

  function readStr(len) {
    let str = "";
    for (let i = 0; i < len; i++) str += String.fromCharCode(data.getUint8(offset++));
    return str;
  }
  function readUint16() {
    const val = data.getUint16(offset);
    offset += 2;
    return val;
  }
  function readUint32() {
    const val = data.getUint32(offset);
    offset += 4;
    return val;
  }
  function readVLQ() {
    let val = 0;
    while (offset < data.byteLength) {
      let b = data.getUint8(offset++);
      val = (val << 7) | (b & 0x7F);
      if (!(b & 0x80)) break;
    }
    return val;
  }

  const headerTag = readStr(4);
  if (headerTag !== "MThd") throw new Error("File is not a valid Standard MIDI file (Missing MThd).");
  const headerLen = readUint32();
  const format = readUint16();
  const numTracks = readUint16();
  const division = readUint16();
  if (headerLen > 6) offset += (headerLen - 6);

  let rawNotes = [];

  for (let t = 0; t < numTracks; t++) {
    if (offset >= data.byteLength) break;
    const trackTag = readStr(4);
    const trackLen = readUint32();
    const trackEnd = offset + trackLen;

    let currentTicks = 0;
    let runningStatus = null;
    let activeNotes = {};

    while (offset < trackEnd && offset < data.byteLength) {
      const delta = readVLQ();
      currentTicks += delta;

      let status = data.getUint8(offset);
      if (status >= 0x80) {
        offset++;
        runningStatus = status;
      } else {
        status = runningStatus;
      }

      if (!status) break;

      const type = status & 0xF0;

      if (status === 0xFF) {
        offset++;
        const metaLen = readVLQ();
        offset += metaLen;
      } else if (status === 0xF0 || status === 0xF7) {
        offset += readVLQ();
      } else if (type === 0x90 || type === 0x80) {
        const note = data.getUint8(offset++);
        const vel = data.getUint8(offset++);
        const isNoteOn = (type === 0x90) && (vel > 0);

        if (isNoteOn) {
          if (!activeNotes[note]) activeNotes[note] = [];
          activeNotes[note].push(currentTicks);
        } else {
          if (activeNotes[note] && activeNotes[note].length > 0) {
            const startTick = activeNotes[note].shift();
            rawNotes.push({
              midi: note,
              startTick: startTick,
              durationTicks: Math.max(1, currentTicks - startTick)
            });
          }
        }
      } else if (type === 0xC0 || type === 0xD0) {
        offset++;
      } else if (type === 0xA0 || type === 0xB0 || type === 0xE0) {
        offset += 2;
      } else {
        offset++;
      }
    }
    offset = trackEnd;
  }

  rawNotes.sort((a, b) => a.startTick - b.startTick);
  return { rawNotes, division: (division > 0 ? division : 480) };
}

function importMidiArrayBuffer(buffer) {
  const { rawNotes, division } = parseMidiFile(buffer);
  if (!rawNotes || rawNotes.length === 0) {
    alert("No MIDI note data found in this file.");
    return;
  }

  const avgPitch = rawNotes.reduce((acc, n) => acc + n.midi, 0) / rawNotes.length;
  let octaveShift = 0;
  while (avgPitch + (octaveShift * 12) < 61) octaveShift++;
  while (avgPitch + (octaveShift * 12) > 75) octaveShift--;

  const minTick = rawNotes[0].startTick;
  const ticksPerSec = division * 2;

  let monoNotes = [];
  rawNotes.forEach(rn => {
    let sTime = (rn.startTick - minTick) / ticksPerSec;
    let dur = Math.max(0.18, rn.durationTicks / ticksPerSec);
    let pitch = rn.midi + (octaveShift * 12);

    if (monoNotes.length > 0 && Math.abs(sTime - monoNotes[monoNotes.length - 1].startTime) < 0.05) {
      if (pitch > monoNotes[monoNotes.length - 1].midi) {
        monoNotes[monoNotes.length - 1].midi = pitch;
      }
      return;
    }
    monoNotes.push({ midi: pitch, startTime: sTime, duration: dur });
  });

  const parsed = [];
  monoNotes.forEach((mn, idx) => {
    const targetMidi = Math.max(59, Math.min(77, Math.round(mn.midi)));
    const guide = CHROMATIC_GUIDE.find(item => item.midi === targetMidi) || CHROMATIC_GUIDE[3];

    let comboTokens = [];
    let pdfTokens = [];
    if (guide.dpad === 1) { comboTokens.push("D-Pad ▲"); pdfTokens.push("D-PAD UP"); }
    else if (guide.dpad === -1) { comboTokens.push("D-Pad ▼"); pdfTokens.push("D-PAD DN"); }

    if (guide.stickDir === 'up-full') { comboTokens.push("Stick ⮝ Full"); pdfTokens.push("STICK UP FULL"); }
    else if (guide.stickDir === 'down-full') { comboTokens.push("Stick ⮟ Full"); pdfTokens.push("STICK DN FULL"); }

    const nextMn = monoNotes[idx + 1];
    const gapAfter = nextMn ? Math.max(0, nextMn.startTime - (mn.startTime + mn.duration)) : 0.06;

    parsed.push({
      isRest: false,
      button: guide.btn,
      dpad: guide.dpad || 0,
      stickDir: guide.stickDir || null,
      comboDisplay: comboTokens.length > 0 ? comboTokens.join("<br>") : "(Natural)",
      comboPlain: comboTokens.length > 0 ? "+ " + comboTokens.join(" + ") : "(Natural)",
      pdfMod: pdfTokens.length > 0 ? pdfTokens.join(" + ") : "NATURAL",
      hasVibrato: false,
      pitch: guide.pitch.split('/')[0].trim(),
      midi: guide.midi,
      startTime: mn.startTime,
      duration: mn.duration,
      gap: gapAfter
    });
  });

  if (parsed.length > 0) {
    pushHistory();
    recordedEvents = parsed;
    syncInputsFromEvents();
    renderSheetMusic();
    updateSessionButtons();
    saveToLocalStorage();
  }
}

function handleFileImport(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const fileName = file.name.toLowerCase();
  if (fileName.endsWith('.txt')) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      document.getElementById('text-notes-input').value = evt.target.result;
      loadFromTextInput(true);
    };
    reader.readAsText(file);
  } else if (fileName.endsWith('.mid') || fileName.endsWith('.midi')) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      try {
        importMidiArrayBuffer(evt.target.result);
      } catch (err) {
        console.error("MIDI parsing error:", err);
        alert("Failed to load MIDI file: " + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  } else {
    alert("Please select a .txt or .mid/.midi file.");
  }
  e.target.value = "";
}

requestAnimationFrame(pollInput);
