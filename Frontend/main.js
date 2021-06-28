import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/global.css';
import './assets/css/home.css';
import './assets/css/login.css';
import './assets/css/error.css';

import { form } from './assets/js/form';
import { formatNumber } from './assets/js/utils';

function errorMessage() {
  const errorLayer = document.querySelector('.error-container');
  if (errorLayer) {
    setTimeout(() => {
      errorLayer.classList.add('removing');
    }, 5000);
    setTimeout(() => {
      errorLayer.remove();
    }, 7000);
  }
}

window.onload = function () {
  formatNumber();
  errorMessage();
  form.validation();
  form.input();
};
