const STORAGE_KEY = "pollaMundialista2026_v2";
const THEME_KEY = "pollaMundialistaTheme";
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/;
const DEFAULT_API_URL = "/api/worldcup-results";
const AUTO_SYNC_INTERVAL_MS = 5 * 60 * 1000;
const INACTIVITY_LIMIT_MS = 5 * 60 * 1000;
const SUPER_ADMIN = {
  username: "jomy2646",
  email: "jomy2646@gmail.com",
  password: "Compadres2026",
  role: "admin",
};
const DEFAULT_SETTINGS = {
  apiUrl: DEFAULT_API_URL,
  autoSync: true,
  lastSync: null,
  tournamentClosed: false,
  winnerUsername: null,
  winnerName: null,
  winnerDeclaredAt: null,
};

const officialMatches = [
  ["m001", "group", "Grupo A", "Mexico", "Sudafrica", "2026-06-11T13:00:00-06:00", "Estadio Azteca", "Ciudad de Mexico"],
  ["m002", "group", "Grupo A", "Corea del Sur", "Chequia", "2026-06-11T20:00:00-06:00", "Estadio Akron", "Zapopan"],
  ["m003", "group", "Grupo B", "Canada", "Bosnia y Herzegovina", "2026-06-12T15:00:00-04:00", "BMO Field", "Toronto"],
  ["m004", "group", "Grupo D", "Estados Unidos", "Paraguay", "2026-06-12T18:00:00-07:00", "SoFi Stadium", "Inglewood"],
  ["m005", "group", "Grupo B", "Qatar", "Suiza", "2026-06-13T12:00:00-07:00", "Levi's Stadium", "Santa Clara"],
  ["m006", "group", "Grupo C", "Brasil", "Marruecos", "2026-06-13T18:00:00-04:00", "Gillette Stadium", "Foxborough"],
  ["m007", "group", "Grupo C", "Haiti", "Escocia", "2026-06-13T21:00:00-04:00", "MetLife Stadium", "East Rutherford"],
  ["m008", "group", "Grupo D", "Australia", "Turquia", "2026-06-13T21:00:00-07:00", "BC Place", "Vancouver"],
  ["m009", "group", "Grupo E", "Costa de Marfil", "Ecuador", "2026-06-14T13:00:00-04:00", "Lincoln Financial Field", "Philadelphia"],
  ["m010", "group", "Grupo F", "Paises Bajos", "Japon", "2026-06-14T15:00:00-05:00", "AT&T Stadium", "Arlington"],
  ["m011", "group", "Grupo E", "Alemania", "Curazao", "2026-06-14T18:00:00-05:00", "NRG Stadium", "Houston"],
  ["m012", "group", "Grupo F", "Suecia", "Tunez", "2026-06-14T20:00:00-06:00", "Estadio BBVA", "Guadalupe"],
  ["m013", "group", "Grupo H", "Espana", "Cabo Verde", "2026-06-15T12:00:00-04:00", "Mercedes-Benz Stadium", "Atlanta"],
  ["m014", "group", "Grupo G", "Belgica", "Egipto", "2026-06-15T12:00:00-07:00", "Lumen Field", "Seattle"],
  ["m015", "group", "Grupo H", "Arabia Saudita", "Uruguay", "2026-06-15T18:00:00-04:00", "Hard Rock Stadium", "Miami Gardens"],
  ["m016", "group", "Grupo G", "Iran", "Nueva Zelanda", "2026-06-15T18:00:00-07:00", "SoFi Stadium", "Inglewood"],
  ["m017", "group", "Grupo I", "Francia", "Senegal", "2026-06-16T15:00:00-04:00", "MetLife Stadium", "East Rutherford"],
  ["m018", "group", "Grupo I", "Irak", "Noruega", "2026-06-16T18:00:00-04:00", "Gillette Stadium", "Foxborough"],
  ["m019", "group", "Grupo J", "Argentina", "Argelia", "2026-06-16T20:00:00-05:00", "Arrowhead Stadium", "Kansas City"],
  ["m020", "group", "Grupo J", "Austria", "Jordania", "2026-06-16T21:00:00-07:00", "Levi's Stadium", "Santa Clara"],
  ["m021", "group", "Grupo K", "Portugal", "RD Congo", "2026-06-17T12:00:00-05:00", "NRG Stadium", "Houston"],
  ["m022", "group", "Grupo L", "Inglaterra", "Croacia", "2026-06-17T15:00:00-05:00", "AT&T Stadium", "Arlington"],
  ["m023", "group", "Grupo L", "Ghana", "Panama", "2026-06-17T19:00:00-04:00", "BMO Field", "Toronto"],
  ["m024", "group", "Grupo K", "Uzbekistan", "Colombia", "2026-06-17T20:00:00-06:00", "Estadio Azteca", "Ciudad de Mexico"],
  ["m025", "group", "Grupo B", "Suiza", "Bosnia y Herzegovina", "2026-06-18T12:00:00-07:00", "SoFi Stadium", "Inglewood"],
  ["m026", "group", "Grupo A", "Chequia", "Sudafrica", "2026-06-18T12:00:00-04:00", "Mercedes-Benz Stadium", "Atlanta"],
  ["m027", "group", "Grupo B", "Canada", "Qatar", "2026-06-18T15:00:00-07:00", "BC Place", "Vancouver"],
  ["m028", "group", "Grupo A", "Mexico", "Corea del Sur", "2026-06-18T19:00:00-06:00", "Estadio Akron", "Zapopan"],
  ["m029", "group", "Grupo D", "Estados Unidos", "Australia", "2026-06-19T12:00:00-07:00", "Lumen Field", "Seattle"],
  ["m030", "group", "Grupo C", "Escocia", "Marruecos", "2026-06-19T18:00:00-04:00", "Lincoln Financial Field", "Philadelphia"],
  ["m031", "group", "Grupo C", "Brasil", "Haiti", "2026-06-19T21:00:00-04:00", "Gillette Stadium", "Foxborough"],
  ["m032", "group", "Grupo D", "Turquia", "Paraguay", "2026-06-19T21:00:00-07:00", "Levi's Stadium", "Santa Clara"],
  ["m033", "group", "Grupo F", "Paises Bajos", "Suecia", "2026-06-20T12:00:00-05:00", "NRG Stadium", "Houston"],
  ["m034", "group", "Grupo E", "Alemania", "Costa de Marfil", "2026-06-20T16:00:00-04:00", "BMO Field", "Toronto"],
  ["m035", "group", "Grupo E", "Ecuador", "Curazao", "2026-06-20T19:00:00-05:00", "Arrowhead Stadium", "Kansas City"],
  ["m036", "group", "Grupo F", "Tunez", "Japon", "2026-06-20T22:00:00-06:00", "Estadio BBVA", "Guadalupe"],
  ["m037", "group", "Grupo H", "Espana", "Arabia Saudita", "2026-06-21T12:00:00-04:00", "Mercedes-Benz Stadium", "Atlanta"],
  ["m038", "group", "Grupo G", "Belgica", "Iran", "2026-06-21T12:00:00-07:00", "SoFi Stadium", "Inglewood"],
  ["m039", "group", "Grupo H", "Uruguay", "Cabo Verde", "2026-06-21T18:00:00-04:00", "Hard Rock Stadium", "Miami Gardens"],
  ["m040", "group", "Grupo G", "Nueva Zelanda", "Egipto", "2026-06-21T18:00:00-07:00", "BC Place", "Vancouver"],
  ["m041", "group", "Grupo J", "Argentina", "Austria", "2026-06-22T12:00:00-05:00", "AT&T Stadium", "Arlington"],
  ["m042", "group", "Grupo I", "Francia", "Irak", "2026-06-22T17:00:00-04:00", "Lincoln Financial Field", "Philadelphia"],
  ["m043", "group", "Grupo J", "Jordania", "Argelia", "2026-06-22T20:00:00-07:00", "Levi's Stadium", "Santa Clara"],
  ["m044", "group", "Grupo I", "Noruega", "Senegal", "2026-06-22T20:00:00-04:00", "MetLife Stadium", "East Rutherford"],
  ["m045", "group", "Grupo K", "Portugal", "Uzbekistan", "2026-06-23T12:00:00-05:00", "NRG Stadium", "Houston"],
  ["m046", "group", "Grupo L", "Inglaterra", "Ghana", "2026-06-23T16:00:00-04:00", "Gillette Stadium", "Foxborough"],
  ["m047", "group", "Grupo L", "Panama", "Croacia", "2026-06-23T19:00:00-04:00", "BMO Field", "Toronto"],
  ["m048", "group", "Grupo K", "Colombia", "RD Congo", "2026-06-23T20:00:00-06:00", "Estadio Akron", "Zapopan"],
  ["m049", "group", "Grupo B", "Suiza", "Canada", "2026-06-24T12:00:00-07:00", "BC Place", "Vancouver"],
  ["m050", "group", "Grupo B", "Bosnia y Herzegovina", "Qatar", "2026-06-24T12:00:00-07:00", "Lumen Field", "Seattle"],
  ["m051", "group", "Grupo C", "Escocia", "Brasil", "2026-06-24T18:00:00-04:00", "Hard Rock Stadium", "Miami Gardens"],
  ["m052", "group", "Grupo C", "Marruecos", "Haiti", "2026-06-24T18:00:00-04:00", "Mercedes-Benz Stadium", "Atlanta"],
  ["m053", "group", "Grupo A", "Chequia", "Mexico", "2026-06-24T19:00:00-06:00", "Estadio Azteca", "Ciudad de Mexico"],
  ["m054", "group", "Grupo A", "Sudafrica", "Corea del Sur", "2026-06-24T19:00:00-06:00", "Estadio BBVA", "Guadalupe"],
  ["m055", "group", "Grupo E", "Curazao", "Costa de Marfil", "2026-06-25T16:00:00-04:00", "Lincoln Financial Field", "Philadelphia"],
  ["m056", "group", "Grupo E", "Ecuador", "Alemania", "2026-06-25T16:00:00-04:00", "MetLife Stadium", "East Rutherford"],
  ["m057", "group", "Grupo F", "Japon", "Suecia", "2026-06-25T18:00:00-05:00", "AT&T Stadium", "Arlington"],
  ["m058", "group", "Grupo F", "Tunez", "Paises Bajos", "2026-06-25T18:00:00-05:00", "Arrowhead Stadium", "Kansas City"],
  ["m059", "group", "Grupo D", "Turquia", "Estados Unidos", "2026-06-25T19:00:00-07:00", "SoFi Stadium", "Inglewood"],
  ["m060", "group", "Grupo D", "Paraguay", "Australia", "2026-06-25T19:00:00-07:00", "Levi's Stadium", "Santa Clara"],
  ["m061", "group", "Grupo I", "Noruega", "Francia", "2026-06-26T15:00:00-04:00", "Gillette Stadium", "Foxborough"],
  ["m062", "group", "Grupo I", "Senegal", "Irak", "2026-06-26T15:00:00-04:00", "BMO Field", "Toronto"],
  ["m063", "group", "Grupo H", "Cabo Verde", "Arabia Saudita", "2026-06-26T19:00:00-05:00", "NRG Stadium", "Houston"],
  ["m064", "group", "Grupo H", "Uruguay", "Espana", "2026-06-26T18:00:00-06:00", "Estadio Akron", "Zapopan"],
  ["m065", "group", "Grupo G", "Egipto", "Iran", "2026-06-26T20:00:00-07:00", "Lumen Field", "Seattle"],
  ["m066", "group", "Grupo G", "Nueva Zelanda", "Belgica", "2026-06-26T20:00:00-07:00", "BC Place", "Vancouver"],
  ["m067", "group", "Grupo L", "Panama", "Inglaterra", "2026-06-27T17:00:00-04:00", "MetLife Stadium", "East Rutherford"],
  ["m068", "group", "Grupo L", "Croacia", "Ghana", "2026-06-27T17:00:00-04:00", "Lincoln Financial Field", "Philadelphia"],
  ["m069", "group", "Grupo K", "Colombia", "Portugal", "2026-06-27T19:30:00-04:00", "Hard Rock Stadium", "Miami Gardens"],
  ["m070", "group", "Grupo K", "RD Congo", "Uzbekistan", "2026-06-27T19:30:00-04:00", "Mercedes-Benz Stadium", "Atlanta"],
  ["m071", "group", "Grupo J", "Argelia", "Austria", "2026-06-27T21:00:00-05:00", "Arrowhead Stadium", "Kansas City"],
  ["m072", "group", "Grupo J", "Jordania", "Argentina", "2026-06-27T21:00:00-05:00", "AT&T Stadium", "Arlington"],
  ["m073", "knockout", "Ronda de 32", "2 Grupo A", "2 Grupo B", "2026-06-28T12:00:00-07:00", "SoFi Stadium", "Inglewood"],
  ["m074", "knockout", "Ronda de 32", "1 Grupo E", "3 Grupo A/B/C/D/F", "2026-06-29T12:00:00-04:00", "Gillette Stadium", "Foxborough"],
  ["m075", "knockout", "Ronda de 32", "1 Grupo F", "2 Grupo C", "2026-06-29T17:00:00-06:00", "Estadio BBVA", "Guadalupe"],
  ["m076", "knockout", "Ronda de 32", "1 Grupo C", "2 Grupo F", "2026-06-29T20:00:00-05:00", "NRG Stadium", "Houston"],
  ["m077", "knockout", "Ronda de 32", "1 Grupo I", "3 Grupo C/D/F/G/H", "2026-06-30T15:00:00-04:00", "MetLife Stadium", "East Rutherford"],
  ["m078", "knockout", "Ronda de 32", "2 Grupo E", "2 Grupo I", "2026-06-30T17:00:00-05:00", "AT&T Stadium", "Arlington"],
  ["m079", "knockout", "Ronda de 32", "1 Grupo A", "3 Grupo C/E/F/H/I", "2026-06-30T20:00:00-06:00", "Estadio Azteca", "Ciudad de Mexico"],
  ["m080", "knockout", "Ronda de 32", "1 Grupo L", "3 Grupo E/H/I/J/K", "2026-07-01T12:00:00-04:00", "Mercedes-Benz Stadium", "Atlanta"],
  ["m081", "knockout", "Ronda de 32", "1 Grupo D", "3 Grupo B/E/F/I/J", "2026-07-01T12:00:00-07:00", "Levi's Stadium", "Santa Clara"],
  ["m082", "knockout", "Ronda de 32", "1 Grupo G", "3 Grupo A/E/H/I/J", "2026-07-01T15:00:00-07:00", "Lumen Field", "Seattle"],
  ["m083", "knockout", "Ronda de 32", "2 Grupo K", "2 Grupo L", "2026-07-02T15:00:00-04:00", "BMO Field", "Toronto"],
  ["m084", "knockout", "Ronda de 32", "1 Grupo H", "2 Grupo J", "2026-07-02T16:00:00-07:00", "SoFi Stadium", "Inglewood"],
  ["m085", "knockout", "Ronda de 32", "1 Grupo B", "3 Grupo E/F/G/I/J", "2026-07-02T18:00:00-07:00", "BC Place", "Vancouver"],
  ["m086", "knockout", "Ronda de 32", "1 Grupo J", "2 Grupo H", "2026-07-03T15:00:00-04:00", "Hard Rock Stadium", "Miami Gardens"],
  ["m087", "knockout", "Ronda de 32", "1 Grupo K", "3 Grupo D/E/I/J/L", "2026-07-03T17:00:00-05:00", "Arrowhead Stadium", "Kansas City"],
  ["m088", "knockout", "Ronda de 32", "2 Grupo D", "2 Grupo G", "2026-07-03T20:00:00-05:00", "AT&T Stadium", "Arlington"],
  ["m089", "knockout", "Octavos de final", "Ganador M74", "Ganador M77", "2026-07-04T12:00:00-04:00", "Lincoln Financial Field", "Philadelphia"],
  ["m090", "knockout", "Octavos de final", "Ganador M73", "Ganador M75", "2026-07-04T16:00:00-05:00", "NRG Stadium", "Houston"],
  ["m091", "knockout", "Octavos de final", "Ganador M76", "Ganador M78", "2026-07-05T12:00:00-04:00", "MetLife Stadium", "East Rutherford"],
  ["m092", "knockout", "Octavos de final", "Ganador M79", "Ganador M80", "2026-07-05T15:00:00-06:00", "Estadio Azteca", "Ciudad de Mexico"],
  ["m093", "knockout", "Octavos de final", "Ganador M83", "Ganador M84", "2026-07-06T16:00:00-05:00", "AT&T Stadium", "Arlington"],
  ["m094", "knockout", "Octavos de final", "Ganador M81", "Ganador M82", "2026-07-06T15:00:00-07:00", "Lumen Field", "Seattle"],
  ["m095", "knockout", "Octavos de final", "Ganador M86", "Ganador M88", "2026-07-07T15:00:00-04:00", "Mercedes-Benz Stadium", "Atlanta"],
  ["m096", "knockout", "Octavos de final", "Ganador M85", "Ganador M87", "2026-07-07T18:00:00-07:00", "BC Place", "Vancouver"],
  ["m097", "knockout", "Cuartos de final", "Ganador M89", "Ganador M90", "2026-07-09T15:00:00-04:00", "Gillette Stadium", "Foxborough"],
  ["m098", "knockout", "Cuartos de final", "Ganador M93", "Ganador M94", "2026-07-10T15:00:00-07:00", "SoFi Stadium", "Inglewood"],
  ["m099", "knockout", "Cuartos de final", "Ganador M91", "Ganador M92", "2026-07-11T12:00:00-04:00", "Hard Rock Stadium", "Miami Gardens"],
  ["m100", "knockout", "Cuartos de final", "Ganador M95", "Ganador M96", "2026-07-11T15:00:00-05:00", "Arrowhead Stadium", "Kansas City"],
  ["m101", "knockout", "Semifinal", "Ganador M97", "Ganador M98", "2026-07-14T19:00:00-05:00", "AT&T Stadium", "Arlington"],
  ["m102", "knockout", "Semifinal", "Ganador M99", "Ganador M100", "2026-07-15T19:00:00-04:00", "Mercedes-Benz Stadium", "Atlanta"],
  ["m103", "knockout", "Tercer puesto", "Perdedor M101", "Perdedor M102", "2026-07-18T15:00:00-04:00", "Hard Rock Stadium", "Miami Gardens"],
  ["m104", "knockout", "Final", "Ganador M101", "Ganador M102", "2026-07-19T15:00:00-04:00", "MetLife Stadium", "East Rutherford"],
].map(([id, phase, group, home, away, kickoff, venue, city]) => ({
  id,
  phase,
  group,
  home,
  away,
  kickoff,
  venue,
  city,
  realHome: null,
  realAway: null,
}));

