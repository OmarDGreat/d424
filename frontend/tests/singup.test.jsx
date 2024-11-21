import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignupPage from "../src/pages/SignupPage"; // Adjust the path if needed
import axios from "axios";

jest.mock("axios");

describe("SignupPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("renders the signup form", () => {
    render(<SignupPage setIsAuthenticated={jest.fn()} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Use role-based query to target the button specifically
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  test("handles successful signup", async () => {
    axios.post.mockResolvedValueOnce({
      data: { token: "mock-token" },
    });

    const mockSetIsAuthenticated = jest.fn();
    render(<SignupPage setIsAuthenticated={mockSetIsAuthenticated} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/api/auth/signup",
        {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        }
      );
      expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
    });
  });

  test("handles signup error", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: "Email already exists" } },
    });

    render(<SignupPage setIsAuthenticated={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    const errorMessage = await waitFor(() =>
      screen.getByText(/email already exists/i)
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
