import { isEmpty } from 'lodash';
import Swal from 'sweetalert2';

export const isLoggedIn =
  !isEmpty(localStorage.getItem('email')) &&
  !isEmpty(localStorage.getItem('password'));

export const isValidEmail = (email) => {
  // Expresión regular para validar correo electrónico
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

  // Utilizamos el método test() para verificar si el correo cumple con la expresión regular
  return regex.test(email);
};

export const isValidPassword = (password) => !isEmpty(password);

export const sendToast = ({ message, type }) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  Toast.fire({
    icon: type,
    title: message
  });
};

export const setLocalStorageItems = ({ email, password }) =>
  localStorage.setItem('user', { email, password });