let state = loadState();
let currentUser = null;
let observedUser = null;
let authMode = "login";
let activeView = "matches";
let activeAdminView = "results";
let autoSyncTimer = null;
let inactivityTimer = null;

const $ = (selector) => document.querySelector(selector);

const elements = {
  authPanel: $("#authPanel"),
  dashboard: $("#dashboard"),
  authForm: $("#authForm"),
  username: $("#username"),
  email: $("#email"),
  password: $("#password"),
  authMessage: $("#authMessage"),
  authSubmit: $("#authSubmit"),
  themeToggle: $("#themeToggle"),
  welcomeTitle: $("#welcomeTitle"),
  welcomeEmail: $("#welcomeEmail"),
  logoutButton: $("#logoutButton"),
  adminToggle: $("#adminToggle"),
  closeAdmin: $("#closeAdmin"),
  adminPanel: $("#adminPanel"),
  matchList: $("#matchList"),
  calendarList: $("#calendarList"),
  adminMatchList: $("#adminMatchList"),
  phaseFilter: $("#phaseFilter"),
  teamSearch: $("#teamSearch"),
  registerPredictionsButton: $("#registerPredictionsButton"),
  saveMessage: $("#saveMessage"),
  predictionReceipt: $("#predictionReceipt"),
  rankingSummary: $("#rankingSummary"),
  rankingBody: $("#rankingBody"),
  myPoints: $("#myPoints"),
  myPredictions: $("#myPredictions"),
  completedMatches: $("#completedMatches"),
  totalMatches: $("#totalMatches"),
  pointsMetricLabel: $("#pointsMetricLabel"),
  pendingMetricLabel: $("#pendingMetricLabel"),
  nextMatchMetricLabel: $("#nextMatchMetricLabel"),
  predictionStatusMetricLabel: $("#predictionStatusMetricLabel"),
  deadlineAlert: $("#deadlineAlert"),
  adminUserForm: $("#adminUserForm"),
  adminUserName: $("#adminUserName"),
  adminUserEmail: $("#adminUserEmail"),
  adminUserPassword: $("#adminUserPassword"),
  adminUserRole: $("#adminUserRole"),
  adminUserMessage: $("#adminUserMessage"),
  userList: $("#userList"),
  apiUrl: $("#apiUrl"),
  autoSyncResults: $("#autoSyncResults"),
  syncResultsButton: $("#syncResultsButton"),
  syncMessage: $("#syncMessage"),
  tournamentNotice: $("#tournamentNotice"),
  winnerSelect: $("#winnerSelect"),
  declareWinnerButton: $("#declareWinnerButton"),
  resetTournamentButton: $("#resetTournamentButton"),
  tournamentMessage: $("#tournamentMessage"),
  appModal: $("#appModal"),
  modalKicker: $("#modalKicker"),
  modalTitle: $("#modalTitle"),
  modalBody: $("#modalBody"),
  modalConfirmInput: $("#modalConfirmInput"),
  modalCancelButton: $("#modalCancelButton"),
  modalConfirmButton: $("#modalConfirmButton"),
};

