import { all, call, put, takeLatest } from "redux-saga/effects";
import { 
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth, getCurrentUser,
  signInWithEmailPassword,
  signInWithGooglePopup, 
  signOutUser
} from "../../utils/firebase/firebase.utils";
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess } from "./user.action";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, {...userAuth, ...additionalDetails});
    yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
  } catch(error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if(!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch(error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithEmail({payload: {email, password}}) {
  try {
    const {user} = yield call(signInWithEmailPassword, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch(error) {
    yield put(signInFailed(error));
  }
}

export function* signUp({ payload: { email, password, displayName }}) {
  try {
    console.log(displayName)
    const {user} = yield call(createAuthUserWithEmailAndPassword, email, password);
    yield put(signUpSuccess(user, {displayName}));
  } catch(error) {
    yield put(signUpFailed(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails }}) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch(error) {
    yield put(signInFailed(error));
  }
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch(error) {
    yield put(signOutFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest('user/checkUserSession', isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield takeLatest('user/emailSignInStart', signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield takeLatest('user/googleSignInStart', signInWithGoogle);
}

export function* onSignUpStart() {
  yield takeLatest('user/signUpStart', signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest('user/signUpSuccess', signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest('user/signOutStart', signOut);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart)
  ]);
}