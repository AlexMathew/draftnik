import { createStore } from "redux";
import { wrapStore } from "webext-redux";
import reducers from "./reducers";
import {
  AUTH_TOKEN_FIELD,
  ACTIONS,
  STORE_PORT_NAME,
  DASHBOARD_URL,
} from "./constants";

const store = createStore(reducers, {});
wrapStore(store, { portName: STORE_PORT_NAME });

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
    case ACTIONS.OPEN_OPTIONS:
      chrome.runtime.openOptionsPage();
      break;
    case ACTIONS.OPEN_DASHBOARD:
      chrome.tabs.create({ url: DASHBOARD_URL });
      break;
  }
});
