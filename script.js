const GREEN = "#5eae52";
const YELLOW = "#e8c14a";
const RED = "#c0553f";
const NEUTRAL = "#6b6154";
const IDLE_NOTE_COLOR = "#f2ebe1";
const TOLERANCE = 5; // cent - bu kadar yakınsa "akort tamam" sayılır
const SOMEWHAT = 18; // cent - bu aralıkta "biraz pes/tiz", ötesi "çok pes/tiz"

// Dil adları her zaman kendi dilinde yazılır (çevrilmez) - bu bir yerleşik gelenek,
// Türkçe arayüzde bile "Deutsch" hep "Deutsch" yazar, "Almanca" değil.
const LANGS = [
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
];

const TRANSLATIONS = {
  tr: {
    brandTitle: "Gitar Akort", brandSubtitle: "Standart akort · EADGBE",
    micOff: "kapalı", micOn: "aktif", micDenied: "mikrofon reddedildi",
    playAString: "Bir tel çal", inTune: "Akort tamam ✓",
    slightlyFlat: "Biraz pes", slightlySharp: "Biraz tiz",
    veryFlat: "Çok pes", verySharp: "Çok tiz", listening: "Dinleniyor…",
    historyLabel: "Son birkaç saniye",
    startMic: "Mikrofonu Başlat", stopMic: "Mikrofonu Durdur",
    hintNormal: "Teli tek başına çal, sabit tut ve göstergeyi ortala.",
    hintError: "Mikrofon erişimi reddedildi — tarayıcı ayarlarından izin ver.",
  },
  en: {
    brandTitle: "Guitar Tuner", brandSubtitle: "Standard tuning · EADGBE",
    micOff: "off", micOn: "active", micDenied: "microphone denied",
    playAString: "Play a string", inTune: "In tune ✓",
    slightlyFlat: "Slightly flat", slightlySharp: "Slightly sharp",
    veryFlat: "Very flat", verySharp: "Very sharp", listening: "Listening…",
    historyLabel: "Last few seconds",
    startMic: "Start Microphone", stopMic: "Stop Microphone",
    hintNormal: "Pluck one string, hold it steady, and center the needle.",
    hintError: "Microphone access denied — allow it in your browser settings.",
  },
  es: {
    brandTitle: "Afinador de Guitarra", brandSubtitle: "Afinación estándar · EADGBE",
    micOff: "apagado", micOn: "activo", micDenied: "micrófono denegado",
    playAString: "Toca una cuerda", inTune: "Afinado ✓",
    slightlyFlat: "Un poco grave", slightlySharp: "Un poco agudo",
    veryFlat: "Muy grave", verySharp: "Muy agudo", listening: "Escuchando…",
    historyLabel: "Últimos segundos",
    startMic: "Iniciar Micrófono", stopMic: "Detener Micrófono",
    hintNormal: "Toca una sola cuerda, mantenla estable y centra la aguja.",
    hintError: "Acceso al micrófono denegado — permítelo en la configuración del navegador.",
  },
  fr: {
    brandTitle: "Accordeur de Guitare", brandSubtitle: "Accordage standard · EADGBE",
    micOff: "désactivé", micOn: "actif", micDenied: "micro refusé",
    playAString: "Joue une corde", inTune: "Accordé ✓",
    slightlyFlat: "Légèrement bas", slightlySharp: "Légèrement haut",
    veryFlat: "Trop bas", verySharp: "Trop haut", listening: "Écoute…",
    historyLabel: "Dernières secondes",
    startMic: "Démarrer le Micro", stopMic: "Arrêter le Micro",
    hintNormal: "Joue une seule corde, tiens-la stable et centre l'aiguille.",
    hintError: "Accès au micro refusé — autorise-le dans les paramètres du navigateur.",
  },
  de: {
    brandTitle: "Gitarrenstimmgerät", brandSubtitle: "Standardstimmung · EADGBE",
    micOff: "aus", micOn: "aktiv", micDenied: "Mikrofon verweigert",
    playAString: "Spiele eine Saite", inTune: "Gestimmt ✓",
    slightlyFlat: "Etwas zu tief", slightlySharp: "Etwas zu hoch",
    veryFlat: "Viel zu tief", verySharp: "Viel zu hoch", listening: "Hört zu…",
    historyLabel: "Letzte Sekunden",
    startMic: "Mikrofon Starten", stopMic: "Mikrofon Stoppen",
    hintNormal: "Spiele eine einzelne Saite, halte sie ruhig und zentriere die Nadel.",
    hintError: "Mikrofonzugriff verweigert — erlaube ihn in den Browsereinstellungen.",
  },
  it: {
    brandTitle: "Accordatore per Chitarra", brandSubtitle: "Accordatura standard · EADGBE",
    micOff: "spento", micOn: "attivo", micDenied: "microfono negato",
    playAString: "Suona una corda", inTune: "Accordato ✓",
    slightlyFlat: "Leggermente basso", slightlySharp: "Leggermente alto",
    veryFlat: "Troppo basso", verySharp: "Troppo alto", listening: "In ascolto…",
    historyLabel: "Ultimi secondi",
    startMic: "Avvia Microfono", stopMic: "Ferma Microfono",
    hintNormal: "Suona una singola corda, tienila ferma e centra l'indicatore.",
    hintError: "Accesso al microfono negato — consentilo nelle impostazioni del browser.",
  },
  pt: {
    brandTitle: "Afinador de Violão", brandSubtitle: "Afinação padrão · EADGBE",
    micOff: "desligado", micOn: "ativo", micDenied: "microfone negado",
    playAString: "Toque uma corda", inTune: "Afinado ✓",
    slightlyFlat: "Um pouco grave", slightlySharp: "Um pouco agudo",
    veryFlat: "Muito grave", verySharp: "Muito agudo", listening: "Ouvindo…",
    historyLabel: "Últimos segundos",
    startMic: "Iniciar Microfone", stopMic: "Parar Microfone",
    hintNormal: "Toque uma única corda, mantenha-a estável e centralize a agulha.",
    hintError: "Acesso ao microfone negado — permita nas configurações do navegador.",
  },
  ru: {
    brandTitle: "Гитарный Тюнер", brandSubtitle: "Стандартный строй · EADGBE",
    micOff: "выкл", micOn: "активен", micDenied: "микрофон запрещён",
    playAString: "Сыграй струну", inTune: "Настроено ✓",
    slightlyFlat: "Чуть ниже", slightlySharp: "Чуть выше",
    veryFlat: "Сильно ниже", verySharp: "Сильно выше", listening: "Слушаю…",
    historyLabel: "Последние секунды",
    startMic: "Включить Микрофон", stopMic: "Выключить Микрофон",
    hintNormal: "Сыграй одну струну, держи её ровно и центрируй стрелку.",
    hintError: "Доступ к микрофону запрещён — разрешите его в настройках браузера.",
  },
  zh: {
    brandTitle: "吉他调音器", brandSubtitle: "标准调弦 · EADGBE",
    micOff: "关闭", micOn: "已开启", micDenied: "麦克风被拒绝",
    playAString: "弹一根弦", inTune: "音准 ✓",
    slightlyFlat: "略低", slightlySharp: "略高",
    veryFlat: "过低", verySharp: "过高", listening: "聆听中…",
    historyLabel: "最近几秒",
    startMic: "开启麦克风", stopMic: "停止麦克风",
    hintNormal: "只弹一根弦，保持稳定，让指针居中。",
    hintError: "麦克风访问被拒绝——请在浏览器设置中允许。",
  },
  ar: {
    brandTitle: "ضابط أوتار الغيتار", brandSubtitle: "الضبط القياسي · EADGBE",
    micOff: "متوقف", micOn: "نشط", micDenied: "تم رفض الميكروفون",
    playAString: "اعزف على وتر", inTune: "مضبوط ✓",
    slightlyFlat: "منخفض قليلاً", slightlySharp: "حاد قليلاً",
    veryFlat: "منخفض جداً", verySharp: "حاد جداً", listening: "يستمع…",
    historyLabel: "الثواني الأخيرة",
    startMic: "تشغيل الميكروفون", stopMic: "إيقاف الميكروفون",
    hintNormal: "اعزف على وتر واحد فقط، ثبّته، وتوسيط المؤشر.",
    hintError: "تم رفض الوصول إلى الميكروفون — يرجى السماح به في إعدادات المتصفح.",
  },
};

