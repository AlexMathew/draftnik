const FALLBACK_LOCALE = "en";

export const getDateString = (datetime = null) => {
  return Intl.DateTimeFormat([navigator.language, FALLBACK_LOCALE], {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(datetime ? new Date(datetime) : new Date());
};

export const getUSDateString = (datetime = null) => {
  return (datetime ? new Date(datetime) : new Date()).toLocaleDateString(
    "en-US",
    {
      dateStyle: "full",
    }
  );
};
