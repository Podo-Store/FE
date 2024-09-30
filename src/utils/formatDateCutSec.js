const formatDateCutSec = (date) => {
  let dateObj = new Date(date);

  let year = dateObj.getFullYear();
  let month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  let day = String(dateObj.getDate()).padStart(2, "0");
  let hours = String(dateObj.getHours()).padStart(2, "0");
  let minutes = String(dateObj.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default formatDateCutSec;
