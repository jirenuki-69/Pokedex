import { isEmpty } from 'lodash';

export const isLoggedIn =
  !isEmpty(localStorage.getItem('email')) &&
  !isEmpty(localStorage.getItem('password'));
