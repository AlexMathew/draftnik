import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ELEMENT_TYPES } from "../../constants";
import DraftSelection from "./DraftSelection";
import _ from "lodash";

const styles = (theme) => ({
  "@global": {
    ".MuiButton-root": {
      fontSize: "small",
    },
  },
});

class Previewer extends React.Component {
  state = {
    preview: false,
    selectedDraft: 0,
  };

  resetPreview = () => {
    document
      .querySelectorAll(
        ".Pitch__PitchUnit-sc-1mctasb-3:not(.draftnik-preview) > .Pitch__PitchElementWrap-sc-1mctasb-4"
      )
      .forEach((elem) => (elem.style.display = "block"));
    document
      .querySelectorAll(".Pitch__PitchUnit-sc-1mctasb-3.draftnik-preview")
      .forEach((elem) => elem.remove());
    document
      .querySelectorAll(".Tabs__TabList-sc-1e6ubpf-0")
      .forEach((elem) => (elem.style.display = "flex"));
  };

  showPreview = () => {
    document
      .querySelectorAll(".Pitch__PitchUnit-sc-1mctasb-3")
      .forEach((elem) => {
        const newElem = elem.cloneNode(true);
        newElem.classList.add("draftnik-preview");
        elem.append(newElem);
      });
    document
      .querySelectorAll(
        ".Pitch__PitchUnit-sc-1mctasb-3:not(.draftnik-preview) > .Pitch__PitchElementWrap-sc-1mctasb-4"
      )
      .forEach((elem) => (elem.style.display = "none"));
    document
      .querySelectorAll(
        ".Pitch__PitchUnit-sc-1mctasb-3.draftnik-preview .Pitch__PrimaryControl-sc-1mctasb-7"
      )
      .forEach((button) => (button.style.display = "none"));
    document
      .querySelectorAll(
        ".Pitch__PitchUnit-sc-1mctasb-3.draftnik-preview .ElementStatus__InfoIcon-sc-1bs5tgy-0"
      )
      .forEach((button) => (button.style.display = "none"));
    document
      .querySelectorAll(".Tabs__TabList-sc-1e6ubpf-0")
      .forEach((elem) => (elem.style.display = "none"));
    this.setDraftPreview();
  };

  setDraftPreview = () => {
    const drafts = this.props.getDrafts();
    const players = this.props.getPlayers();
    const teams = this.props.getTeams();
    const draft = _.find(drafts, (d) => d.id === this.state.selectedDraft);
    const pitchUnits = [
      ...document.querySelectorAll(
        ".Pitch__PitchUnit-sc-1mctasb-3.draftnik-preview"
      ),
    ].filter((pitchUnit) => pitchUnit.innerHTML.trim() != "");
    pitchUnits.forEach((pitchUnit, index) => {
      const playerId = draft.entries[index];
      const player = players[playerId];

      const nameBlock = pitchUnit.querySelector(
        ".PitchElementData__ElementName-sc-1u4y6pr-1"
      );
      nameBlock.innerText = player.web_name;

      const priceBlock = pitchUnit.querySelector(
        ".PitchElementData__ElementValue-sc-1u4y6pr-2"
      );
      priceBlock.innerText = "";

      const pictureSource = pitchUnit.querySelector("picture > source");
      const team = teams[player.team];
      pictureSource.srcset = this.getPictureSourceSrcset(
        team,
        player.element_type
      );
    });
  };

  getPictureSourceSrcset = (team, playerElementType) => {
    const teamCode = team.code;

    return `
      /dist/img/shirts/standard/shirt_${teamCode}${
      playerElementType == ELEMENT_TYPES.GOALKEEPERS ? "_1" : ""
    }-66.webp 66w,
      /dist/img/shirts/standard/shirt_${teamCode}${
      playerElementType == ELEMENT_TYPES.GOALKEEPERS ? "_1" : ""
    }-110.webp 110w,
      /dist/img/shirts/standard/shirt_${teamCode}${
      playerElementType == ELEMENT_TYPES.GOALKEEPERS ? "_1" : ""
    }-220.webp 220w
    `;
  };

  togglePreview = () => {
    if (this.state.preview) {
      this.resetPreview();
      this.setState({ preview: false });
    } else {
      this.showPreview();
      this.setState({ preview: true });
    }
  };

  handleDraftSelection = (event) => {
    const draftId = event.target.value;
    this.setState({ selectedDraft: draftId });
  };

  render() {
    const drafts = this.props.getDrafts();

    return this.state.preview ? (
      <Button
        variant="outlined"
        color="primary"
        disabled={this.state.selectedDraft == 0}
        onClick={this.togglePreview}
      >
        {this.state.preview ? "Close preview" : "Preview"}
      </Button>
    ) : (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <DraftSelection
            drafts={drafts}
            selectedDraft={this.state.selectedDraft}
            handleDraftSelection={this.handleDraftSelection}
          />
        </div>
        <div>
          <Button
            variant="outlined"
            color="primary"
            disabled={this.state.selectedDraft == 0}
            onClick={this.togglePreview}
          >
            {this.state.preview ? "Close preview" : "Preview"}
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Previewer);
