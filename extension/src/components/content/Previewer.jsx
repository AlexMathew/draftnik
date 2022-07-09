import React from "react";

class Previewer extends React.Component {
  state = {
    preview: false,
  };

  togglePreview = () => {
    if (this.state.preview) {
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
      this.setState({ preview: false });
    } else {
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
