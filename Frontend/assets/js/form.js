class Form {
  constructor() {
    this.formHTML = document.querySelectorAll('.login-container form');
    this.numberInput = document.querySelector('input#number');
  }
  validation() {
    this.formHTML.forEach(form => {
      form.onsubmit = event => {
        event.preventDefault();
        const passwordInput = form.querySelector('input[type="password"]');
        let pError = form.querySelector('.error-message');

        if (passwordInput.value.length < 8) {
          if (!pError) pError = document.createElement('p');
          pError.className = 'error-message';
          pError.innerHTML = 'Sua senha precisa no mínimo 8 caracteres.';
          pError.style = `
              color: #f00;
              text-shadow: 0px 0px 1px #f00;
              font-size: 0.8rem;
              font-weight: 700;
              margin-bottom: 5px;`;
          form
            .querySelector('button')
            .insertAdjacentElement('beforebegin', pError);
          return false;
        }

        if (pError) pError.remove();
        form.submit();
      };
    });
  }
  input() {
    if (this.numberInput.value.length > 1) {
      const formatedValue = this.numberInput.value
        .split('')
        .map((el, index) => {
          if (index === 0) return '(' + el;
          if (index === 1) return el + ') ';
          if (index === 7) return '-' + el;
          return el;
        });
      this.numberInput.value = formatedValue.join('');
    }
    this.numberInput.addEventListener('focus', () => {
      if (this.numberInput.value.length === 0) this.numberInput.value = '(';
      this.numberInput.addEventListener('input', () => {
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
}
const form = new Form();
export { form };
