import React, { createContext, useReducer } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BaseValidator, ValidState } from "./validators/validator";
import { ClearButton, UserNameForm, UserNameViewer } from "./ProfileForm";

type FormType = "profile";

interface FormState {
  type: FormType;
  data: { [key: string]: string | number };
  valid: { [key: string]: ValidState };
}

export interface ProfileFormState extends FormState {
  data: {
    username: string;
    password: string;
    publicRelations: string;
  };
  valid: {
    username: ValidState;
    password: ValidState;
    publicRelations: ValidState;
  };
}

type ProfileStateValidator = {
  username: BaseValidator[];
  password: BaseValidator[];
  publicRelations: BaseValidator[];
};

export enum ProfileActionType {
  CLEAR,
  SUBMIT,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  CHANGE_PR,
}

type ProfileFormAction =
  | { type: ProfileActionType.CLEAR }
  | {
      type: ProfileActionType.SUBMIT;
      payload: { validators: ProfileStateValidator };
    }
  | { type: ProfileActionType.CHANGE_USERNAME; payload: { username: string } }
  | { type: ProfileActionType.CHANGE_PASSWORD; payload: { password: string } }
  | { type: ProfileActionType.CHANGE_PR; payload: { publicRelations: string } };

export const profileInitialState: ProfileFormState = {
  type: "profile",
  data: {
    username: "",
    password: "",
    publicRelations: "",
  },
  valid: {
    username: { isValid: true, helperText: "" },
    password: { isValid: true, helperText: "" },
    publicRelations: { isValid: true, helperText: "" },
  },
};

export const profileReducer = (
  state: ProfileFormState,
  action: ProfileFormAction
): ProfileFormState => {
  switch (action.type) {
    case ProfileActionType.CHANGE_USERNAME:
      return {
        ...state,
        data: {
          ...state.data,
          username: action.payload.username,
        },
      };
    case ProfileActionType.CHANGE_PASSWORD:
      return {
        ...state,
        data: {
          ...state.data,
          password: action.payload.password,
        },
      };
    case ProfileActionType.CHANGE_PR:
      return {
        ...state,
        data: {
          ...state.data,
          publicRelations: action.payload.publicRelations,
        },
      };
    case ProfileActionType.SUBMIT:
      // バリデーション処理
      // バリデーションチェックに失敗した場合
      // ValidStateを更新してstateを返却

      // バリデーションチェックに成功した場合
      // stateからフォームデータオブジェクトを作成
      // 更新処理
      // 更新結果をstateとして保持 / もしくはクリア
      alert("更新しました");
      return state;
    case ProfileActionType.CLEAR:
      return profileInitialState;
    default:
      return state;
  }
};

export const ProfileFormContext = createContext(
  {} as {
    state: ProfileFormState;
    dispatch: React.Dispatch<ProfileFormAction>;
  }
);

function App() {
  const [state, dispatch] = useReducer(profileReducer, profileInitialState);

  return (
    <ProfileFormContext.Provider value={{ state: state, dispatch: dispatch }}>
      <div className="App">
        <UserNameForm />
        <UserNameViewer />
        <ClearButton />
      </div>
    </ProfileFormContext.Provider>
  );
}

export default App;
