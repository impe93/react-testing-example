import {
  checkCredentials,
  getEmailError,
  getPasswordError,
} from "../signInHelper";

describe("Given getEmailError function", () => {
  describe("When email is empty", () => {
    it('Should return the string "Email field is required"', () => {
      const emailErrorResult = getEmailError("");
      expect(emailErrorResult).toBe("Email field is required");
    });
  });

  describe("When email does not respect the correct pattern", () => {
    it('Should return the string "Email field is not valid"', () => {
      const emailErrorResult = getEmailError("ciaociao");
      expect(emailErrorResult).toBe("Email field is not valid");
    });
  });

  describe("When email is not empty and respect the pattern", () => {
    it("Should return null", () => {
      const emailErrorResult = getEmailError("random@gmail.com");
      expect(emailErrorResult).toBeNull();
    });
  });
});

describe("Given getPasswordError function", () => {
  const passwordPatternError =
    "The password need to have, at least, a letter and a digit";

  describe("When the password is empty", () => {
    it('Should return the string "Password field is required"', () => {
      const passwordErrorResult = getPasswordError("");
      expect(passwordErrorResult).toBe("Password field is required");
    });
  });

  describe("When password does not have a letter", () => {
    it('Should return the string "The password need to have, at least, a letter and a digit"', () => {
      const passwordErrorResult = getPasswordError("1234!");
      expect(passwordErrorResult).toBe(passwordPatternError);
    });
  });

  describe("When password does not have a digit", () => {
    it('Should return the string "The password need to have, at least, a letter and a digit"', () => {
      const passwordErrorResult = getPasswordError("asdfg!");
      expect(passwordErrorResult).toBe(passwordPatternError);
    });
  });

  describe("When password is not empty and respect the pattern", () => {
    it("Should return null", () => {
      const passwordErrorResult = getPasswordError("asdfg1234!");
      expect(passwordErrorResult).toBeNull();
    });
  });
});

describe("Given verifyCredentials function", () => {
  describe('When the password is not "synesthesia123"', () => {
    it("Should return false", () => {
      const areCredentialsCorrect = checkCredentials(
        "syn@synesthesia.it",
        "randomValidPassword123"
      );

      expect(areCredentialsCorrect).toBeFalsy();
    });
  });

  describe('When the email is not "syn@synesthesia.it"', () => {
    it("Should return false", () => {
      const areCredentialsCorrect = checkCredentials(
        "randomvalidemail@validemail.it",
        "synesthesia123"
      );

      expect(areCredentialsCorrect).toBeFalsy();
    });
  });

  describe('When the email is "syn@synesthesia.it" asn password is "synesthesia123"', () => {
    it("Should return true", () => {
      const areCredentialsCorrect = checkCredentials(
        "syn@synesthesia.it",
        "synesthesia123"
      );

      expect(areCredentialsCorrect).toBeTruthy();
    });
  });
});
