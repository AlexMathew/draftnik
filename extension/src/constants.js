const BASE_PREFIX = process.env.NODE_ENV === "development" ? "DEV_" : "";

export const AUTH_TOKEN_FIELD = BASE_PREFIX + "DRAFTNIK_EXTENSION_AUTH_TOKEN";

export const ACTIONS = {
  OPEN_OPTIONS: "openOptions",
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
