import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ViewSelectionFilter from "../viewSelection";
import { FilterType } from "../../enum/viewSelectionFilterEnum";

const filters = [
  { label: "A-Z", value: FilterType.ALPHABETICAL_ORDER },
  { label: "Relevante", value: FilterType.RELEVANT },
];

describe("ViewSelectionFilter", () => {
  it("renders all filters", () => {
    render(
      <ViewSelectionFilter
        filters={filters}
        selectedFilter="recent"
        onChange={() => {}}
      />
    );

    filters.forEach((filter) => {
      expect(screen.getByText(filter.label)).toBeInTheDocument();
    });
  });
});
