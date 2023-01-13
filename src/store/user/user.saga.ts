import { User } from 'firebase/auth';
import { all, call, put, takeLatest } from 'typed-redux-saga/macro';
import {
  AuthUser,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithEmailPassword,
  signInWithGooglePopup,
  signOutUser,
} from '../../utils/firebase/firebase.utils';
import {
  EmailSignInStart,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  SignUpStart,
  SignUpSuccess,
  signUpSuccess,
} from './user.action';
import { UserActionTypes } from './user.types';

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: { displayName?: string }
) {
  try {
    const userSnapshot = yield* call(createUserDocumentFromAuth, {
      ...userAuth,
      ...additionalDetails,
    } as AuthUser);
    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const { user } = yield* call(signInWithEmailPassword, email, password);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUp({
  payload: { email, password, displayName },
}: SignUpStart) {
  try {
    const { user } = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield* put(signUpSuccess({ ...user, displayName }));
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

export function* signInAfterSignUp({ payload: authUser }: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, authUser, {
    displayName: authUser.displayName,
  });
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

export function* onCheckUserSession() {
  yield* takeLatest(UserActionTypes.checkSession, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield* takeLatest(UserActionTypes.emailSignInStart, signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(UserActionTypes.googleSignInStart, signInWithGoogle);
}

export function* onSignUpStart() {
  yield* takeLatest(UserActionTypes.signUpStart, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(UserActionTypes.signUpSuccess, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield* takeLatest(UserActionTypes.signOutStart, signOut);
}

export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
