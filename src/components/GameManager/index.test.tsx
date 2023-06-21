import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import GameManager from "./index";

describe("GameManager component", () => {
  test("adds a new game when Add Game button is clicked with valid input", () => {
    const mockSetGames = jest.fn();
    render(<GameManager games={[]} setGames={mockSetGames} />);

    fireEvent.change(screen.getByLabelText("Home Team Name"), {
      target: { value: "Home Team" },
    });
    fireEvent.change(screen.getByLabelText("Away Team Name"), {
      target: { value: "Away Team" },
    });

    fireEvent.click(screen.getByText("Add Game"));
    expect(mockSetGames).toHaveBeenCalledWith([
      expect.objectContaining({
        homeTeamName: "Home Team",
        awayTeamName: "Away Team",
      }),
    ]);
  });

  test("does not add a new game when Add Game button is clicked with incomplete input", () => {
    const mockSetGames = jest.fn();

    render(<GameManager games={[]} setGames={mockSetGames} />);
    fireEvent.click(screen.getByText("Add Game"));
    expect(mockSetGames).not.toHaveBeenCalled();

    expect(window.alert).toHaveBeenCalledWith("Fill in the form first!");
  });
});