let currentLang = "tr";
function t(key) {
  return TRANSLATIONS[currentLang][key];
}

const themeSwatches = Array.from(document.querySelectorAll(".theme-swatch"));
const savedTheme = localStorage.getItem("gitar-akort-theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

themeSwatches.forEach((swatch) => {
  if (swatch.dataset.theme === (savedTheme || "amber")) {
    themeSwatches.forEach((s) => s.classList.remove("selected"));
    swatch.classList.add("selected");
  }
  swatch.addEventListener("click", () => {
    document.documentElement.setAttribute("data-theme", swatch.dataset.theme);
    localStorage.setItem("gitar-akort-theme", swatch.dataset.theme);
    themeSwatches.forEach((s) => s.classList.toggle("selected", s === swatch));
  });
});

const stringNodes = Array.from(document.querySelectorAll(".string-node"));
const STRINGS = stringNodes.map((node) => ({
  label: node.dataset.note,
  freq: parseFloat(node.dataset.freq),
  el: node,
}));

const noteBadgeEl = document.getElementById("note-badge");
const hzValueEl = document.getElementById("hz-value");
const centsNeedle = document.getElementById("cents-needle");
const centsNeedleHub = document.getElementById("cents-needle-hub");
const centsGaugeValue = document.getElementById("cents-gauge-value");
const statusBubbleEl = document.getElementById("status-bubble");
const historyCanvas = document.getElementById("history-canvas");
const historyCtx = historyCanvas.getContext("2d");
const micBtn = document.getElementById("mic-btn");
const micBtnText = document.getElementById("mic-btn-text");
const micStatusEl = document.getElementById("mic-status");
const micStatusTextEl = document.getElementById("mic-status-text");
const hintTextEl = document.getElementById("hint-text");
const brandTitleEl = document.getElementById("brand-title");
const brandSubtitleEl = document.getElementById("brand-subtitle");
const historyLabelEl = document.getElementById("history-label");
const langBtn = document.getElementById("lang-btn");
const langBtnFlag = document.getElementById("lang-btn-flag");
const langMenu = document.getElementById("lang-menu");

LANGS.forEach((lang) => {
  const opt = document.createElement("button");
  opt.type = "button";
  opt.className = "lang-option";
  opt.dataset.code = lang.code;
  opt.innerHTML = `<span>${lang.flag}</span><span>${lang.name}</span>`;
  opt.addEventListener("click", () => {
    currentLang = lang.code;
    langMenu.classList.remove("open");
    applyLanguage();
  });
  langMenu.appendChild(opt);
});

langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  langMenu.classList.toggle("open");
});
document.addEventListener("click", () => langMenu.classList.remove("open"));

