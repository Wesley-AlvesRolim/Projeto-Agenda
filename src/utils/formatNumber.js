exports.formatNumber = req => {
  const convertNumber = () => {
    const stringToArray = req.body.number.split('');

    const filtered = stringToArray.filter(el => {
      if (Number(el) || el === '0') return el;
    });

    const formatted = filtered.join('');
    return Number(formatted);
  };
  return {
    ...req.body,
    number: convertNumber(),
  };
};
