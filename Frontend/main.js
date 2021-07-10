import './assets/css/global.css';
import './assets/css/home.css';
import './assets/css/login.css';
import './assets/css/error.css';

import { form } from './assets/js/form';
import { formatNumber } from './assets/js/utils';

function errorMessage() {
  const errorLayer = document.querySelector('.error-container');
  if (!errorLayer) return;
  errorLayer.addEventListener('click', () => {
    errorLayer.classList.add('removing');
    setTimeout(() => errorLayer.remove(), 250);
  });

  if (errorLayer) {
    setTimeout(() => {
      errorLayer.classList.add('removing');
    }, 5000);
    setTimeout(() => {
      errorLayer.remove();
    }, 7000);
  }
}

function menuClickEvent() {
  const menu = document.querySelector('body > header > div');
  const menuBar = document.querySelector('.menu-bar');
  menu.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuBar.classList.toggle('active');
  });
}

window.onload = function () {
  formatNumber();
  menuClickEvent();
  errorMessage();
  form.validation();
  form.input();
};