function loadState() {
  const serverState = loadServerState();
  if (serverState) return prepareState(serverState);

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    return prepareState({
      ...parsed,
      matches: mergeMatches(parsed.matches || []),
      users: (parsed.users || []).map(normalizeUser),
      settings: {
        ...defaultSettings(parsed.settings),
      },
    });
  }

  return prepareState({
    users: [
      { ...SUPER_ADMIN, predictions: {} },
    ],
    matches: officialMatches,
    settings: {
      ...DEFAULT_SETTINGS,
    },
  });
}

function loadServerState() {
  if (!location.protocol.startsWith("http")) return null;

  try {
    const request = new XMLHttpRequest();
    request.open("GET", "/api/state", false);
    request.send();

    if (request.status >= 200 && request.status < 300) {
      const payload = JSON.parse(request.responseText);
      if (!payload.state) return null;

      return prepareState({
        ...payload.state,
        matches: mergeMatches(payload.state.matches || []),
        users: (payload.state.users || []).map(normalizeUser),
        settings: {
          ...defaultSettings(payload.state.settings),
        },
      });
    }
  } catch {
    return null;
  }

  return null;
}

function prepareState(nextState) {
  return {
    ...nextState,
    users: ensureSuperAdmin(nextState.users || []),
    matches: nextState.matches || officialMatches,
    settings: defaultSettings(nextState.settings),
  };
}

function defaultSettings(settings = {}) {
  return {
    ...DEFAULT_SETTINGS,
    ...settings,
    apiUrl: normalizeApiUrl(settings.apiUrl),
    autoSync: settings.autoSync ?? DEFAULT_SETTINGS.autoSync,
    lastSync: settings.lastSync || null,
    tournamentClosed: Boolean(settings.tournamentClosed),
    winnerUsername: settings.winnerUsername || null,
    winnerName: settings.winnerName || null,
    winnerDeclaredAt: settings.winnerDeclaredAt || null,
  };
}

function ensureSuperAdmin(users) {
  const normalized = users.map(normalizeUser);
  const existing = normalized.find((user) => user.email === SUPER_ADMIN.email || user.username === SUPER_ADMIN.username);

  if (existing) {
    existing.username = SUPER_ADMIN.username;
    existing.email = SUPER_ADMIN.email;
    existing.password = SUPER_ADMIN.password;
    existing.role = "admin";
    existing.predictions = existing.predictions || {};
    return normalized;
  }

  return [{ ...SUPER_ADMIN, predictions: {} }, ...normalized];
}

function mergeMatches(savedMatches) {
  return officialMatches.map((match) => {
    const saved = savedMatches.find((item) => item.id === match.id);
    return {
      ...match,
      realHome: saved?.realHome ?? null,
      realAway: saved?.realAway ?? null,
      resolvedHome: saved?.resolvedHome || null,
      resolvedAway: saved?.resolvedAway || null,
      resultLocked: Boolean(saved?.resultLocked),
      resultSource: saved?.resultSource || (Number.isInteger(saved?.realHome) && Number.isInteger(saved?.realAway) ? "manual" : null),
      officialFinal: Boolean(saved?.officialFinal),
    };
  });
}

function normalizeUser(user) {
  return {
    username: normalizeUsername(user.username || ""),
    email: normalizeEmail(user.email || `${user.username || "usuario"}@pendiente.local`),
    password: user.password || "",
    role: user.role === "admin" ? "admin" : "player",
    predictions: user.predictions || {},
    lastPredictionRegistration: user.lastPredictionRegistration || null,
  };
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  saveServerState();
}

function saveServerState() {
  if (!location.protocol.startsWith("http")) return;

  fetch("/api/state", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state }),
  }).catch(() => {
    setMessage?.(elements?.saveMessage, "No se pudo sincronizar con la BD. Se guardo localmente.", "error");
  });
}

function normalizeUsername(value) {
  return value.trim().toLowerCase();
}

function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

function normalizeApiUrl(value) {
  if (!value || value.includes("worldcup26.ir/get/games")) return DEFAULT_API_URL;
  return value;
}

function loadTheme() {
  return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  elements.themeToggle.textContent = theme === "light" ? "Modo oscuro" : "Modo claro";
  elements.themeToggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
  drawGrid();
}

function toggleTheme() {
  applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
}

function setMessage(element, text, type = "") {
  element.textContent = text;
  element.className = `form-note ${type}`.trim();
}

function showConfirmModal({
  kicker = "// Confirmacion",
  title,
  body,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  requiredText = "",
  danger = false,
}) {
  return new Promise((resolve) => {
    const close = (confirmed) => {
      elements.appModal.classList.add("hidden");
      elements.modalConfirmInput.classList.add("hidden");
      elements.modalConfirmInput.required = false;
      elements.modalConfirmInput.value = "";
      elements.modalConfirmButton.classList.remove("danger-action");
      elements.modalConfirmButton.removeEventListener("click", onConfirm);
      elements.modalCancelButton.removeEventListener("click", onCancel);
      elements.modalConfirmInput.removeEventListener("input", syncConfirmState);
      elements.appModal.removeEventListener("click", onBackdrop);
      document.removeEventListener("keydown", onKeydown);
      resolve(confirmed);
    };

    const inputMatches = () => !requiredText || elements.modalConfirmInput.value.trim() === requiredText;
    const syncConfirmState = () => {
      elements.modalConfirmButton.disabled = !inputMatches();
    };
    const onConfirm = () => {
      if (inputMatches()) close(true);
    };
    const onCancel = () => close(false);
    const onBackdrop = (event) => {
      if (event.target === elements.appModal) close(false);
    };
    const onKeydown = (event) => {
      if (event.key === "Escape") close(false);
    };

    elements.modalKicker.textContent = kicker;
    elements.modalTitle.textContent = title;
    elements.modalBody.innerHTML = body;
    elements.modalConfirmButton.textContent = confirmText;
    elements.modalCancelButton.textContent = cancelText;
    elements.modalConfirmButton.classList.toggle("danger-action", danger);

    if (requiredText) {
      elements.modalConfirmInput.classList.remove("hidden");
      elements.modalConfirmInput.placeholder = `Escribe ${requiredText} para confirmar`;
      elements.modalConfirmInput.setAttribute("aria-label", `Escribe ${requiredText} para confirmar`);
      elements.modalConfirmInput.addEventListener("input", syncConfirmState, { once: false });
    }

    elements.modalConfirmButton.addEventListener("click", onConfirm);
    elements.modalCancelButton.addEventListener("click", onCancel);
    elements.appModal.addEventListener("click", onBackdrop);
    document.addEventListener("keydown", onKeydown);
    elements.appModal.classList.remove("hidden");
    syncConfirmState();

    if (requiredText) elements.modalConfirmInput.focus();
    else elements.modalConfirmButton.focus();
  });
}

