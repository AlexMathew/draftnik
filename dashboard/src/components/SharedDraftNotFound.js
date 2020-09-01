import React from "react";
import SharedDraftPage from "./sharedDraft/SharedDraftPage";
import NotFound from "./sharedDraft/NotFound";

class SharedDraftNotFound extends React.Component {
  render() {
    return (
      <SharedDraftPage body={<NotFound />} found={false}></SharedDraftPage>
    );
  }
}

export default SharedDraftNotFound;
