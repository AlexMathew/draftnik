import React from "react";
import SharedDraftPage from "./sharedDraft/SharedDraftPage";
import SquadView from "./SquadView";
import FixturesView from "./FixturesView";
import { connect } from "react-redux";
import { fetchSharedDraftDetails } from "../actions";

class SharedDraft extends React.Component {
  componentDidMount() {
    const { draftCode } = this.props.match.params;
    this.props.fetchSharedDraftDetails(draftCode);
  }

  render() {
    const { draftCode } = this.props.match.params;
    const body = (
      <>
        <SquadView showUsername={true} />
        <FixturesView />
      </>
    );

    return <SharedDraftPage body={body} draftCode={draftCode} found />;
  }
}

export default connect(null, { fetchSharedDraftDetails })(SharedDraft);
