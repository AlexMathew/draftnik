import React from "react";
import ReactDOM from "react-dom";
import DraftDialog from "./content/DraftDialog";
import { getByXpath } from "../utils/xpath";
import Previewer from "./content/Previewer";
import { DASHBOARD_URL, AUTH_TOKEN_FIELD } from "../constants";
import { formatGwFixtures } from "../utils/fixtures";
import draftnik from "../api/draftnik";
import _ from "lodash";

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

class ContentScript extends React.Component {
  state = {
    modalOpen: false,
    modalState: {
      error: {
        name: "",
      },
    },
    teams: {},
    players: {},
    gameweeks: {},
    fixtures: {
      byTeam: {},
      byGameweek: {},
    },
    drafts: [],
    loading: {
      static: false,
    },
    loaded: {
      static: false,
    },
  };

  handleOpen = () => {
    this.setState({ modalOpen: true, modalState: { error: { name: "" } } });
  };

  handleClose = () => {
    this.setState({ modalOpen: false, modalState: { error: { name: "" } } });
  };

  setDialogError = (error) => {
    this.setState({ modalState: { error } });
  };

  insertSaveButton = (transfersButton) => {
    const existingSaveDiv = getByXpath(`//div[@class="draftnik"]`);
    if (!existingSaveDiv) {
      const transfersDiv = transfersButton.parentElement;
      const saveDiv = document.createElement("div");
      saveDiv.classList = "draftnik";
      saveDiv.style =
        "margin-top: 10px; display: flex; flex-direction: column; align-items: center; gap: 16px;";
      const saveButton = document.createElement("button");
      saveButton.disabled = transfersButton.disabled;
      saveButton.classList = transfersButton.classList;
      saveButton.onclick = this.handleOpen;
      const saveText = document.createTextNode("Save Draft");
      saveButton.appendChild(saveText);

      const goToDashboard = document.createElement("a");
      goToDashboard.href = DASHBOARD_URL;
      goToDashboard.target = "_blank";
      goToDashboard.style = "font-weight: bold";
      const goToDashboardText = document.createTextNode("View saved drafts ↗");
      goToDashboard.appendChild(goToDashboardText);

      saveDiv.appendChild(saveButton);
      saveDiv.appendChild(goToDashboard);
      transfersDiv.appendChild(saveDiv);

      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.attributeName === "disabled") {
            saveButton.disabled = mutation.target.disabled;
            saveButton.classList = mutation.target.classList;
          }
        });
      });
      observer.observe(transfersButton, {
        attributes: true,
      });
    }
  };

  getDrafts = () => {
    return this.state.drafts;
  };

  getPlayers = () => {
    return this.state.players;
  };

  getTeams = () => {
    return this.state.teams;
  };

  insertPreviewer = () => {
    const existingPreviewerDiv = getByXpath(
      `//div[@class="draftnik-previewer"]`
    );
    const pitchDiv = document.querySelector(
      `div.SquadBase__Pusher-sc-16cuskw-1 div.Pitch__StyledPitch-sc-1mctasb-0`
    );
    if (!this.state.loaded.static) {
      return;
    }
    if (!existingPreviewerDiv) {
      if (pitchDiv) {
        const baseDiv = pitchDiv.parentElement;
        const previewerDiv = document.createElement("div");
        previewerDiv.classList = "draftnik-previewer";
        previewerDiv.style.display = "flex";
        previewerDiv.style.justifyContent = "center";
        previewerDiv.style.padding = "5px";
        baseDiv.insertBefore(previewerDiv, baseDiv.firstChild);
        ReactDOM.render(
          <Previewer
            getDrafts={this.getDrafts}
            getPlayers={this.getPlayers}
            getTeams={this.getTeams}
          />,
          previewerDiv
        );
      }
    } else {
      if (pitchDiv) {
        existingPreviewerDiv.style.display = "flex";
      } else {
        existingPreviewerDiv.style.display = "none";
      }
    }
  };

  loadStaticData = () => {
    chrome.storage.local.get([AUTH_TOKEN_FIELD], async (result) => {
      if (AUTH_TOKEN_FIELD in result) {
        const { auth_token } = result[[AUTH_TOKEN_FIELD]];
        if (auth_token !== undefined && auth_token !== null) {
          try {
            this.setState({ loading: { static: true } });
            const response = await draftnik.get("/draft/static/", {
              headers: {
                Authorization: `Token ${auth_token}`,
              },
            });
            this.setState({
              teams: { ...this.state.teams, ...response.data.static.teams },
            });
            this.setState({
              players: {
                ...this.state.players,
                ...response.data.static.players,
              },
            });
            this.setState({
              gameweeks: {
                ...this.state.gameweeks,
                ...response.data.static.gameweeks,
              },
            });
            this.setState({
              fixtures: {
                ...this.state.fixtures,
                byTeam: response.data.static.team_fixtures,
                byGameweek: formatGwFixtures(
                  response.data.static.gameweek_fixtures
                ),
              },
            });
            const drafts = _.orderBy(response.data.drafts, "gameweek");
            this.setState({
              drafts: [...this.state.drafts, ...drafts],
            });
            this.setState({ loaded: { static: true } });
            this.insertPreviewer();
          } catch (error) {
            console.error(error);
            if (error.response?.status === 401) {
              console.log("Draftnik:: Unauthenticated");
            }
          } finally {
            this.setState({ loading: { static: false } });
          }
        }
      }
    });
  };

  componentDidMount() {
    console.log("Draftnik");
    this.loadStaticData();

    var observer = new MutationObserver(() => {
      const initialButton = getByXpath(
        `//button[contains(text(),'Enter Squad')]`
      );
      const transfersButton = getByXpath(
        `//button[contains(text(),'Make Transfers')]`
      );
      if (initialButton || transfersButton) {
        this.insertSaveButton(initialButton || transfersButton);
      }
      this.insertPreviewer();
    });
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }

  render() {
    return (
      <DraftDialog
        open={this.state.modalOpen}
        modalState={this.state.modalState}
        handleClose={this.handleClose}
        setDialogError={this.setDialogError}
      />
    );
  }
}

export default ContentScript;
