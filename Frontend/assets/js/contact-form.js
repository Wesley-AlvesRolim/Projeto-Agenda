import { formatPhoneNumberInInputAfterLoadPage } from './utils';

class ContactForm {
  constructor() {
    this.form = document.querySelector('.content-new form');
    this.numberInput = document.querySelector('input#number');
  }

  init() {
    if (!this.form) return;
    this.formatNumberOnInput();
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      this.validation(event.target);
    });
  }

  validation(form) {
    if (
      !this.blockEmptyInput() &&
      this.emailValidation() &&
      this.numberValidation()
    ) {
      form.submit();
    }
  }

  blockEmptyInput() {
    const allInputs = this.form.querySelectorAll('p input');
    const inputsMap = Array.from(allInputs).map(input => {
      if (input.value.trim() === '') {
        const message = 'Por favor, preencha este campo.';
        this.errorElement(message, input.parentElement);
        return false;
      }
      return true;
    });
    return inputsMap.includes(false);
  }

  emailValidation() {
    const email = this.form.querySelector('input[type="email"]');
    const patternToEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!patternToEmail.test(email.value)) {
      const message = 'Este tipo de email é inválido.';
      this.errorElement(message, email.parentElement);
      return false;
    }
    return true;
  }

  numberValidation() {
    console.log(this.numberInput.value.length);
    if (this.numberInput.value.length < 15) {
      const message = 'Digite o número completo.';
      this.errorElement(message, this.numberInput.parentElement);
      return false;
    }
    return true;
  }

  formatNumberOnInput() {
    if (!this.numberInput) return;
    formatPhoneNumberInInputAfterLoadPage(this.numberInput);

    this.numberInput.addEventListener('focus', () => {
      if (this.numberInput.value.length === 0) this.numberInput.value = '(';
      this.numberInput.addEventListener('input', () => {
        console.log(this.numberInput.length);
        this.numberInput.addEventListener('keydown', e => {
          if (this.numberInput.value.length === 0) {
            const value = this.numberInput.value.slice(-1);
            this.numberInput.value = '(' + value;
            return;
          }
          if (e.key === 'Backspace') {
            if (this.numberInput.value.length <= 1) {
              this.numberInput.value = '(' + this.numberInput.value.slice(-1);
            }
            return;
          }
          if (this.numberInput.value.length === 3) {
            this.numberInput.value += ') ';
            return;
          }
          if (this.numberInput.value.length === 10) {
            this.numberInput.value += '-';
          }
        });
        if (
          isNaN(this.numberInput.value.slice(-1)) ||
          this.numberInput.value.length > 15
        ) {
          this.numberInput.value = this.numberInput.value.slice(0, -1);
          return;
        }
      });
    });
  }

  errorElement(message, parent) {
    let pError = this.form.querySelector('.error-message');
    if (!pError) pError = document.createElement('p');
    pError.className = 'error-message';
    pError.innerHTML = message;
    pError.style = `
                color: #f00;
                text-shadow: #f00 0px 1px 1px;
                font-size: 0.8rem;
                font-weight: 700;
                letter-spacing: 1px;
                margin-bottom: 5px;`;
    parent.insertAdjacentElement('afterend', pError);
  }
}

const contactForm = new ContactForm();

export { contactForm };