function applyLanguage() {
  const lang = LANGS.find((l) => l.code === currentLang);
  langBtnFlag.textContent = lang.flag;
  langMenu.querySelectorAll(".lang-option").forEach((opt) => {
    opt.classList.toggle("selected", opt.dataset.code === currentLang);
  });
  brandTitleEl.textContent = t("brandTitle");
  brandSubtitleEl.textContent = t("brandSubtitle");
  historyLabelEl.textContent = t("historyLabel");
  render();
}

let selectedIndex = STRINGS.findIndex((s) => s.label === "E2");
let listening = false;
let error = null;
let smooth = null;

let stream = null;
let audioCtx = null;
let analyser = null;
let buffer = null;
let rafId = null;

let silentFrames = 0;
let pendingFreq = null;
let pendingCount = 0;
const OUTLIER_RATIO = 0.08; // %8'den fazla ani sapma "şüpheli" sayılır
const CONFIRM_FRAMES = 4; // yeni değer üst üste bu kadar karede tekrar ederse "gerçek" kabul edilir
const SILENT_FRAMES_TO_RESET = 45; // tel sönerken kısa sessiz anlar olabiliyor, gösterge hemen sıfırlanmasın (~0.75sn tolerans)

const HISTORY_LENGTH = 150; // ~2-3 saniyelik geçmiş (frame hızına bağlı)
let centsHistory = new Array(HISTORY_LENGTH).fill(null);

stringNodes.forEach((node, index) => {
  node.addEventListener("click", () => {
    selectedIndex = index;
    stringNodes.forEach((n, i) => n.classList.toggle("active", i === index));
    render();
  });
});
stringNodes[selectedIndex].classList.add("active");

micBtn.addEventListener("click", () => {
  listening ? stopMic() : startMic();
});

async function startMic() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      // autoGainControl: true - tarayıcı kısık gelen sesi otomatik yükseltsin,
      // yoksa hafif çalınan teller eşik değerinin altında kalıp algılanmıyordu.
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: true },
    });
    audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
    buffer = new Float32Array(analyser.fftSize);
    smooth = null;
    listening = true;
    error = null;
    render();
    loop();
  } catch (e) {
    error = "mic";
    render();
  }
}

