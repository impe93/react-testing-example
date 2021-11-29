const emailRegexp =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const passwordRegexp = /^(?=.*[0-9])(?=.*[a-zA-Z]).+$/;

export const getEmailError = (email: string): string | null => {
  if (email.length === 0) {
    return "Email field is required";
  } else if (!emailRegexp.test(email)) {
    return "Email field is not valid";
  } else {
    return null;
  }
};

export const getPasswordError = (password: string): string | null => {
  if (password.length === 0) {
    return "Password field is required";
  } else if (!passwordRegexp.test(password)) {
    return "The password need to have, at least, a letter and a digit";
  } else {
    return null;
  }
};

export const checkCredentials = (email: string, password: string): boolean => {
  const validPassword = "synesthesia123";
  const validEmail = "syn@synesthesia.it";

  return password === validPassword && validEmail === email;
};
