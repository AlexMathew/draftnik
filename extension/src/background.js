// import { createStore } from "redux";
// import { wrapStore, applyMiddleware } from "webext-redux";
// import thunk from "redux-thunk";
import { fetchStaticData } from "./actions";
// import reducers from "./reducers";
import {
  // AUTH_TOKEN_FIELD,
  ACTIONS,
  // STORE_PORT_NAME,
  DASHBOARD_URL,
} from "./constants";

// const xstore = createStore(reducers, {});
// const middleware = [thunk];
// const store = applyMiddleware(xstore, ...middleware);
// wrapStore(store, { portName: STORE_PORT_NAME });

// const SYNC_STATIC_ALARM_NAME = "syncStaticData";
// const REFRESH_HOURS = 12;

chrome.runtime.onInstalled.addListener(() => {
  // chrome.storage.local.get([AUTH_TOKEN_FIELD], (result) => {
  //   if (AUTH_TOKEN_FIELD in result) {
  //     const { auth_token } = result[[AUTH_TOKEN_FIELD]];
  //     if (auth_token === undefined || auth_token === null) {
  //       chrome.runtime.openOptionsPage();
  //     } else {
  //       store.dispatch(fetchStaticData(true));
  //     }
  //   } else {
  //     chrome.runtime.openOptionsPage();
  //   }
  // });
  // chrome.alarms.create(SYNC_STATIC_ALARM_NAME, {
  //   periodInMinutes: REFRESH_HOURS * 60,
  // });
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

// chrome.alarms.onAlarm.addListener((alarm) => {
//   switch (alarm.name) {
//     case SYNC_STATIC_ALARM_NAME:
//       console.log(SYNC_STATIC_ALARM_NAME);
//       const currentStore = store.getState();
//       const shouldRefresh = currentStore.transfers.saved;
//       if (shouldRefresh) {
//         store.dispatch(fetchStaticData(true));
//       }
//       break;
//   }
// });
