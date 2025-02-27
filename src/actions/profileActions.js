import { PROFILE_SUCCESS, PROFILE_FAIL } from './types';
import Config from '../config';
import Storage from '../storage';
import { logoutUser } from './authActions';
import { notify } from '../utils';

export const updateProfile = values => async dispatch => {
  try {
    const response = await fetch(Config.API_URL + Config.routes.user.user, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
      body: JSON.stringify({ user: values }),
    });

    const status = await response.status;
    if (status === 401 || status === 403) {
      dispatch(logoutUser());
      return;
    }
    notify('Updated profile!', 'Just now');
    dispatch({
      type: PROFILE_SUCCESS,
      payload: values,
    });
  } catch (error) {
    notify('Unable to update profile!', error.message);
    dispatch({
      type: PROFILE_FAIL,
      payload: error.message,
    });
  }
};

export const uploadUserImage = async file => {
  return new Promise(async (resolve, reject) => {
    try {
      let formdata = new FormData();
      formdata.append('image', file);
      const response = await fetch(Config.API_URL + Config.routes.user.profilepicture, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Storage.get('token')}`,
        },
        body: formdata,
      });

      const status = await response.status;
      if (status === 401 || status === 403) {
        logoutUser();
        return;
      }

      const data = await response.json();
      if (!data) throw new Error('Empty response from server');
      if (data.error) throw new Error(data.error.message);

      notify('Updated profile picture!');

      resolve(data);
    } catch (error) {
      notify('Unable to update profile picture!', error.message);
      reject(error);
    }
  });
};