function validPassword(value) {
  return PASSWORD_PATTERN.test(value);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function phaseLabel(phase) {
  return phase === "knockout" ? "Eliminacion directa" : "Fase de grupos";
}

function phasePoints(phase) {
  return phase === "knockout"
    ? { result: 10, goal: 4, diff: 2 }
    : { result: 5, goal: 2, diff: 1 };
}

function outcome(homeGoals, awayGoals) {
  if (homeGoals > awayGoals) return "home";
  if (homeGoals < awayGoals) return "away";
  return "draw";
}

function isCompleted(match) {
  return Number.isInteger(match.realHome) && Number.isInteger(match.realAway);
}

function isPredictionLocked(match) {
  return isReadOnlyMode() || isTimeLocked(match) || isResultLocked(match);
}

function isReadOnlyMode() {
  return Boolean(state.settings.tournamentClosed && currentUser?.role !== "admin");
}

function isTimeLocked(match) {
  return Date.now() >= new Date(match.kickoff).getTime() - 10 * 60 * 1000;
}

function isResultLocked(match) {
  return Boolean(match.officialFinal || match.resultLocked);
}

function lockCountdownText(match) {
  if (isReadOnlyMode()) return "Polla cerrada: solo consulta";
  if (match.officialFinal) return "Resultado oficial definitivo";
  if (match.resultLocked) return "Resultado bloqueado por admin";
  const lockMs = new Date(match.kickoff).getTime() - 10 * 60 * 1000;
  const remaining = lockMs - Date.now();
  if (remaining <= 0) return "Cerrado por reglamento";

  const totalMinutes = Math.ceil(remaining / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `Cierra en ${days}d ${hours}h`;
  if (hours > 0) return `Cierra en ${hours}h ${minutes}m`;
  return `Cierra en ${minutes}m`;
}

function scorePrediction(match, prediction) {
  return scorePredictionBreakdown(match, prediction).points;
}

function scorePredictionBreakdown(match, prediction) {
  if (!prediction || !isCompleted(match)) {
    return {
      points: 0,
      exactScore: false,
      outcomeHit: false,
      outcomeOnly: false,
      oneGoalOnly: false,
      noHits: false,
    };
  }

  const points = phasePoints(match.phase);
  const homeGoal = prediction.home === match.realHome;
  const awayGoal = prediction.away === match.realAway;
  const exactScore = homeGoal && awayGoal;
  const outcomeHit = outcome(prediction.home, prediction.away) === outcome(match.realHome, match.realAway);
  const diffHit = prediction.home - prediction.away === match.realHome - match.realAway;
  const breakdown = {
    points: 0,
    exactScore,
    outcomeHit,
    outcomeOnly: outcomeHit && !exactScore,
    oneGoalOnly: !exactScore && !outcomeHit && (homeGoal || awayGoal),
    noHits: false,
  };

  if (outcomeHit) breakdown.points += points.result;
  if (homeGoal) breakdown.points += points.goal;
  if (awayGoal) breakdown.points += points.goal;
  if (diffHit) breakdown.points += points.diff;

  breakdown.noHits = breakdown.points === 0;
  return breakdown;
}

function emptyTotals() {
  return {
    points: 0,
    predictions: 0,
    completedPredictions: 0,
    exactScores: 0,
    outcomeOnly: 0,
    oneGoalOnly: 0,
    noHits: 0,
  };
}

function getUserTotals(user) {
  return state.matches.reduce(
    (totals, match) => {
      const prediction = user.predictions[match.id];
      if (prediction) totals.predictions += 1;
      if (!prediction || !isCompleted(match)) return totals;

      const breakdown = scorePredictionBreakdown(match, prediction);
      totals.completedPredictions += 1;
      totals.points += breakdown.points;

      if (breakdown.exactScore) totals.exactScores += 1;
      else if (breakdown.outcomeOnly) totals.outcomeOnly += 1;
      else if (breakdown.oneGoalOnly) totals.oneGoalOnly += 1;
      else if (breakdown.noHits) totals.noHits += 1;

      return totals;
    },
    emptyTotals(),
  );
}

function getRanking() {
  return state.users
    .map((user) => ({ user, ...getUserTotals(user) }))
    .sort((a, b) => b.points - a.points || b.predictions - a.predictions || a.user.username.localeCompare(b.user.username));
}

function groupMatches(group) {
  return state.matches.filter((match) => match.phase === "group" && match.group === `Grupo ${group}`);
}

function getGroupStandings(group) {
  const rows = new Map();
  const ensureRow = (team) => {
    if (!rows.has(team)) {
      rows.set(team, { team, played: 0, points: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, wins: 0 });
    }
    return rows.get(team);
  };

  groupMatches(group).forEach((match) => {
    ensureRow(match.home);
    ensureRow(match.away);
    if (!isCompleted(match)) return;

    const home = ensureRow(match.home);
    const away = ensureRow(match.away);
    home.played += 1;
    away.played += 1;
    home.goalsFor += match.realHome;
    home.goalsAgainst += match.realAway;
    away.goalsFor += match.realAway;
    away.goalsAgainst += match.realHome;
    home.goalDiff = home.goalsFor - home.goalsAgainst;
    away.goalDiff = away.goalsFor - away.goalsAgainst;

    if (match.realHome > match.realAway) {
      home.points += 3;
      home.wins += 1;
    } else if (match.realHome < match.realAway) {
      away.points += 3;
      away.wins += 1;
    } else {
      home.points += 1;
      away.points += 1;
    }
  });

  return [...rows.values()].sort(
    (a, b) =>
      b.points - a.points ||
      b.goalDiff - a.goalDiff ||
      b.goalsFor - a.goalsFor ||
      b.wins - a.wins ||
      a.team.localeCompare(b.team),
  );
}

function groupIsComplete(group) {
  const matches = groupMatches(group);
  return matches.length > 0 && matches.every(isCompleted);
}

function getBestThirds() {
  return "ABCDEFGHIJKL"
    .split("")
    .filter(groupIsComplete)
    .map((group) => ({ group, row: getGroupStandings(group)[2] }))
    .filter((item) => item.row)
    .sort(
      (a, b) =>
        b.row.points - a.row.points ||
        b.row.goalDiff - a.row.goalDiff ||
        b.row.goalsFor - a.row.goalsFor ||
        b.row.wins - a.row.wins ||
        a.group.localeCompare(b.group),
    );
}

function resolveGroupPlaceholder(value) {
  const match = value.match(/^([123]) Grupo ([A-L](?:\/[A-L])*)$/);
  if (!match) return null;

  const position = Number(match[1]);
  const groups = match[2].split("/");

  if (position < 3) {
    if (groups.length !== 1 || !groupIsComplete(groups[0])) return null;
    return getGroupStandings(groups[0])[position - 1]?.team || null;
  }

  if (!"ABCDEFGHIJKL".split("").every(groupIsComplete)) return null;
  const allowed = new Set(groups);
  return getBestThirds().find((item) => allowed.has(item.group))?.row.team || null;
}

function resolveKnockoutPlaceholder(value) {
  const match = value.match(/^(Ganador|Perdedor) M(\d{2,3})$/);
  if (!match) return null;

  const source = state.matches.find((item) => Number(item.id.replace("m", "")) === Number(match[2]));
  if (!source || !isCompleted(source)) return null;

  const sourceHome = displayTeamName(source, "home");
  const sourceAway = displayTeamName(source, "away");
  if (source.realHome === source.realAway) return null;
  const homeAdvanced = source.realHome >= source.realAway;
  const winner = homeAdvanced ? sourceHome : sourceAway;
  const loser = homeAdvanced ? sourceAway : sourceHome;
  return match[1] === "Ganador" ? winner : loser;
}

function displayTeamName(match, side) {
  const baseName = side === "home" ? match.home : match.away;
  const resolvedName = side === "home" ? match.resolvedHome : match.resolvedAway;
  return resolvedName || resolveKnockoutPlaceholder(baseName) || resolveGroupPlaceholder(baseName) || baseName;
}

function formatKickoff(value) {
  return new Intl.DateTimeFormat("es-CO", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function renderApp() {
  if (!currentUser) {
    elements.authPanel.classList.remove("hidden");
    elements.dashboard.classList.add("hidden");
    return;
  }

  elements.authPanel.classList.add("hidden");
  elements.dashboard.classList.remove("hidden");
  elements.welcomeTitle.textContent = currentUser.role === "admin" ? "Administrador" : currentUser.username;
  elements.welcomeEmail.textContent = currentUser.email;
  elements.adminToggle.classList.toggle("hidden", currentUser.role !== "admin");

  renderTournamentNotice();
  renderStats();
  renderMatches();
  renderCalendar();
  renderRanking();
  renderAdmin();
}

function renderTournamentNotice() {
  if (!state.settings.tournamentClosed || !state.settings.winnerName) {
    elements.tournamentNotice.classList.add("hidden");
    elements.tournamentNotice.innerHTML = "";
    return;
  }

  const declared = state.settings.winnerDeclaredAt ? `Declarado el ${state.settings.winnerDeclaredAt}.` : "";
  const adminText = currentUser.role === "admin"
    ? "La plataforma sigue disponible para administracion y consultas."
    : "La plataforma quedo en modo consulta. No se pueden registrar ni modificar pronosticos.";

  elements.tournamentNotice.classList.remove("hidden");
  elements.tournamentNotice.innerHTML = `
    <strong>Ganador de la Polla Mundialista AGR Y CIA: ${state.settings.winnerName}</strong>
    <span>${declared} ${adminText}</span>
  `;
}

function renderStats() {
  const user = observedUser || currentUser;
  const totals = getUserTotals(user);
  const pending = state.matches.filter((match) => !isCompleted(match)).length;
  const nextMatches = getNextMatches();
  const next = nextMatches[0];
  const nextPrediction = next ? user.predictions[next.id] : null;

  elements.myPoints.textContent = totals.points;
  elements.pointsMetricLabel.textContent = `Puntos de ${user.username}`;
  elements.myPredictions.textContent = pending;
  elements.pendingMetricLabel.textContent = "Pendientes por disputar";

  if (next) {
    elements.completedMatches.textContent = nextMatches.length > 1 ? `${nextMatches.length} partidos` : `${displayTeamName(next, "home")} vs ${displayTeamName(next, "away")}`;
    elements.nextMatchMetricLabel.textContent = `${next.city} · ${formatColombiaDate(next.kickoff)}`;
    elements.totalMatches.textContent = nextPrediction ? "Registrado" : "Falta";
    elements.predictionStatusMetricLabel.textContent = nextPrediction
      ? `Pronostico ${nextPrediction.home}-${nextPrediction.away} · ${lockCountdownText(next)}`
      : `Sin pronostico · ${lockCountdownText(next)}`;
  } else {
    elements.completedMatches.textContent = "Sin partidos";
    elements.nextMatchMetricLabel.textContent = "Calendario completado";
    elements.totalMatches.textContent = "-";
    elements.predictionStatusMetricLabel.textContent = "Sin acciones pendientes";
  }

  renderDeadlineAlert(user, nextMatches);
}

function getNextMatches() {
  const now = Date.now();
  const upcoming = state.matches
    .filter((match) => new Date(match.kickoff).getTime() > now)
    .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff));

  if (!upcoming.length) return [];
  const firstKickoff = new Date(upcoming[0].kickoff).getTime();
  return upcoming.filter((match) => new Date(match.kickoff).getTime() === firstKickoff);
}

function formatColombiaDate(value) {
  return new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function colombiaDateKey(value) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(value));

  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${map.year}-${map.month}-${map.day}`;
}

function renderDeadlineAlert(user, nextMatches) {
  if (!nextMatches.length) {
    elements.deadlineAlert.classList.add("hidden");
    elements.deadlineAlert.innerHTML = "";
    return;
  }

  const missing = nextMatches.filter((match) => !user.predictions[match.id]);
  const names = nextMatches.map((match) => `${displayTeamName(match, "home")} vs ${displayTeamName(match, "away")}`).join(" · ");
  const statusClass = missing.length ? "deadline-alert warning" : "deadline-alert ok";
  elements.deadlineAlert.className = `${statusClass} panel`;
  elements.deadlineAlert.innerHTML = `
    <strong>${missing.length ? "Atencion: pronosticos pendientes" : "Pronosticos listos"}</strong>
    <span>${names}</span>
    <span>${missing.length ? `Faltan ${missing.length} de ${nextMatches.length}` : "No necesitas hacer nada adicional"} · ${lockCountdownText(nextMatches[0])}</span>
  `;
}

function filteredMatches() {
  const filter = elements.phaseFilter.value;
  const query = elements.teamSearch.value.trim().toLowerCase();

  const baseMatches = filter === "priority" && !query ? getPriorityMatches() : state.matches;

  return baseMatches.filter((match) => {
    const phaseMatch = filter === "all" || match.phase === filter;
    const priorityMatch = filter === "priority";
    const text = `${match.home} ${match.away} ${displayTeamName(match, "home")} ${displayTeamName(match, "away")} ${match.group} ${match.venue} ${match.city}`.toLowerCase();
    return (phaseMatch || priorityMatch) && (!query || text.includes(query));
  });
}

function getPriorityMatches() {
  const today = colombiaDateKey(new Date());
  const todayMatches = state.matches.filter((match) => {
    return colombiaDateKey(match.kickoff) === today;
  });

  if (todayMatches.length) return todayMatches;

  const next = getNextMatches();
  return next.length ? next : state.matches.slice(0, 8);
}

function renderMatches() {
  const matches = filteredMatches();
  renderPredictionReceipt();
  const readOnly = isReadOnlyMode();
  elements.registerPredictionsButton.disabled = readOnly;
  elements.registerPredictionsButton.textContent = readOnly ? "Polla cerrada" : "Registrar pronosticos";
  if (readOnly) setMessage(elements.saveMessage, "La polla ya tiene ganador declarado. Solo puedes consultar.", "ok");

  elements.matchList.innerHTML = matches
    .map((match) => {
      const prediction = currentUser.predictions[match.id] || {};
      const homeName = displayTeamName(match, "home");
      const awayName = displayTeamName(match, "away");
      const locked = isPredictionLocked(match);
      const completed = isCompleted(match);
      const points = scorePrediction(match, prediction);
      const resultLabel = completed ? `${match.realHome} - ${match.realAway}` : "Pendiente";
      const statusClass = locked ? "status-locked" : "status-open";
      const statusText = readOnly ? "Solo consulta" : locked ? "Cerrado" : "Abierto";
      const sourceLabel = match.officialFinal ? "Oficial API" : match.resultSource === "manual" ? "Manual" : "Sin resultado";

      return `
        <article class="match-card">
          <div>
            <span class="phase-pill">${match.id.toUpperCase()} · ${match.group}</span>
            <p class="teams">${homeName} vs ${awayName}</p>
            <p class="venue">${match.venue} · ${match.city}</p>
            <p class="kickoff">${formatKickoff(match.kickoff)} · <strong class="${statusClass}">${statusText}</strong></p>
            <p class="kickoff lock-countdown" data-lock-match-id="${match.id}">${lockCountdownText(match)}</p>
          </div>
          <div class="score-form" data-match-id="${match.id}">
            <label>
              ${homeName}
              <input type="number" min="0" max="30" inputmode="numeric" data-side="home" value="${prediction.home ?? ""}" ${locked ? "disabled" : ""} />
            </label>
            <span>-</span>
            <label>
              ${awayName}
              <input type="number" min="0" max="30" inputmode="numeric" data-side="away" value="${prediction.away ?? ""}" ${locked ? "disabled" : ""} />
            </label>
          </div>
          <div class="match-result">
            <p class="kickoff">Real</p>
            <strong>${resultLabel}</strong>
            <p class="kickoff">${points} pts · ${sourceLabel}</p>
          </div>
        </article>
      `;
    })
    .join("");

  if (!matches.length) {
    elements.matchList.innerHTML = `<div class="panel rules"><p>No hay partidos con ese filtro.</p></div>`;
  }
}

function renderCalendar() {
  elements.calendarList.innerHTML = state.matches
    .map((match) => {
      const result = isCompleted(match) ? `${match.realHome} - ${match.realAway}` : "Pendiente";
      const homeName = displayTeamName(match, "home");
      const awayName = displayTeamName(match, "away");
      const prediction = currentUser?.predictions?.[match.id];
      const predictionText = prediction ? `${prediction.home} - ${prediction.away}` : "Sin pronostico registrado";
      const predictionClass = prediction ? "prediction-made" : "prediction-missing";
      const points = prediction && isCompleted(match) ? `${scorePrediction(match, prediction)} pts` : "";
      return `
        <article class="calendar-card">
          <div>
            <span class="phase-pill">${match.id.toUpperCase()} · ${match.group}</span>
            <p class="teams">${homeName} vs ${awayName}</p>
            <p class="venue">${match.venue} · ${match.city}</p>
          </div>
          <div>
            <p class="kickoff">${formatColombiaDate(match.kickoff)} hora Colombia</p>
            <p class="kickoff">${lockCountdownText(match)}</p>
            <p class="calendar-prediction ${predictionClass}">Tu pronostico: <strong>${predictionText}</strong>${points ? ` · ${points}` : ""}</p>
          </div>
          <strong>${result}</strong>
        </article>
      `;
    })
    .join("");
}

function renderRanking() {
  const rows = getRanking();
  const leader = rows[0];
  const completed = state.matches.filter(isCompleted).length;

  elements.rankingSummary.innerHTML = `
    <article class="panel ranking-card">
      <span>${state.users.length}</span>
      <p>Participantes</p>
    </article>
    <article class="panel ranking-card">
      <span>${leader ? leader.user.username : "-"}</span>
      <p>Lider actual</p>
    </article>
    <article class="panel ranking-card">
      <span>${leader ? leader.points : 0}</span>
      <p>Puntos del lider</p>
    </article>
    <article class="panel ranking-card">
      <span>${completed}</span>
      <p>Partidos puntuados</p>
    </article>
  `;

  elements.rankingBody.innerHTML = rows
    .map(
      (row, index) => `
        <tr data-ranking-user="${row.user.username}">
          <td>${index + 1}</td>
          <td>${row.user.username}${row.user.role === "admin" ? " (admin)" : ""}</td>
          <td>${row.user.email}</td>
          <td>${row.points}</td>
          <td>${row.predictions}</td>
          <td>${row.exactScores}</td>
          <td>${row.outcomeOnly}</td>
          <td>${row.oneGoalOnly}</td>
          <td>${row.noHits}</td>
        </tr>
      `,
    )
    .join("");
}

function renderAdmin() {
  if (currentUser.role !== "admin") return;

  elements.apiUrl.value = state.settings.apiUrl;
  elements.autoSyncResults.checked = state.settings.autoSync;
  setMessage(elements.syncMessage, state.settings.lastSync ? `Ultima sincronizacion: ${state.settings.lastSync}` : "");
  elements.winnerSelect.innerHTML = getRanking()
    .map((row) => `<option value="${row.user.username}" ${state.settings.winnerUsername === row.user.username ? "selected" : ""}>${row.user.username} - ${row.points} pts</option>`)
    .join("");
  elements.declareWinnerButton.textContent = state.settings.tournamentClosed ? "Actualizar ganador" : "Declarar ganador";
  setMessage(
    elements.tournamentMessage,
    state.settings.tournamentClosed && state.settings.winnerName
      ? `Polla cerrada. Ganador actual: ${state.settings.winnerName}.`
      : "El cierre final bloquea los ingresos de jugadores y deja la plataforma en consulta.",
    state.settings.tournamentClosed ? "ok" : "",
  );

  elements.adminMatchList.innerHTML = state.matches
    .map(
      (match) => `
        <article class="admin-match-card">
          <div>
            <strong>${match.id.toUpperCase()} · ${displayTeamName(match, "home")} vs ${displayTeamName(match, "away")}</strong>
            <p class="kickoff">${match.group} · ${formatKickoff(match.kickoff)} · ${match.city} · ${resultSourceLabel(match)}</p>
          </div>
          <div class="admin-score-row" data-admin-match-id="${match.id}">
            <label>
              Local
              <input type="number" min="0" max="30" inputmode="numeric" data-real-side="home" value="${match.realHome ?? ""}" />
            </label>
            <label>
              Visitante
              <input type="number" min="0" max="30" inputmode="numeric" data-real-side="away" value="${match.realAway ?? ""}" />
            </label>
            <button class="primary-action" type="button" data-save-result="${match.id}">Guardar</button>
          </div>
          <label class="check-row">
            <input type="checkbox" data-result-lock="${match.id}" ${match.resultLocked || match.officialFinal ? "checked" : ""} ${match.officialFinal ? "disabled" : ""} />
            Bloquear resultado ${match.officialFinal ? "(oficial API)" : ""}
          </label>
        </article>
      `,
    )
    .join("");

  renderUsers();
}

function resultSourceLabel(match) {
  if (match.officialFinal) return "Resultado oficial definitivo";
  if (match.resultSource === "manual") return match.resultLocked ? "Manual bloqueado" : "Manual de prueba";
  return "Sin resultado";
}

function renderUsers() {
  elements.userList.innerHTML = state.users
    .map(
      (user) => {
        const isProtected = user.email === SUPER_ADMIN.email;
        return `
        <article class="user-card">
          <div>
            <p><strong>${user.username}</strong> · ${user.role}${isProtected ? " · super admin" : ""}</p>
            <p class="kickoff">${user.email}</p>
          </div>
          <div class="user-actions">
            <button class="ghost-action" type="button" data-toggle-role="${user.username}" ${isProtected ? "disabled" : ""}>${user.role === "admin" ? "Jugador" : "Admin"}</button>
            <button class="ghost-action" type="button" data-delete-user="${user.username}" ${user.username === currentUser.username || isProtected ? "disabled" : ""}>Borrar</button>
          </div>
          <div class="password-reset-row">
            <input placeholder="nueva clave alfanumerica" data-password-input="${user.username}" />
            <button class="primary-action" type="button" data-reset-password="${user.username}">Actualizar clave</button>
          </div>
        </article>
      `;
      },
    )
    .join("");
}

function renderPredictionReceipt() {
  if (!currentUser?.lastPredictionRegistration) {
    elements.predictionReceipt.classList.add("hidden");
    elements.predictionReceipt.innerHTML = "";
    return;
  }

  const receipt = currentUser.lastPredictionRegistration;
  elements.predictionReceipt.classList.remove("hidden");
  elements.predictionReceipt.innerHTML = `
    <p><strong>Ultimo registro confirmado:</strong> ${receipt.when}</p>
    <p>${receipt.saved} guardados · ${receipt.deleted} borrados · ${receipt.unchanged} sin cambios · ${receipt.locked} cerrados</p>
  `;
}

function switchAuthMode(mode) {
  authMode = mode;
  document.querySelectorAll("[data-auth-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.authMode === mode);
  });
  document.querySelectorAll(".register-only").forEach((item) => item.classList.toggle("hidden", mode !== "register"));
  elements.email.required = mode === "register";
  elements.authSubmit.textContent = mode === "login" ? "Ingresar" : "Crear cuenta";
  elements.authForm.reset();
  setMessage(elements.authMessage, "");
}

function setActiveView(viewName) {
  activeView = viewName;
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });
  document.querySelectorAll(".view").forEach((view) => view.classList.add("hidden"));
  $(`#${viewName}View`).classList.remove("hidden");
}

function setActiveAdminView(viewName) {
  activeAdminView = viewName;
  document.querySelectorAll("[data-admin-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.adminView === viewName);
  });
  $("#adminResultsView").classList.toggle("hidden", viewName !== "results");
  $("#adminUsersView").classList.toggle("hidden", viewName !== "users");
}

