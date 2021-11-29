import { render, fireEvent } from "@testing-library/react";
import { History } from "history";
import React from "react";
import { Routes } from "../../../routes/types";
import { TestComponentBuilder } from "../../../test/TestComponentBuilder";
import { SignInPage } from "../signIn.page";
import {
  checkCredentials,
  getPasswordError,
  getEmailError,
} from "../signInHelper";
import { EnhancedStore } from "@reduxjs/toolkit";

jest.mock("../signInHelper");

describe("Given sign in page component", () => {
  let TestComponent: React.FC;
  let history: History;
  let store: EnhancedStore;

  const fakeCheckCredentials = checkCredentials as jest.Mock<any, any>;
  const fakeGetPasswordError = getPasswordError as jest.Mock<any, any>;
  const fakeGetEmailError = getEmailError as jest.Mock<any, any>;
  let fakeDispatch: ReturnType<typeof jest.spyOn>;

  beforeEach(() => {
    jest.resetAllMocks();

    ({ TestComponent, history, store } =
      TestComponentBuilder.fromComponent(SignInPage).build());

    fakeDispatch = jest.spyOn(store, "dispatch");
  });

  describe("When the component has just been rendered", () => {
    it('Should show "Email field is required"', () => {
      const { getByText } = render(<TestComponent />);
      const emailError = getByText("Email field is required");
      expect(emailError).toBeDefined();
    });

    it('Should show "Password field is required"', () => {
      const { getByText } = render(<TestComponent />);
      const passwordError = getByText("Password field is required");
      expect(passwordError).toBeDefined();
    });

    it("Should have the submit button disabled", () => {
      const { getByRole } = render(<TestComponent />);
      const submitButton = getByRole("button");
      fireEvent.click(submitButton);
      expect(fakeCheckCredentials).toBeCalledTimes(0);
    });

    it("Should not have the form error", () => {
      const { queryAllByRole } = render(<TestComponent />);
      const errors = queryAllByRole("note");
      expect(errors).toHaveLength(2);
    });
  });

  describe("When write something in the email filed", () => {
    it("Should call a function to validate the user input", () => {
      const emailInputValue = "randomvalue";
      const { getByPlaceholderText } = render(<TestComponent />);
      const emailInput = getByPlaceholderText("Email");
      fireEvent.change(emailInput, { target: { value: emailInputValue } });
      expect(fakeGetEmailError).toBeCalledTimes(1);
      expect(fakeGetEmailError).toBeCalledWith(emailInputValue);
    });

    it("Should set the value to the input", () => {
      const emailInputValue = "randomvalue";
      const { getByPlaceholderText } = render(<TestComponent />);
      const emailInput = getByPlaceholderText("Email") as HTMLInputElement;
      expect(emailInput.value).toBe("");
      fireEvent.change(emailInput, { target: { value: emailInputValue } });
      expect(emailInput.value).toBe(emailInputValue);
    });

    describe("When the email validation function return a string", () => {
      it("Should set that string as email error", () => {
        const emailErrorString = "Some random email error";
        fakeGetEmailError.mockReturnValue(emailErrorString);
        const { getByPlaceholderText, getByText } = render(<TestComponent />);
        const emailInput = getByPlaceholderText("Email") as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: "email value" } });
        const emailError = getByText(emailErrorString);
        expect(emailError).toBeDefined();
      });
    });

    describe("When the email validation function return null", () => {
      it("Should remove the error string", () => {
        const emailError = null;
        fakeGetEmailError.mockReturnValue(emailError);
        const { getByPlaceholderText, queryAllByRole } = render(
          <TestComponent />
        );
        const emailInput = getByPlaceholderText("Email") as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: "email value" } });
        const errors = queryAllByRole("note");
        expect(errors).toHaveLength(1);
      });
    });
  });

  describe("When write something in the password filed", () => {
    it("Should call a function to validate the user input", () => {
      const passwordInputValue = "randomvalue";
      const { getByPlaceholderText } = render(<TestComponent />);
      const passwordInput = getByPlaceholderText("Password");
      fireEvent.change(passwordInput, {
        target: { value: passwordInputValue },
      });
      expect(fakeGetPasswordError).toBeCalledTimes(1);
      expect(fakeGetPasswordError).toBeCalledWith(passwordInputValue);
    });

    it("Should set the value to the input", () => {
      const passwordInputValue = "randomvalue";
      const { getByPlaceholderText } = render(<TestComponent />);
      const passwordInput = getByPlaceholderText(
        "Password"
      ) as HTMLInputElement;
      expect(passwordInput.value).toBe("");
      fireEvent.change(passwordInput, {
        target: { value: passwordInputValue },
      });
      expect(passwordInput.value).toBe(passwordInputValue);
    });

    describe("When the password validation function return a string", () => {
      it("Should set that string as password error", () => {
        const passwordErrorString = "Some random password error";
        fakeGetPasswordError.mockReturnValue(passwordErrorString);
        const { getByPlaceholderText, getByText } = render(<TestComponent />);
        const passwordInput = getByPlaceholderText(
          "Password"
        ) as HTMLInputElement;
        fireEvent.change(passwordInput, {
          target: { value: "password value" },
        });
        const passwordError = getByText(passwordErrorString);
        expect(passwordError).toBeDefined();
      });
    });

    describe("When the password validation function return null", () => {
      it("Should remove the password error string", () => {
        const passwordError = null;
        fakeGetPasswordError.mockReturnValue(passwordError);
        const { getByPlaceholderText, queryAllByRole } = render(
          <TestComponent />
        );
        const passwordInput = getByPlaceholderText(
          "Password"
        ) as HTMLInputElement;
        fireEvent.change(passwordInput, {
          target: { value: "password value" },
        });
        const errors = queryAllByRole("note");
        expect(errors).toHaveLength(1);
      });
    });
  });

  describe("When password and email fields are valids", () => {
    it("Should enable the submit button", () => {
      const passwordInputValue = "randomvalue";
      const emailInputValue = "randomemail@synesthesia.it";
      fakeGetEmailError.mockReturnValue(null);
      fakeGetPasswordError.mockReturnValue(null);

      const { getByPlaceholderText, getByRole } = render(<TestComponent />);

      const passwordInput = getByPlaceholderText("Password");
      const emailInput = getByPlaceholderText("Email");
      const submitButton = getByRole("button");

      fireEvent.change(passwordInput, {
        target: { value: passwordInputValue },
      });
      fireEvent.change(emailInput, {
        target: { value: emailInputValue },
      });

      expect(submitButton).toBeEnabled();
    });

    describe("When click on the submit button", () => {
      it("Should call credential check function", () => {
        const passwordInputValue = "randomvalue";
        const emailInputValue = "randomemail@synesthesia.it";
        fakeGetEmailError.mockReturnValue(null);
        fakeGetPasswordError.mockReturnValue(null);

        const { getByPlaceholderText, getByRole } = render(<TestComponent />);

        const passwordInput = getByPlaceholderText("Password");
        const emailInput = getByPlaceholderText("Email");
        const submitButton = getByRole("button");

        fireEvent.change(passwordInput, {
          target: { value: passwordInputValue },
        });
        fireEvent.change(emailInput, {
          target: { value: emailInputValue },
        });
        fireEvent.click(submitButton);

        expect(fakeCheckCredentials).toBeCalledTimes(1);
        expect(fakeCheckCredentials).toBeCalledWith(
          emailInputValue,
          passwordInputValue
        );
      });
    });

    describe("When the check credentials function return false", () => {
      it("Should call credential check function", () => {
        const passwordInputValue = "randomvalue";
        const emailInputValue = "randomemail@synesthesia.it";
        fakeGetEmailError.mockReturnValue(null);
        fakeGetPasswordError.mockReturnValue(null);
        fakeCheckCredentials.mockReturnValue(false);

        const { getByPlaceholderText, getByRole, getByText } = render(
          <TestComponent />
        );

        const passwordInput = getByPlaceholderText("Password");
        const emailInput = getByPlaceholderText("Email");
        const submitButton = getByRole("button");

        fireEvent.change(passwordInput, {
          target: { value: passwordInputValue },
        });
        fireEvent.change(emailInput, {
          target: { value: emailInputValue },
        });
        fireEvent.click(submitButton);

        const formError = getByText("Invalid credentials, retry.");
        expect(formError).toBeDefined();
      });
    });

    describe("When the check credentials function return true", () => {
      it("Should dispatch a redux action to set the access token", () => {
        const passwordInputValue = "randomvalue";
        const emailInputValue = "randomemail@synesthesia.it";
        fakeGetEmailError.mockReturnValue(null);
        fakeGetPasswordError.mockReturnValue(null);
        fakeCheckCredentials.mockReturnValue(true);

        const { getByPlaceholderText, getByRole } = render(<TestComponent />);

        const passwordInput = getByPlaceholderText("Password");
        const emailInput = getByPlaceholderText("Email");
        const submitButton = getByRole("button");

        fireEvent.change(passwordInput, {
          target: { value: passwordInputValue },
        });
        fireEvent.change(emailInput, {
          target: { value: emailInputValue },
        });
        fireEvent.click(submitButton);

        expect(fakeDispatch).toBeCalledTimes(1);
      });

      it("Should navigate to home", () => {
        const passwordInputValue = "randomvalue";
        const emailInputValue = "randomemail@synesthesia.it";
        fakeGetEmailError.mockReturnValue(null);
        fakeGetPasswordError.mockReturnValue(null);
        fakeCheckCredentials.mockReturnValue(true);

        const { getByPlaceholderText, getByRole } = render(<TestComponent />);

        const passwordInput = getByPlaceholderText("Password");
        const emailInput = getByPlaceholderText("Email");
        const submitButton = getByRole("button");

        fireEvent.change(passwordInput, {
          target: { value: passwordInputValue },
        });
        fireEvent.change(emailInput, {
          target: { value: emailInputValue },
        });
        fireEvent.click(submitButton);

        expect(history.location.pathname).toBe(Routes.Home);
      });
    });
  });
});
