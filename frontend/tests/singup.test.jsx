import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import SignupPage from "../src/pages/SignupPage";

jest.mock("axios");

describe("SignupPage Component", () => {
  let setIsAuthenticatedMock;

  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: jest.fn((key) => store[key] || null),
      setItem: jest.fn((key, value) => {
        store[key] = value.toString();
      }),
      clear: jest.fn(() => {
        store = {};
      }),
      removeItem: jest.fn((key) => {
        delete store[key];
      }),
    };
  })();

  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
  });

  beforeEach(() => {
    setIsAuthenticatedMock = jest.fn();
    jest.clearAllMocks();
  });

  it("renders the signup form", () => {
    render(
      <Router>
        <SignupPage setIsAuthenticated={setIsAuthenticatedMock} />
      </Router>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("updates input values when typed into", () => {
    render(
      <Router>
        <SignupPage setIsAuthenticated={setIsAuthenticatedMock} />
      </Router>
    );

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("disables the signup button if inputs are empty", () => {
    render(
      <Router>
        <SignupPage setIsAuthenticated={setIsAuthenticatedMock} />
      </Router>
    );

    const signupButton = screen.getByRole("button", { name: /sign up/i });
    expect(signupButton).toBeDisabled();
  });

  it("enables the signup button when all inputs are filled", () => {
    render(
      <Router>
        <SignupPage setIsAuthenticated={setIsAuthenticatedMock} />
      </Router>
    );

    const signupButton = screen.getByRole("button", { name: /sign up/i });
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(signupButton).not.toBeDisabled();
  });

  it("handles signup errors gracefully", async () => {
    render(
      <Router>
        <SignupPage setIsAuthenticated={setIsAuthenticatedMock} />
      </Router>
    );

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signupButton = screen.getByRole("button", { name: /sign up/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    axios.post.mockRejectedValue({
      response: { data: { message: "Email already exists" } },
    });

    await act(async () => {
      fireEvent.click(signupButton);
    });

    const errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent(/email already exists/i);
  });

  it("calls setIsAuthenticated and stores token on successful signup", async () => {
    render(
      <Router>
        <SignupPage setIsAuthenticated={setIsAuthenticatedMock} />
      </Router>
    );

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signupButton = screen.getByRole("button", { name: /sign up/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    axios.post.mockResolvedValue({ data: { token: "mockToken" } });

    await act(async () => {
      fireEvent.click(signupButton);
    });

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.VITE_API_URL || "http://localhost:5000"}/api/auth/signup`,
      { name: "John Doe", email: "john@example.com", password: "password123" }
    );

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "mockToken");
    expect(localStorage.getItem("token")).toBe("mockToken");
    expect(setIsAuthenticatedMock).toHaveBeenCalledWith(true);
  });
});
