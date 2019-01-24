import { authTypes } from "../actionTypes/auth";
import authAdaptor from "../apis/AuthAdaptor";
import history from "../history";

// helpers
const loginRequest = () => ({ type: authTypes.LOGIN_REQUEST });
const loginSuccess = user => ({ type: authTypes.LOGIN_SUCCESS, payload: user });
const loginFailure = error => ({ type: authTypes.LOGIN_ERROR, payload: error });

// exported action creators
export const signUp = formData => {
  return dispatch => {
    dispatch(loginRequest());

    authAdaptor.signUp({ user: formData }).then(
      user => {
        console.log('signUp user', user)
        dispatch(loginSuccess(user));
        history.push("/lobby");
      },
      error => {
        dispatch(loginFailure(error));
      }
    );
  };
};

export const signIn = formData => {
  return dispatch => {
    dispatch(loginRequest());

    authAdaptor.login({ user: formData }).then(
      user => {
        console.log('signIn user', user)
        dispatch(loginSuccess(user));
        history.push("/lobby");
      },
      error => {
        dispatch(loginFailure(error));
      }
    );
  };
};

export const updateProfile = formData => {
  return dispatch => {
    authAdaptor.update({ user: formData }).then(
      user => {
        dispatch({
          type: authTypes.PROFILE_UPDATE_SUCCESS,
          payload: user
        });
      },
      error => {
        console.error(error);
      }
    );
  };
}

export const signOut = () => {
  authAdaptor.logout();
  return {
    type: authTypes.LOGOUT_SUCCESS
  };
};
