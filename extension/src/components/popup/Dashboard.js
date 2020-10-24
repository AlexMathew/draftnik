import React from "react";
import { connect } from "react-redux";
import { fetchStaticData } from "../../actions";
import { AUTH_TOKEN_FIELD } from "../../constants";

class Dashboard extends React.Component {
  componentDidMount() {
    chrome.storage.local.get([AUTH_TOKEN_FIELD], (result) => {
      const token = result[[AUTH_TOKEN_FIELD]];
      if (token !== undefined && token.auth_token !== null) {
        this.props.fetchStaticData();
      } else {
        this.props.history.push("/noauth");
      }
    });
  }

  render() {
    return <div>Draftnik.</div>;
  }
}

export default connect(null, { fetchStaticData })(Dashboard);
