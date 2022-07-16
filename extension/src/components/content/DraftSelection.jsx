import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
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
    // const draftsByGameweek = _.groupBy(drafts, "gameweek");
    // console.log(draftsByGameweek);

    return (
      <FormControl className={classes.formControl}>
        <Typography>Select draft to preview</Typography>
        <Select
          id="draft-select"
          value={selectedDraft}
          onChange={handleDraftSelection}
        >
          <MenuItem value={0}></MenuItem>
          {drafts.map((draft) => (
            <MenuItem key={draft.id} value={draft.id}>
              {draft.name}
            </MenuItem>
          ))}
          {/* {Object.keys(draftsByGameweek).map((gameweek) => (
            <div key={gameweek}>
              <ListSubheader>Gameweek {gameweek}</ListSubheader>
              {draftsByGameweek[[gameweek]].map((draft) => (
                <MenuItem key={draft.id} value={draft.id.toString()}>
                  {draft.name}
                </MenuItem>
              ))}
            </div>
          ))} */}
        </Select>
      </FormControl>
    );
  }
}

export default withStyles(styles)(DraftSelection);