function validateNewUser(username, email, password) {
  if (username.length < 3) return "El usuario debe tener minimo 3 caracteres.";
  if (!validEmail(email)) return "Ingresa un correo valido.";
  if (!validPassword(password)) return passwordValidationMessage();
  if (state.users.some((user) => user.username === username)) return "Ese usuario ya existe.";
  if (state.users.some((user) => user.email === email)) return "Ese correo ya esta registrado.";
  return "";
}

function passwordValidationMessage() {
  return "La contrasena debe tener mas de 8 caracteres alfanumericos e incluir letras y numeros.";
}

function createUser({ username, email, password, role = "player" }) {
  const user = { username, email, password, role, predictions: {} };
  state.users.push(user);
  persist();
  return user;
}

function savePrediction(matchId, home, away) {
  const match = state.matches.find((item) => item.id === matchId);
  if (!match || isPredictionLocked(match)) {
    setMessage(elements.saveMessage, "Este partido ya esta cerrado para pronosticos.", "error");
    renderMatches();
    return;
  }

  if (!Number.isInteger(home) || !Number.isInteger(away)) {
    delete currentUser.predictions[matchId];
    setMessage(elements.saveMessage, "Pronostico borrado.", "ok");
  } else {
    currentUser.predictions[matchId] = { home, away };
    setMessage(elements.saveMessage, "Pronostico guardado.", "ok");
  }

  persist();
  renderApp();
}

