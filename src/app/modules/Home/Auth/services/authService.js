import {APP_BASE_URL} from './../../../../constants/urls';
import {getStorageItem} from './../../../../utils/utils';
const url = APP_BASE_URL + 'user/';

const registerUser = async (email, password, phone, name) => {
  const fcm = await getStorageItem('fcmToken');

  const body = {
    email,
    password,
    phone,
    name,
    fcm,
  };

  const res = await fetch(url + 'register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  });
  return res.json();
};
const loginUser = async (email, password) => {
  const fcm = await getStorageItem('fcmToken');
  const body = {
    email,
    password,
    fcm,
  };
  const res = await fetch(url + 'login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  });
  return res.json();
};

export {registerUser, loginUser};
