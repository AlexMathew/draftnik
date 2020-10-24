import { AUTH_TOKEN_FIELD, ACTIONS, DASHBOARD_URL } from "./constants";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get([AUTH_TOKEN_FIELD], (result) => {
    if (AUTH_TOKEN_FIELD in result) {
      const { auth_token } = result[[AUTH_TOKEN_FIELD]];
      if (auth_token === undefined || auth_token === null) {
        chrome.runtime.openOptionsPage();
      }
    } else {
      chrome.runtime.openOptionsPage();
    }
  });
});

chrome.runtime.onMessage.addListener((message) => {
  const { action } = message;
  switch (action) {
    case ACTIONS.OPEN_OPTIONS: {
      chrome.runtime.openOptionsPage();
    }
  }
});