function handlePredictionEdit(input) {
  const row = input.closest("[data-match-id]");
  const homeValue = row.querySelector('[data-side="home"]').value;
  const awayValue = row.querySelector('[data-side="away"]').value;
  const bothEmpty = homeValue === "" && awayValue === "";
  const bothComplete = homeValue !== "" && awayValue !== "";

  if (!bothEmpty && !bothComplete) {
    setMessage(elements.saveMessage, "Completa ambos marcadores antes de registrar.", "error");
    return;
  }

  setMessage(elements.saveMessage, "Hay cambios pendientes. Presiona Registrar pronosticos para confirmar.");
}

function samePrediction(previous, next) {
  if (!previous && !next) return true;
  if (!previous || !next) return false;
  return previous.home === next.home && previous.away === next.away;
}

function collectVisiblePredictionDrafts() {
  const drafts = [];
  const errors = [];

  elements.matchList.querySelectorAll("[data-match-id]").forEach((row) => {
    const match = state.matches.find((item) => item.id === row.dataset.matchId);
    const homeInput = row.querySelector('[data-side="home"]');
    const awayInput = row.querySelector('[data-side="away"]');
    const homeValue = homeInput.value;
    const awayValue = awayInput.value;
    const bothEmpty = homeValue === "" && awayValue === "";
    const bothComplete = homeValue !== "" && awayValue !== "";

    if (!bothEmpty && !bothComplete) {
      errors.push(`${displayTeamName(match, "home")} vs ${displayTeamName(match, "away")}`);
      return;
    }

    drafts.push({
      match,
      prediction: bothEmpty ? null : { home: Number(homeValue), away: Number(awayValue) },
    });
  });

  return { drafts, errors };
}

