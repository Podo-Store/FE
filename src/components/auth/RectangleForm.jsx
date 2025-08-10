import "./RectangleForm.scss";

const RectangleForm = ({ children, onSubmit }) => {
  const onSubmitDefault = (event) => {
    // form 기본 기능 막기
    event.preventDefault();
    // 가져온 onSubmit 함수 실행
    if (onSubmit) {
      onSubmit();
    }
  };
  return (
    <form className="auth-form" onSubmit={onSubmitDefault}>
      {children}
    </form>
  );
};

export default RectangleForm;