function stopMic() {
  if (rafId) cancelAnimationFrame(rafId);
  if (stream) stream.getTracks().forEach((t) => t.stop());
  if (audioCtx) audioCtx.close();
  stream = audioCtx = analyser = buffer = rafId = null;
  listening = false;
  smooth = null;
  render();
}

function loop() {
  if (!analyser) return;
  analyser.getFloatTimeDomainData(buffer);
  const f = autoCorrelate(buffer, audioCtx.sampleRate);

  if (f > 0) {
    silentFrames = 0;

    if (smooth == null) {
      smooth = f;
    } else {
      const deviation = Math.abs(f - smooth) / smooth;
      if (deviation < OUTLIER_RATIO) {
        // Normal küçük dalgalanma: üstel yumuşatma (exponential smoothing) ile
        // yeni değeri eskisiyle harmanlıyoruz, tek karede tam yerine geçmiyor.
        smooth = smooth * 0.88 + f * 0.12;
        pendingFreq = null;
        pendingCount = 0;
      } else {
        // Büyük bir sapma: bu ya anlık bir hatalı okuma ya da gerçekten
        // başka bir tele geçtin demek. Tek kareye güvenmek yerine, aynı yeni
        // değer birkaç kare üst üste tekrar ederse "gerçek" kabul ediyoruz.
        if (pendingFreq != null && Math.abs(f - pendingFreq) / pendingFreq < OUTLIER_RATIO) {
          pendingCount++;
        } else {
          pendingFreq = f;
          pendingCount = 1;
        }
        if (pendingCount >= CONFIRM_FRAMES) {
          smooth = f;
          pendingFreq = null;
          pendingCount = 0;
        }
      }
    }
  } else {
    silentFrames++;
    if (silentFrames > SILENT_FRAMES_TO_RESET) {
      smooth = null;
      pendingFreq = null;
      pendingCount = 0;
    }
  }

  render();
  rafId = requestAnimationFrame(loop);
}

function render() {
  const target = STRINGS[selectedIndex].freq;
  const hz = smooth;

  let cents = null;
  if (hz) cents = 1200 * Math.log2(hz / target);
  const clamped = cents == null ? 0 : Math.max(-50, Math.min(50, cents));
  const needleDeg = (clamped / 50) * 45;

  let statusColor = NEUTRAL;
  let statusText = t("playAString");
  let noteColor = IDLE_NOTE_COLOR;

  if (cents != null) {
    const a = Math.abs(cents);
    if (a <= TOLERANCE) {
      statusColor = GREEN;
      statusText = t("inTune");
    } else if (a <= SOMEWHAT) {
      statusColor = YELLOW;
      statusText = cents < 0 ? t("slightlyFlat") : t("slightlySharp");
    } else {
      statusColor = RED;
      statusText = cents < 0 ? t("veryFlat") : t("verySharp");
    }
    noteColor = statusColor;
  } else if (listening) {
    statusText = t("listening");
  }

  noteBadgeEl.textContent = STRINGS[selectedIndex].label;
  noteBadgeEl.style.color = noteColor;
  noteBadgeEl.style.borderColor = statusColor;
  hzValueEl.textContent = hz ? hz.toFixed(1) : "—";

  centsNeedle.setAttribute("transform", `rotate(${needleDeg} 30 30)`);
  centsNeedle.style.stroke = statusColor;
  centsNeedleHub.style.fill = statusColor;
  centsGaugeValue.textContent = cents != null ? (cents > 0 ? "+" : "") + Math.round(cents) : "—";

  statusBubbleEl.textContent = statusText;
  statusBubbleEl.style.color = statusColor;
  statusBubbleEl.style.borderColor = cents != null ? statusColor : "";

  centsHistory.push(cents);
  if (centsHistory.length > HISTORY_LENGTH) centsHistory.shift();
  drawHistory(statusColor);

  // Seçili tel düğmesini akort durumuna göre boyuyoruz; diğerlerini
  // varsayılana döndürüyoruz ki eski renk üstünde kalmasın.
  stringNodes.forEach((node, i) => {
    const circle = node.querySelector("circle");
    const text = node.querySelector("text");
    if (i === selectedIndex && cents != null) {
      circle.style.fill = statusColor;
      circle.style.stroke = statusColor;
      text.style.fill = "#1a1410";
    } else {
      circle.style.fill = "";
      circle.style.stroke = "";
      text.style.fill = "";
    }
  });

  micStatusEl.classList.toggle("active", listening);
  micStatusTextEl.textContent = error ? t("micDenied") : listening ? t("micOn") : t("micOff");

  micBtn.classList.toggle("listening", listening);
  micBtnText.textContent = listening ? t("stopMic") : t("startMic");

  hintTextEl.textContent = error ? t("hintError") : t("hintNormal");
}

