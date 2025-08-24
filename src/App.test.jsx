import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import App from "./App";

describe("App", () => {
  let container;

  beforeEach(() => {
    // Clean up any existing DOM elements before each test
    cleanup();
  });

  afterEach(() => {
    // Clean up after each test
    cleanup();
  });

  it("renders todo app title", () => {
    const { container: testContainer } = render(<App />);
    container = testContainer;
    expect(screen.getByText(/Vite Todo App/i)).toBeInTheDocument();
  });

  it("renders initial todos", () => {
    const { container: testContainer } = render(<App />);
    container = testContainer;
    expect(screen.getAllByText(/Setup Vite \+ React/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Create CI\/CD Pipeline/i)).toBeInTheDocument();
  });

  it("can add new todo", () => {
    const { container: testContainer } = render(<App />);
    container = testContainer;
    const input = screen.getAllByPlaceholderText(/Add a new todo/i)[0];
    const button = screen.getAllByText(/Add Todo/i)[0];

    fireEvent.change(input, { target: { value: "New Vite Todo" } });
    fireEvent.click(button);

    expect(screen.getByText("New Vite Todo")).toBeInTheDocument();
  });

  it("can toggle todo completion", () => {
    const { container: testContainer } = render(<App />);
    container = testContainer;
    const incompleteToggle = screen.getAllByLabelText(
      /Mark Deploy to Production as complete/i
    )[0];

    fireEvent.click(incompleteToggle);
    expect(screen.getAllByText("✅")).toHaveLength(3);
  });

  it("can delete todo", () => {
    const { container: testContainer } = render(<App />);
    container = testContainer;
    const deleteButton = screen.getAllByLabelText(/Delete Deploy to Production/i)[0];

    fireEvent.click(deleteButton);
    expect(screen.queryByText(/Deploy to Production/i)).not.toBeInTheDocument();
  });

  it("shows empty state when no todos", () => {
    const { container: testContainer } = render(<App />);
    container = testContainer;

    // Delete all todos
    const deleteButtons = screen.getAllByText("🗑️");
    deleteButtons.forEach((button) => fireEvent.click(button));

    expect(screen.getAllByText(/All done!/i)[0]).toBeInTheDocument();
  });
});
