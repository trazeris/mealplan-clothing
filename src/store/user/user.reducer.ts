import { AnyAction } from 'redux';
import { CreatedUserData } from '../../utils/firebase/firebase.utils';
import { UserAction } from './user.action';
import { UserActionTypes } from './user.types';

export type UserState = {
  readonly currentUser: CreatedUserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = initialState,
  action: AnyAction
): UserState => {
  const userAction = { ...action } as UserAction;
  switch (userAction.type) {
    case UserActionTypes.signInSuccess:
      return {
        ...state,
        isLoading: false,
        currentUser: userAction.payload,
      };
    case UserActionTypes.signUpFailed:
    case UserActionTypes.signInFailed:
    case UserActionTypes.signOutFailed:
      return {
        ...state,
        isLoading: false,
        error: userAction.payload,
      };
    case UserActionTypes.signOutStart:
    case UserActionTypes.signUpStart:
    case UserActionTypes.googleSignInStart:
    case UserActionTypes.emailSignInStart:
      return {
        ...state,
        isLoading: true,
      };
    case UserActionTypes.signOutSuccess:
      return {
        ...state,
        isLoading: false,
        currentUser: null,
      };
  }
  return state;
};
