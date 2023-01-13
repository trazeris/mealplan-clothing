import { CreatedUserData } from '../../utils/firebase/firebase.utils';
import { RootState } from '../store';

export const selectCurrentUser = (state: RootState): CreatedUserData | null =>
  state.user.currentUser;

export const selectIsAuthLoading = (state: RootState): boolean =>
  state.user.isLoading;
