class Form {
  constructor() {
    this.formHTML = document.querySelectorAll('.login-container form');
    this.numberInput = document.querySelector('input#number');
  }

  validation() {
    if (!this.formHTML) return;
    this.formHTML.forEach(form => {
      form.onsubmit = event => {
        event.preventDefault();
        let pError = form.querySelector('.error-message');

        if (
          !this.createErrorToIncorrectEmail(form, pError) ||
          !this.createErrorToPasswordLessThen8(form, pError)
        )
          return false;

        if (pError) pError.remove();
        form.submit();
      };
    });
  }

  createErrorToIncorrectEmail(form, pError) {
    const email = form.querySelector('input[type="email"]').value;
    const patternToEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!patternToEmail.test(email)) {
      const message = 'Este tipo de email é inválido.';
      const pErrorElement = this.errorElement(pError, message);
      form.querySelector('p').insertAdjacentElement('afterend', pErrorElement);
      return false;
    }
    return true;
  }

  createErrorToPasswordLessThen8(form, pError) {
    const passwordInput = form.querySelector('input[type="password"]');
    if (passwordInput.value.length > 40) return false;
    if (passwordInput.value.length < 8) {
      const message = 'Sua senha precisa no mínimo 8 caracteres.';
      const pErrorElement = this.errorElement(pError, message);
      form
        .querySelector('button')
        .insertAdjacentElement('beforebegin', pErrorElement);
      return false;
    }
    return true;
  }

  errorElement(pError, message) {
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
    return pError;
  }
}

const form = new Form();
export { form };
