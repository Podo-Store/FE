const formatDate2 = (date) => {
  // 원래 문자열에서 T와 초 이하 부분 제거
  let formattedDate = date.split(".")[0];

  // Date 객체로 변환
  let dateObj = new Date(formattedDate);

  // 년, 월, 일, 시, 분, 초 가져오기
  let year = dateObj.getFullYear();
  let month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  let day = String(dateObj.getDate()).padStart(2, "0");
  let hours = String(dateObj.getHours()).padStart(2, "0");
  let minutes = String(dateObj.getMinutes()).padStart(2, "0");
  let seconds = String(dateObj.getSeconds()).padStart(2, "0");

  // 원하는 형식으로 문자열 생성
  return `${year}. ${month}. ${day}. ${hours}:${minutes}:${seconds}`;
};

export default formatDate2;
