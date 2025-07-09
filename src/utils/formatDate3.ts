const formatDate3 = (date: string) => {
  // 원래 문자열에서 T와 초 이하 부분 제거
  let formattedDate = date.split(".")[0];

  // Date 객체로 변환
  let dateObj = new Date(formattedDate);

  let year = dateObj.getFullYear();
  let month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  let day = String(dateObj.getDate()).padStart(2, "0");

  // 원하는 형식으로 문자열 생성
  return `${year}.${month}.${day}.`;
};

export default formatDate3;
