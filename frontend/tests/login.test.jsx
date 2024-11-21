import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../src/pages/LoginPage";
import axios from "axios";

jest.mock("axios");

describe("LoginPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("renders the login form", () => {
    render(<LoginPage setIsAuthenticated={jest.fn()} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument(); // Use role-based query
  });

  test("handles successful login", async () => {
    axios.post.mockResolvedValueOnce({
      data: { token: "mock-token" },
    });

    const mockSetIsAuthenticated = jest.fn();
    render(<LoginPage setIsAuthenticated={mockSetIsAuthenticated} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i })); // Target button using role

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/api/auth/login",
        { email: "john@example.com", password: "password123" }
      );
      expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
    });
  });

  test("handles login error", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    render(<LoginPage setIsAuthenticated={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i })); // Target button using role

    const errorMessage = await waitFor(() =>
      screen.getByText(/invalid credentials/i)
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
