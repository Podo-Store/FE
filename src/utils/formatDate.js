// Date: 2021-09-19 -> 2021. 09. 19.
const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${year}. ${month}. ${day}.`;
};

export default formatDate;
