export const ID_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{5,10}$/;
export const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{5,11}$/;
export const NAME_REGEX = /^[가-힣a-zA-Z0-9]{3,8}$/;
export const EMAIL_REGEX =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

// id regex
export const ID_FORMAT_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]*$/;
export const ID_LENGTH_REGEX = /^[a-zA-Z0-9]{5,10}$/;

// pw regex
export const PW_ALPHABET_REGEX = /^(?=.*[a-z])(?=.*[A-Z])/;
export const PW_NUMBER_REGEX = /[0-9]/;
export const PW_SPECIAL_REGEX = /[$@!%*#?&]/;
export const PW_LENGTH_REGEX = /^[A-Za-z\d$@!%*#?&]{5,11}$/;

// name regex
export const NAME_FORMAT_REGEX = /^[가-힣a-zA-Z0-9]*$/;
export const NAME_LENGTH_REGEX = /^[가-힣a-zA-Z0-9]{3,8}$/;
