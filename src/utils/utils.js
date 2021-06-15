exports.formatNumber = req => {
  return {
    ...req.body,
    number: Number(
      req.body.number
        .split('')
        .filter(el => {
          if (Number(el)) return el;
        })
        .join(''),
    ),
  };
};
