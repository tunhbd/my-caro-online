import { parseCookies, setCookie, destroyCookie } from 'nookies';

export const getCookie = field => {
  return parseCookies(null)[field];
};

export const updateCookie = (field, value, opt) => {
  setCookie(null, field, value, opt || {});
};

export const deleteCookie = field => {
  destroyCookie(null, field);
};
