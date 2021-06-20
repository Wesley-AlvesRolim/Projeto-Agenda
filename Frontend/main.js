import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/global.css';
import './assets/css/home.css';
import './assets/css/login.css';
import './assets/css/error.css';

import { form } from './assets/js/form';
import { formatNumber } from './assets/js/utils';
window.onload = formatNumber();
form.validation();
form.input();
