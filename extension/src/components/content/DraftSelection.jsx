import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";
import _ from "lodash";

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
});

class DraftSelection extends React.Component {
  render() {
    const { classes, drafts, selectedDraft, handleDraftSelection } = this.props;
    const orderedDrafts = _.orderBy(drafts, "gameweek");

    return (
      <FormControl className={classes.formControl}>
        <Typography>Select draft to preview</Typography>
        <Select
          id="draft-select"
          value={selectedDraft}
          onChange={handleDraftSelection}
        >
          <MenuItem value={0}></MenuItem>
          {orderedDrafts.map((draft) => (
            <MenuItem key={draft.id} value={draft.id}>
              [GW{draft.gameweek}] {draft.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export default withStyles(styles)(DraftSelection);
