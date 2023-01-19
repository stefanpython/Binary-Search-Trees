const randomArray = () => {
  const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 200));
  return arr;
};

module.exports = randomArray();
