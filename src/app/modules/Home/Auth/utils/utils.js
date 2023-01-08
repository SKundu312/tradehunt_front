import React, {useContext} from 'react';
import {AuthContext} from './../../../../context/context';

const signOutFromApp = () => {};
const phoneRegex = /^\d{10}$/;
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export {signOutFromApp, emailRegex, phoneRegex};
