import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders todo app title", () => {
    render(<App />);
    expect(screen.getByText(/Vite Todo App/i)).toBeInTheDocument();
  });

  it("renders initial todos", () => {
    render(<App />);
    expect(screen.getByText(/Setup Vite \+ React/i)).toBeInTheDocument();
    expect(screen.getByText(/Create CI\/CD Pipeline/i)).toBeInTheDocument();
  });

  it("can add new todo", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Add a new todo/i);
    const button = screen.getByText(/Add Todo/i);

    fireEvent.change(input, { target: { value: "New Vite Todo" } });
    fireEvent.click(button);

    expect(screen.getByText("New Vite Todo")).toBeInTheDocument();
  });

  it("can toggle todo completion", () => {
    render(<App />);
    const incompleteToggle = screen.getByLabelText(
      /Mark Deploy to Production as complete/i
    );

    fireEvent.click(incompleteToggle);
    expect(screen.getAllByText("✅")).toHaveLength(3);
  });

  it("can delete todo", () => {
    render(<App />);
    const deleteButton = screen.getByLabelText(/Delete Deploy to Production/i);

    fireEvent.click(deleteButton);
    expect(screen.queryByText(/Deploy to Production/i)).not.toBeInTheDocument();
  });

  it("shows empty state when no todos", () => {
    render(<App />);

    // Delete all todos
    const deleteButtons = screen.getAllByText("🗑️");
    deleteButtons.forEach((button) => fireEvent.click(button));

    expect(screen.getByText(/All done!/i)).toBeInTheDocument();
  });
});