async function registerVisiblePredictions() {
  if (isReadOnlyMode()) {
    setMessage(elements.saveMessage, "La polla ya fue cerrada por el administrador. Solo puedes consultar.", "error");
    return;
  }

  const { drafts, errors } = collectVisiblePredictionDrafts();
  if (errors.length) {
    setMessage(elements.saveMessage, `Hay marcadores incompletos: ${errors.slice(0, 3).join(", ")}.`, "error");
    return;
  }

  let toSave = 0;
  let toDelete = 0;
  let locked = 0;

  drafts.forEach(({ match, prediction }) => {
    const previous = currentUser.predictions[match.id] || null;
    if (isPredictionLocked(match)) {
      if (!samePrediction(previous, prediction)) locked += 1;
      return;
    }
    if (samePrediction(previous, prediction)) return;
    if (prediction) toSave += 1;
    else toDelete += 1;
  });

  if (!toSave && !toDelete && !locked) {
    setMessage(elements.saveMessage, "No hay cambios nuevos para registrar.", "ok");
    return;
  }

  const confirmed = await showConfirmModal({
    title: "Confirmar registro de pronosticos",
    body: `
      <p>Se registraran los cambios visibles en esta pantalla.</p>
      <dl class="modal-summary">
        <div><dt>Guardar / actualizar</dt><dd>${toSave}</dd></div>
        <div><dt>Borrar</dt><dd>${toDelete}</dd></div>
        <div><dt>Cerrados no modificables</dt><dd>${locked}</dd></div>
      </dl>
    `,
    confirmText: "Registrar",
  });

  if (!confirmed) {
    setMessage(elements.saveMessage, "Registro cancelado. No se hicieron cambios.");
    return;
  }

  let saved = 0;
  let deleted = 0;
  let unchanged = 0;

  drafts.forEach(({ match, prediction }) => {
    if (isPredictionLocked(match)) return;

    const previous = currentUser.predictions[match.id] || null;
    if (samePrediction(previous, prediction)) {
      unchanged += 1;
      return;
    }

    if (prediction) {
      currentUser.predictions[match.id] = prediction;
      saved += 1;
    } else {
      delete currentUser.predictions[match.id];
      deleted += 1;
    }
  });

  currentUser.lastPredictionRegistration = {
    when: new Intl.DateTimeFormat("es-CO", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date()),
    saved,
    deleted,
    unchanged,
    locked,
  };

  persist();
  setMessage(elements.saveMessage, `Registro confirmado: ${saved} guardados, ${deleted} borrados.`, "ok");
  renderApp();
}

function updateLockCountdowns() {
  document.querySelectorAll("[data-lock-match-id]").forEach((element) => {
    const match = state.matches.find((item) => item.id === element.dataset.lockMatchId);
    if (match) element.textContent = lockCountdownText(match);
  });
  if (currentUser) renderStats();
}

function normalizeTeamName(value = "") {
  return value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function apiGameFinished(game) {
  const value = game.finished;
  return value === true || value === "TRUE" || value === "true" || value === 1 || value === "1";
}

function apiNumber(value) {
  const number = Number(value);
  return Number.isInteger(number) ? number : null;
}

function apiTeamName(game, side) {
  const homeCandidates = [game.home_team_name_en, game.homeTeamName, game.homeTeam, game.home, game.home_team];
  const awayCandidates = [game.away_team_name_en, game.visitingTeamName, game.awayTeamName, game.awayTeam, game.away, game.away_team, game.visitingTeam];
  const value = (side === "home" ? homeCandidates : awayCandidates).find((item) => typeof item === "string" && item.trim());
  return value ? value.trim() : "";
}

function isUnresolvedTeamName(value = "") {
  const normalized = normalizeTeamName(value);
  return (
    /^([123]) grupo /.test(normalized) ||
    /^([123]) group /.test(normalized) ||
    normalized.includes("ganador") ||
    normalized.includes("perdedor") ||
    normalized.includes("winner") ||
    normalized.includes("loser") ||
    normalized.includes("third")
  );
}

function findMatchForApiGame(game) {
  const byId = state.matches.find((match) => Number(match.id.replace("m", "")) === Number(game.id));
  if (byId) return byId;

  const home = normalizeTeamName(game.home_team_name_en || game.homeTeam || game.home || game.home_team);
  const away = normalizeTeamName(game.away_team_name_en || game.awayTeam || game.away || game.away_team);
  return state.matches.find((match) => {
    const localHome = normalizeTeamName(displayTeamName(match, "home"));
    const localAway = normalizeTeamName(displayTeamName(match, "away"));
    return (normalizeTeamName(match.home) === home && normalizeTeamName(match.away) === away) || (localHome === home && localAway === away);
  });
}

async function syncResultsFromApi({ silent = false } = {}) {
  const url = elements.apiUrl?.value.trim() || state.settings.apiUrl || DEFAULT_API_URL;
  state.settings.apiUrl = url;
  persist();

  if (!silent) setMessage(elements.syncMessage, "Sincronizando resultados...");

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const payload = await response.json();
    const games = Array.isArray(payload) ? payload : payload.games || payload.data || payload.matches || [];
    let updated = 0;
    let finished = 0;
    let renamed = 0;

    games.forEach((game) => {
      const match = findMatchForApiGame(game);
      if (!match) return;

      const apiHome = apiTeamName(game, "home");
      const apiAway = apiTeamName(game, "away");
      if (apiHome && !isUnresolvedTeamName(apiHome) && normalizeTeamName(apiHome) !== normalizeTeamName(match.home) && normalizeTeamName(apiHome) !== normalizeTeamName(match.resolvedHome)) {
        match.resolvedHome = apiHome;
        renamed += 1;
      }
      if (apiAway && !isUnresolvedTeamName(apiAway) && normalizeTeamName(apiAway) !== normalizeTeamName(match.away) && normalizeTeamName(apiAway) !== normalizeTeamName(match.resolvedAway)) {
        match.resolvedAway = apiAway;
        renamed += 1;
      }

      if (!apiGameFinished(game)) return;
      const homeScore = apiNumber(game.home_score ?? game.homeTeamScore ?? game.score?.home);
      const awayScore = apiNumber(game.away_score ?? game.visitingTeamScore ?? game.awayTeamScore ?? game.score?.away);

      if (!match || homeScore === null || awayScore === null) return;
      finished += 1;

      if (match.realHome !== homeScore || match.realAway !== awayScore) {
        match.realHome = homeScore;
        match.realAway = awayScore;
        match.resultSource = "api";
        match.officialFinal = true;
        match.resultLocked = true;
        updated += 1;
      }
      if (!match.officialFinal) {
        match.resultSource = "api";
        match.officialFinal = true;
        match.resultLocked = true;
      }
    });

    state.settings.lastSync = new Intl.DateTimeFormat("es-CO", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date());
    persist();
    renderApp();
    setMessage(elements.syncMessage, `Sincronizacion OK. Finalizados detectados: ${finished}. Marcadores actualizados: ${updated}. Equipos resueltos: ${renamed}.`, "ok");
  } catch (error) {
    if (!silent) setMessage(elements.syncMessage, `No se pudo sincronizar: ${error.message}. Puedes cargar resultados manualmente.`, "error");
  }
}

async function declareTournamentWinner() {
  if (currentUser?.role !== "admin") return;

  const winner = state.users.find((user) => user.username === elements.winnerSelect.value);
  if (!winner) {
    setMessage(elements.tournamentMessage, "Selecciona un participante valido.", "error");
    return;
  }

  const confirmed = await showConfirmModal({
    title: "Declarar ganador de la polla",
    body: `
      <p>Se notificara a todos los perfiles que <strong>${winner.username}</strong> es el ganador.</p>
      <p>Los jugadores quedaran en modo consulta y no podran registrar mas pronosticos.</p>
    `,
    confirmText: "Declarar ganador",
  });

  if (!confirmed) {
    setMessage(elements.tournamentMessage, "Cierre cancelado. No se hicieron cambios.");
    return;
  }

  state.settings.tournamentClosed = true;
  state.settings.winnerUsername = winner.username;
  state.settings.winnerName = winner.username;
  state.settings.winnerDeclaredAt = new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
  persist();
  setMessage(elements.tournamentMessage, `Ganador declarado: ${winner.username}.`, "ok");
  renderApp();
  elements.adminPanel.classList.remove("hidden");
}

async function resetTournamentForNewWorldCup() {
  if (currentUser?.role !== "admin") return;

  const firstConfirm = await showConfirmModal({
    kicker: "// Accion riesgosa",
    title: "Reiniciar mundial",
    body: `
      <p>Esto borrara todos los pronosticos, resultados manuales, resultados oficiales, bloqueos y el ganador declarado.</p>
      <p>Los usuarios y administradores se conservaran.</p>
    `,
    confirmText: "Continuar",
    danger: true,
  });

  if (!firstConfirm) {
    setMessage(elements.tournamentMessage, "Reinicio cancelado.");
    return;
  }

  const secondConfirm = await showConfirmModal({
    kicker: "// Doble confirmacion",
    title: "Confirmacion final",
    body: `
      <p>Para confirmar definitivamente, escribe <strong>REINICIAR</strong>.</p>
      <p>Esta accion no se puede deshacer desde la plataforma.</p>
    `,
    confirmText: "Reiniciar todo",
    requiredText: "REINICIAR",
    danger: true,
  });

  if (!secondConfirm) {
    setMessage(elements.tournamentMessage, "Reinicio cancelado en la segunda confirmacion.");
    return;
  }

  state.matches = mergeMatches([]);
  state.users = ensureSuperAdmin(
    state.users.map((user) => ({
      ...user,
      predictions: {},
      lastPredictionRegistration: null,
    })),
  );
  state.settings = defaultSettings({
    ...state.settings,
    lastSync: null,
    tournamentClosed: false,
    winnerUsername: null,
    winnerName: null,
    winnerDeclaredAt: null,
  });
  persist();
  setMessage(elements.tournamentMessage, "Mundial reiniciado. Usuarios conservados y marcadores limpios.", "ok");
  renderApp();
  elements.adminPanel.classList.remove("hidden");
}

