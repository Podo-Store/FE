const EnterForm = ({ children, onSubmit }) => {
  const onSubmitDefault = (event) => {
    // form 기본 기능 막기
    event.preventDefault();
    // 가져온 onSubmit 함수 실행
    if (onSubmit) {
      onSubmit();
    }
  };
  return (
    <form
      onSubmit={onSubmitDefault}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          // Enter 키가 눌렸을 때 onSubmitDefault 호출 (Enter 키 입력 시 제출하는 form 기본 기능 막기)
          onSubmitDefault(e);
        }
      }}
    >
      {children}
    </form>
  );
};

export default EnterForm;
