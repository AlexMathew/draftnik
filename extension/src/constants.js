const BASE_PREFIX = process.env.NODE_ENV === "development" ? "DEV_" : "";

export const AUTH_TOKEN_FIELD = BASE_PREFIX + "DRAFTNIK_EXTENSION_AUTH_TOKEN";
export const STATIC_DATA_FIELD = BASE_PREFIX + "DRAFTNIK_EXTENSION_STATIC_DATA";

export const ACTIONS = {
  OPEN_OPTIONS: "openOptions",
  OPEN_DASHBOARD: "openDashboard",
};

export const DASHBOARD_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://app.draftnik.cc/";

export const STORE_PORT_NAME = "draftnik-store";

export const ELEMENT_TYPES = {
  GOALKEEPERS: 1,
  DEFENDERS: 2,
  MIDFIELDERS: 3,
  FORWARDS: 4,
};

export const AVAILABILITY = {
  AVAILABLE: "a",
  DOUBTFUL: "d",
  TRANSFERRED: "u",
  INJURED: "i",
  ON_LOAN: "n",
  SUSPENDED: "s",
};

export const GAMEWEEK_DATA = {
  1: { id: 1, name: "Gameweek 1" },
  2: { id: 2, name: "Gameweek 2" },
  3: { id: 3, name: "Gameweek 3" },
  4: { id: 4, name: "Gameweek 4" },
  5: { id: 5, name: "Gameweek 5" },
  6: { id: 6, name: "Gameweek 6" },
  7: { id: 7, name: "Gameweek 7" },
  8: { id: 8, name: "Gameweek 8" },
  9: { id: 9, name: "Gameweek 9" },
  10: { id: 10, name: "Gameweek 10" },
  11: { id: 11, name: "Gameweek 11" },
  12: { id: 12, name: "Gameweek 12" },
  13: { id: 13, name: "Gameweek 13" },
  14: { id: 14, name: "Gameweek 14" },
  15: { id: 15, name: "Gameweek 15" },
  16: { id: 16, name: "Gameweek 16" },
  17: { id: 17, name: "Gameweek 17" },
  18: { id: 18, name: "Gameweek 18" },
  19: { id: 19, name: "Gameweek 19" },
  20: { id: 20, name: "Gameweek 20" },
  21: { id: 21, name: "Gameweek 21" },
  22: { id: 22, name: "Gameweek 22" },
  23: { id: 23, name: "Gameweek 23" },
  24: { id: 24, name: "Gameweek 24" },
  25: { id: 25, name: "Gameweek 25" },
  26: { id: 26, name: "Gameweek 26" },
  27: { id: 27, name: "Gameweek 27" },
  28: { id: 28, name: "Gameweek 28" },
  29: { id: 29, name: "Gameweek 29" },
  30: { id: 30, name: "Gameweek 30" },
  31: { id: 31, name: "Gameweek 31" },
  32: { id: 32, name: "Gameweek 32" },
  33: { id: 33, name: "Gameweek 33" },
  34: { id: 34, name: "Gameweek 34" },
  35: { id: 35, name: "Gameweek 35" },
  36: { id: 36, name: "Gameweek 36" },
  37: { id: 37, name: "Gameweek 37" },
  38: { id: 38, name: "Gameweek 38" },
};
