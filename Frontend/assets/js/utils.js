export function formatNumber() {
  const text = document.querySelectorAll('.above div:nth-child(4)');
  text.forEach(element => {
    const formatedValue = element.textContent.split('').map((el, index) => {
      if (index === 0) return '(' + el;
      if (index === 1) return el + ') ';
      if (index === 7) return '-' + el;
      return el;
    });
    element.textContent = formatedValue.join('');
  });
}
