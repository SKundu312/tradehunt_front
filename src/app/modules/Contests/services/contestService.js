import {APP_BASE_URL} from './../../../constants/urls';
import {getStorageItem} from './../../../utils/utils';
const url = APP_BASE_URL + 'contests/';
const getPortfolioValue = async contest => {
  const token = await getStorageItem('userToken');
  const res = await fetch(url + 'getUserPortfolio/' + contest, {
    headers: {
      'x-auth-token': token,
    },
  });
  const data = await res.json();
  return data;
};
const getHoldings = async contest => {
  const token = await getStorageItem('userToken');
  const res = await fetch(url + 'getHoldings/' + contest, {
    headers: {
      'x-auth-token': token,
    },
  });
  const data = await res.json();
  return data;
};

const getLeaderBoard = async (contest, isPast) => {
  const token = await getStorageItem('userToken');
  let route = '';
  if (isPast) {
    route = 'getPastLeaderboard/';
  } else {
    route = 'getLeaderBoard/';
  }
  const res = await fetch(url + route + contest, {
    headers: {
      'x-auth-token': token,
    },
  });
  const data = await res.json();
  return data;
};

const buyOrder = async (token, rate, qty, contestId) => {
  const body = {
    token,
    rate,
    qty,
    contestId,
  };
  const tok = await getStorageItem('userToken');

  const res = await fetch(url + 'buyOrder', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'x-auth-token': tok},
    body: JSON.stringify(body),
  });
  return res.json();
};

const sellOrder = async (token, rate, qty, contestId) => {
  const body = {
    token,
    rate,
    qty,
    contestId,
  };
  const tok = await getStorageItem('userToken');

  const res = await fetch(url + 'sellOrder', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'x-auth-token': tok},
    body: JSON.stringify(body),
  });
  return res.json();
};

const getAssetDetails = async (token, contestId) => {
  const tok = await getStorageItem('userToken');
  const res = await fetch(url + 'getAssetDetails/' + contestId + '/' + token, {
    headers: {
      'x-auth-token': tok,
    },
  });
  return res.json();
};

const getOrderBook = async contestId => {
  const tok = await getStorageItem('userToken');
  const res = await fetch(url + 'getOrderHistory/' + contestId, {
    headers: {
      'x-auth-token': tok,
    },
  });
  return res.json();
};

export {
  getPortfolioValue,
  getHoldings,
  getLeaderBoard,
  buyOrder,
  sellOrder,
  getAssetDetails,
  getOrderBook,
};
