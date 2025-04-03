import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ViewSelectionFilter from "../viewSelection";
import theme from "../../utils/theme";

const filters = [
  { label: "Recent", value: "recent" },
  { label: "Messages", value: "messages" },
  { label: "Groups", value: "groups" },
];

describe("ViewSelectionFilter", () => {
  it("renders all filters", () => {
    render(<ViewSelectionFilter filters={filters} selectedFilter="recent" onChange={() => {}} />);
    
    filters.forEach((filter) => {
      expect(screen.getByText(filter.label)).toBeInTheDocument();
    });
  });

  it("applies selected style to the selected filter", () => {
    render(<ViewSelectionFilter filters={filters} selectedFilter="messages" onChange={() => {}} />);
    
    const selectedButton = screen.getByText("Messages");
    expect(selectedButton).toHaveStyle("background: " + theme.palette.customBackground.secondary);
  });

  it("calls onChange when a filter is clicked", () => {
    const onChangeMock = vi.fn();
    render(<ViewSelectionFilter filters={filters} selectedFilter="recent" onChange={onChangeMock} />);
    
    const messagesButton = screen.getByText("Messages");
    fireEvent.click(messagesButton);
    
    expect(onChangeMock).toHaveBeenCalledWith("messages");
  });
});