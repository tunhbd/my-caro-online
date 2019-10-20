import { parseCookies, setCookie } from 'nookies';

export const getCookie = field => {
  return parseCookies(null)[field];
};

export const updateCookie = (field, value, opt) => {
  setCookie(null, field, value, opt);
};
