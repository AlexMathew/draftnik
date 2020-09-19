export const getDateString = (datetime = null) => {
  return Intl.DateTimeFormat(navigator.language, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(datetime ? new Date(datetime) : new Date());
};

export const getTimeString = (datetime = null) => {
  return Intl.DateTimeFormat(navigator.language, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(datetime ? new Date(datetime) : new Date());
};

export const getDateTimeString = (datetime = null) => {
  return Intl.DateTimeFormat(navigator.language, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(datetime ? new Date(datetime) : new Date());
};

export const getTimeZoneName = (datetime = null) => {
  return Intl.DateTimeFormat(navigator.language, { timeZoneName: "long" })
    .formatToParts(datetime ? new Date(datetime) : new Date())
    .find((part) => part.type === "timeZoneName").value;
};

export const getLocaleTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