function configureAutoSync() {
  if (autoSyncTimer) clearInterval(autoSyncTimer);
  autoSyncTimer = null;

  if (state.settings.autoSync) {
    autoSyncTimer = setInterval(() => {
      syncResultsFromApi({ silent: true });
    }, AUTO_SYNC_INTERVAL_MS);
  }
}

function resetInactivityTimer() {
  if (!currentUser) return;
  if (inactivityTimer) clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    endSession("Sesion cerrada por 5 minutos de inactividad.");
  }, INACTIVITY_LIMIT_MS);
}

function startSession() {
  sessionStorage.setItem("pollaSessionActive", "true");
  history.replaceState({ authenticated: true }, "", location.href);
  resetInactivityTimer();
}

function endSession(message = "") {
  currentUser = null;
  observedUser = null;
  sessionStorage.removeItem("pollaSessionActive");
  if (inactivityTimer) clearTimeout(inactivityTimer);
  inactivityTimer = null;
  elements.adminPanel.classList.add("hidden");
  switchAuthMode("login");
  if (message) setMessage(elements.authMessage, message, "ok");
  history.replaceState({ authenticated: false }, "", location.href);
  renderApp();
}

function drawGrid() {
  const canvas = document.querySelector(".field-grid");
  const ctx = canvas.getContext("2d");
  const styles = getComputedStyle(document.documentElement);
  const gridColor = styles.getPropertyValue("--grid-line").trim() || "rgba(255, 77, 0, 0.13)";
  const fieldColor = styles.getPropertyValue("--field-line").trim() || "rgba(238, 232, 222, 0.08)";
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  ctx.scale(ratio, ratio);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  const gap = 44;
  for (let x = 0; x <= window.innerWidth; x += gap) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, window.innerHeight);
    ctx.stroke();
  }
  for (let y = 0; y <= window.innerHeight; y += gap) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(window.innerWidth, y);
    ctx.stroke();
  }

  ctx.strokeStyle = fieldColor;
  ctx.beginPath();
  ctx.ellipse(window.innerWidth / 2, window.innerHeight / 2, 180, 180, 0, 0, Math.PI * 2);
  ctx.moveTo(window.innerWidth / 2, 0);
  ctx.lineTo(window.innerWidth / 2, window.innerHeight);
  ctx.moveTo(0, window.innerHeight / 2);
  ctx.lineTo(window.innerWidth, window.innerHeight / 2);
  ctx.stroke();
}

elements.authForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = normalizeUsername(elements.username.value);
  const email = normalizeEmail(elements.email.value);
  const password = elements.password.value.trim();

  if (authMode === "register") {
    const error = validateNewUser(username, email, password);
    if (error) {
      setMessage(elements.authMessage, error, "error");
      return;
    }
    currentUser = createUser({ username, email, password });
    startSession();
    renderApp();
    return;
  }

  const user = state.users.find((item) => (item.username === username || item.email === username) && item.password === password);
  if (!user) {
    setMessage(elements.authMessage, "Usuario o contrasena incorrectos.", "error");
    return;
  }

  currentUser = user;
  startSession();
  renderApp();
});

elements.themeToggle.addEventListener("click", toggleTheme);

document.querySelectorAll("[data-auth-mode]").forEach((button) => {
  button.addEventListener("click", () => switchAuthMode(button.dataset.authMode));
});

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => setActiveView(button.dataset.view));
});

document.querySelectorAll("[data-admin-view]").forEach((button) => {
  button.addEventListener("click", () => setActiveAdminView(button.dataset.adminView));
});

elements.logoutButton.addEventListener("click", () => {
  endSession("Sesion cerrada correctamente.");
});

elements.adminToggle.addEventListener("click", () => {
  elements.adminPanel.classList.toggle("hidden");
});

elements.closeAdmin.addEventListener("click", () => {
  elements.adminPanel.classList.add("hidden");
});

elements.phaseFilter.addEventListener("change", renderMatches);
elements.teamSearch.addEventListener("input", renderMatches);

elements.matchList.addEventListener("input", (event) => {
  if (event.target instanceof HTMLInputElement) handlePredictionEdit(event.target);
});

elements.registerPredictionsButton.addEventListener("click", registerVisiblePredictions);

elements.adminMatchList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-save-result]");
  if (!button) return;

  const row = button.closest("[data-admin-match-id]");
  const match = state.matches.find((item) => item.id === button.dataset.saveResult);
  const homeValue = row.querySelector('[data-real-side="home"]').value;
  const awayValue = row.querySelector('[data-real-side="away"]').value;
  const lockInput = elements.adminMatchList.querySelector(`[data-result-lock="${match.id}"]`);

  match.realHome = homeValue === "" ? null : Number(homeValue);
  match.realAway = awayValue === "" ? null : Number(awayValue);
  if (!match.officialFinal) {
    match.resultSource = match.realHome === null || match.realAway === null ? null : "manual";
    match.resultLocked = match.resultSource === "manual" ? Boolean(lockInput?.checked) : false;
  }
  persist();
  renderApp();
});

elements.adminMatchList.addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-result-lock]");
  if (!checkbox) return;

  const match = state.matches.find((item) => item.id === checkbox.dataset.resultLock);
  if (!match || match.officialFinal) return;

  match.resultLocked = checkbox.checked;
  if (isCompleted(match) && !match.resultSource) match.resultSource = "manual";
  persist();
  renderApp();
});

elements.rankingBody.addEventListener("mouseover", (event) => {
  if (currentUser?.role !== "admin") return;
  const row = event.target.closest("[data-ranking-user]");
  if (!row) return;

  observedUser = state.users.find((user) => user.username === row.dataset.rankingUser) || null;
  renderStats();
});

elements.rankingBody.addEventListener("mouseleave", () => {
  if (currentUser?.role !== "admin") return;
  observedUser = null;
  renderStats();
});

elements.syncResultsButton.addEventListener("click", () => {
  syncResultsFromApi();
});

elements.declareWinnerButton.addEventListener("click", declareTournamentWinner);
elements.resetTournamentButton.addEventListener("click", resetTournamentForNewWorldCup);

elements.apiUrl.addEventListener("change", () => {
  state.settings.apiUrl = elements.apiUrl.value.trim() || DEFAULT_API_URL;
  persist();
});

elements.autoSyncResults.addEventListener("change", () => {
  state.settings.autoSync = elements.autoSyncResults.checked;
  state.settings.apiUrl = elements.apiUrl.value.trim() || DEFAULT_API_URL;
  persist();
  configureAutoSync();
  setMessage(
    elements.syncMessage,
    state.settings.autoSync ? "Sincronizacion automatica activada cada 5 minutos." : "Sincronizacion automatica desactivada.",
    "ok",
  );
});

elements.adminUserForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = normalizeUsername(elements.adminUserName.value);
  const email = normalizeEmail(elements.adminUserEmail.value);
  const password = elements.adminUserPassword.value.trim();
  const role = elements.adminUserRole.value;
  const error = validateNewUser(username, email, password);

  if (error) {
    setMessage(elements.adminUserMessage, error, "error");
    return;
  }

  createUser({ username, email, password, role });
  elements.adminUserForm.reset();
  setMessage(elements.adminUserMessage, "Usuario creado.", "ok");
  renderApp();
  setActiveAdminView(activeAdminView);
});

elements.userList.addEventListener("click", (event) => {
  const toggle = event.target.closest("[data-toggle-role]");
  const deleteButton = event.target.closest("[data-delete-user]");

  if (toggle) {
    const user = state.users.find((item) => item.username === toggle.dataset.toggleRole);
    if (user.email === SUPER_ADMIN.email) return;
    user.role = user.role === "admin" ? "player" : "admin";
    persist();
    renderApp();
    setActiveAdminView(activeAdminView);
  }

  if (deleteButton) {
    const username = deleteButton.dataset.deleteUser;
    state.users = state.users.filter((user) => user.username !== username);
    persist();
    renderApp();
    setActiveAdminView(activeAdminView);
  }

  const resetButton = event.target.closest("[data-reset-password]");
  if (resetButton) {
    const username = resetButton.dataset.resetPassword;
    const input = elements.userList.querySelector(`[data-password-input="${username}"]`);
    const password = input.value.trim();
    const user = state.users.find((item) => item.username === username);

    if (!validPassword(password)) {
      setMessage(elements.adminUserMessage, passwordValidationMessage(), "error");
      return;
    }

    user.password = password;
    input.value = "";
    persist();
    setMessage(elements.adminUserMessage, `Clave actualizada para ${username}.`, "ok");
  }
});

window.addEventListener("resize", drawGrid);
["click", "input", "keydown", "mousemove", "scroll", "touchstart"].forEach((eventName) => {
  window.addEventListener(eventName, resetInactivityTimer, { passive: true });
});

window.addEventListener("pageshow", (event) => {
  if (event.persisted && sessionStorage.getItem("pollaSessionActive") !== "true") {
    currentUser = null;
    renderApp();
  }
});

window.addEventListener("popstate", () => {
  if (sessionStorage.getItem("pollaSessionActive") !== "true") {
    currentUser = null;
    renderApp();
  }
});

applyTheme(loadTheme());
persist();
configureAutoSync();
renderApp();
setInterval(updateLockCountdowns, 30000);
if (state.settings.autoSync) {
  setTimeout(() => syncResultsFromApi({ silent: true }), 1200);
}
