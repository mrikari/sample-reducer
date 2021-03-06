import { Button, TextField } from "@material-ui/core";
import { ChangeEvent, useContext } from "react";
import { ProfileActionType, ProfileFormContext } from "./App";

export const ClearButton = () => {
  const { dispatch } = useContext(ProfileFormContext);
  return (
    <Button
      onClick={() => dispatch({ type: ProfileActionType.CLEAR })}
      variant="contained"
      color="primary"
    >
      クリア
    </Button>
  );
};

export const UserNameForm = () => {
  const { state, dispatch } = useContext(ProfileFormContext);

  return (
    <TextField
      value={state.data.username}
      error={!state.valid.username.isValid}
      helperText={!state.valid.username.helperText}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        dispatch({
          type: ProfileActionType.CHANGE_USERNAME,
          payload: { username: e.target.value },
        })
      }
    />
  );
};

export const UserNameViewer = () => {
  const { state } = useContext(ProfileFormContext);

  return (
    <TextField
      value={state.data.username}
      inputProps={{
        readOnly: true,
      }}
    />
  );
};
