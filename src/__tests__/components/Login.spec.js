import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import Login from "../../components/Login";
import configureStore from "../../configureStore";

const mocks = {
  username: "username@test.com",
  password: "test12345",
  termsAccepted: true
};

// Provide initialState for the entire store that the ui is rendered with
const renderWithRedux = (
  ui,
  { initialState, store = configureStore(initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
};

describe("Login component behavior", () => {
  let button, termsCheckBox, usernameTextField, passwordTextField;

  beforeEach(() => {
    // https://github.com/jsdom/jsdom/issues/1724
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const { container, getByTestId, store } = renderWithRedux(<Login />);
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });

    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    button = container.getElementsByTagName("button")[0];
    termsCheckBox = getByTestId("termsCheckbox");
    usernameTextField = getByTestId("usernameTextField");
    passwordTextField = getByTestId("passwordTextField");
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;

    cleanup(); // unmounts React trees that were mounted with render.
  });

  describe("Login UI Tests", () => {
    it("shows empty values for username, password and terms inputs", () => {
      expect(usernameTextField).toBeInTheDocument();
      expect(passwordTextField).toBeInTheDocument();
      expect(termsCheckBox).toBeInTheDocument();

      expect(termsCheckBox.checked).toBe(false);
      expect(usernameTextField.value).toBe("");
      expect(usernameTextField.value).toBe("");
    });

    it("focuses the username input", () => {
      expect(usernameTextField).toBe(document.activeElement);
    });

    it("renders a login button", () => {
      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe("Sign In");
    });
  });

  describe("Login Behavior Tests", () => {
    it("handles submit button visibility and dispathes @USER/USER_LOGIN action", () => {
      expect(button).toBeDisabled();

      fireEvent.change(usernameTextField, {
        target: { value: mocks.username }
      });

      fireEvent.change(passwordTextField, {
        target: { value: mocks.password }
      });
      fireEvent.click(termsCheckBox);
      expect(termsCheckBox.checked).toEqual(true);
      expect(button).not.toBeDisabled();

      fireEvent.click(button);
    });
  });
});
