import { AuthUser, CreatedUserData } from '../../utils/firebase/firebase.utils';
import {
  Action,
  ActionWithPayload,
  createAction,
} from '../../utils/reducer/reducer.utils';
import { UserActionTypes } from './user.types';

export type CheckUserSession = Action<UserActionTypes.checkSession>;
export type GoogleSignInStart = Action<UserActionTypes.googleSignInStart>;
export type EmailSignInStart = ActionWithPayload<
  UserActionTypes.emailSignInStart,
  {
    email: string;
    password: string;
  }
>;
export type SignInSuccess = ActionWithPayload<
  UserActionTypes.signInSuccess,
  CreatedUserData
>;
export type SignInFailed = ActionWithPayload<
  UserActionTypes.signInFailed,
  Error
>;
export type SignUpStart = ActionWithPayload<
  UserActionTypes.signUpStart,
  {
    email: string;
    password: string;
    displayName: string;
  }
>;
export type SignUpSuccess = ActionWithPayload<
  UserActionTypes.signUpSuccess,
  AuthUser
>;
export type SignUpFailed = ActionWithPayload<
  UserActionTypes.signUpFailed,
  Error
>;
export type SignOutStart = Action<UserActionTypes.signOutStart>;
export type SignOutSuccess = Action<UserActionTypes.signOutSuccess>;
export type SignOutFailed = ActionWithPayload<
  UserActionTypes.signOutFailed,
  Error
>;

export type UserAction =
  | CheckUserSession
  | GoogleSignInStart
  | EmailSignInStart
  | SignInSuccess
  | SignInFailed
  | SignUpStart
  | SignUpSuccess
  | SignUpFailed
  | SignOutStart
  | SignOutSuccess
  | SignOutFailed;

export const checkUserSession = (): CheckUserSession =>
  createAction(UserActionTypes.checkSession);

export const googleSignInStart = (): GoogleSignInStart =>
  createAction(UserActionTypes.googleSignInStart);

export const emailSignInStart = (
  email: string,
  password: string
): EmailSignInStart =>
  createAction(UserActionTypes.emailSignInStart, { email, password });

export const signInSuccess = (
  user: CreatedUserData & { id: string }
): SignInSuccess => createAction(UserActionTypes.signInSuccess, user);

export const signInFailed = (error: Error): SignInFailed =>
  createAction(UserActionTypes.signInFailed, error);

export const signUpStart = (
  email: string,
  password: string,
  displayName: string
): SignUpStart =>
  createAction(UserActionTypes.signUpStart, { email, password, displayName });

export const signUpSuccess = (user: AuthUser): SignUpSuccess =>
  createAction(UserActionTypes.signUpSuccess, user);

export const signUpFailed = (error: Error): SignUpFailed =>
  createAction(UserActionTypes.signUpFailed, error);

export const signOutStart = (): SignOutStart =>
  createAction(UserActionTypes.signOutStart);

export const signOutSuccess = (): SignOutSuccess =>
  createAction(UserActionTypes.signOutSuccess);

export const signOutFailed = (error: Error): SignOutFailed =>
  createAction(UserActionTypes.signOutFailed, error);
