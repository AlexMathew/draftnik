const BASE_PREFIX = process.env.NODE_ENV === "development" ? "DEV_" : "";

export const AUTH_TOKEN_FIELD = BASE_PREFIX + "DRAFTNIK_AUTH_TOKEN";

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

export const LANDING_PAGE_URL = "https://draftnik.cc/";
