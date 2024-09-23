const Form = ({ children, onSubmit }) => {
  const onSubmitDefault = async (event) => {
    // form 기본 기능 막기
    event.preventDefault();
    // 가져온 onSubmit 함수 실행
    if (onSubmit) {
      await onSubmit();
    }
  };
  return <form onSubmit={onSubmitDefault}>{children}</form>;
};

export default Form;
