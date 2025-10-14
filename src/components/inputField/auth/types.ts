export interface AuthInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  style?: React.CSSProperties;
  fontMode?: "default" | "12" | "xs";
  readOnly?: boolean;
  disabledMode?: boolean;
  rightElement?: React.ReactNode;
  rightButton?: React.ReactNode;
  checkerShowFlag?: boolean;
  checkerMessages?: { checkedFlag: boolean; message: string }[];
  errorFlag?: boolean;
  errorMessage?: string;
  errorMessageCustomFlag?: boolean;
}

export interface AuthSideBtnInputFieldProps extends AuthInputFieldProps {
  sideBtnTitle: string;
  sideBtnOnClick: () => void;
  sideBtnDisabled: boolean;
}
