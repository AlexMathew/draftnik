const BASE_PREFIX = process.env.NODE_ENV === "development" ? "DEV_" : "";

export const AUTH_TOKEN_FIELD = BASE_PREFIX + "DRAFTNIK_EXTENSION_AUTH_TOKEN";

export const ACTIONS = {
  OPEN_OPTIONS: "openOptions",
};

export const DASHBOARD_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://app.draftnik.cc/";