// centsHistory içindeki son N ölçümü küçük bir çizgi grafiğe dönüştürüyoruz.
// Merkez çizgi (0 cent = tam akort) sabit, geçmiş değerler soldan sağa akıyor.
// Amaç: anlık iğneye ek olarak "yaklaşıyor muyum uzaklaşıyor muyum" hissini vermek.
function drawHistory(lineColor) {
  const w = historyCanvas.width;
  const h = historyCanvas.height;
  historyCtx.clearRect(0, 0, w, h);

  historyCtx.strokeStyle = "rgba(242, 235, 225, 0.2)";
  historyCtx.lineWidth = 1;
  historyCtx.beginPath();
  historyCtx.moveTo(0, h / 2);
  historyCtx.lineTo(w, h / 2);
  historyCtx.stroke();

  historyCtx.strokeStyle = lineColor;
  historyCtx.lineWidth = 2;
  historyCtx.lineJoin = "round";
  historyCtx.lineCap = "round";
  historyCtx.beginPath();

  let penDown = false;
  for (let i = 0; i < centsHistory.length; i++) {
    const value = centsHistory[i];
    if (value == null) {
      penDown = false;
      continue;
    }
    const clamped = Math.max(-50, Math.min(50, value));
    const x = (i / (HISTORY_LENGTH - 1)) * w;
    const y = h / 2 - (clamped / 50) * (h / 2 - 6);
    if (!penDown) {
      historyCtx.moveTo(x, y);
      penDown = true;
    } else {
      historyCtx.lineTo(x, y);
    }
  }
  historyCtx.stroke();
}

// Autocorrelation: sinyali kendi kopyasıyla farklı kaydırmalarda (lag)
// karşılaştırıp en çok "kendine benzediği" kaydırmayı buluyoruz. O kaydırma
// miktarı sesin bir periyodu kadar sürüyor demektir, frekansı (Hz) da
// örnekleme hızı / periyot ile hesaplıyoruz. Gitar aralığı dışı (60-500 Hz)
// sonuçları eleyerek yanlış harmonik yakalamalarını azaltıyoruz.
function autoCorrelate(buf, sampleRate) {
  let size = buf.length;
  let rms = 0;
  for (let i = 0; i < size; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / size);
  if (rms < 0.0025) return -1; // çok sessiz (kısık çalınan/sönmekte olan tel için düşürüldü)

  let r1 = 0;
  let r2 = size - 1;
  const threshold = 0.2;
  for (let i = 0; i < size / 2; i++) {
    if (Math.abs(buf[i]) < threshold) { r1 = i; break; }
  }
  for (let i = 1; i < size / 2; i++) {
    if (Math.abs(buf[size - i]) < threshold) { r2 = size - i; break; }
  }

  const trimmed = buf.slice(r1, r2);
  size = trimmed.length;

  const correlations = new Array(size).fill(0);
  for (let lag = 0; lag < size; lag++) {
    for (let i = 0; i < size - lag; i++) {
      correlations[lag] += trimmed[i] * trimmed[i + lag];
    }
  }

  let d = 0;
  while (d < size - 1 && correlations[d] > correlations[d + 1]) d++;

  let maxValue = -1;
  let bestLag = -1;
  for (let i = d; i < size; i++) {
    if (correlations[i] > maxValue) {
      maxValue = correlations[i];
      bestLag = i;
    }
  }

  let refinedLag = bestLag;
  const x1 = correlations[bestLag - 1] || 0;
  const x2 = correlations[bestLag];
  const x3 = correlations[bestLag + 1] || 0;
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) refinedLag = bestLag - b / (2 * a);

  const frequency = sampleRate / refinedLag;
  if (frequency < 60 || frequency > 500) return -1;
  return frequency;
}

applyLanguage();
