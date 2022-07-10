import React from "react";
import { ELEMENT_TYPES } from "../../constants";
import {
  DRAFT_ENTRIES,
  PLAYER_DATA,
  TEAM_DATA,
} from "../../placeholderConstants";
import { getByXpath } from "../../utils/xpath";

class Previewer extends React.Component {
  state = {
    preview: false,
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
    const pitchUnits = [
      ...document.querySelectorAll(
        ".Pitch__PitchUnit-sc-1mctasb-3.draftnik-preview"
      ),
    ].filter((pitchUnit) => pitchUnit.innerHTML.trim() != "");
    pitchUnits.forEach((pitchUnit, index) => {
      const playerId = parseInt(DRAFT_ENTRIES[index]);
      const player = PLAYER_DATA[playerId];

      const nameBlock = pitchUnit.querySelector(
        ".PitchElementData__ElementName-sc-1u4y6pr-1"
      );
      nameBlock.innerText = player.web_name;

      const priceBlock = pitchUnit.querySelector(
        ".PitchElementData__ElementValue-sc-1u4y6pr-2"
      );
      priceBlock.innerText = "";

      const pictureSource = pitchUnit.querySelector("picture > source");
      pictureSource.srcset = this.getPictureSourceSrcset(
        player.team,
        player.element_type
      );
    });
  };

  getPictureSourceSrcset = (teamId, playerElementType) => {
    const team = TEAM_DATA[teamId];
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

  render() {
    return (
      <div
        style={{ cursor: "pointer", border: "1px solid black", padding: "5px" }}
        onClick={this.togglePreview}
      >
        {this.state.preview ? "Close preview" : "Preview"}
      </div>
    );
  }
}

export default Previewer;
