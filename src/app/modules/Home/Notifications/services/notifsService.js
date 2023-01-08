import {APP_BASE_URL} from './../../../../constants/urls';
const getNotifications = async () => {
  const url = APP_BASE_URL + 'news';
  const res = await fetch(url);
  return res.json();
};

export {getNotifications};
