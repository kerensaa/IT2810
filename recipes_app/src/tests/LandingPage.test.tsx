import LandingPage from "../pages/LandingPage";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { mockUsers } from "../mockData/mockData";


vi.mock("react-router-dom", () => ({
Link: ({ to, children, ...props }: any) => (
    <a href={to} {...props}>
    {children}
    </a>
),
}));

describe("Renders LandingPage correctly", async () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });
  
    it("Should render 'Low-Fat Berry Blue Frozen Dessert' correctly", async () => {
      render(<LandingPage />);
      const recipeTitle = screen.getAllByText(/Low-Fat Berry Blue Frozen Dessert/);
      expect(recipeTitle).not.toBeNull();
    });
  
    it("Should navigate to the correct recipe page when recipe-element is clicked", async () => {
        render(<LandingPage />);
    
        // Find the RecipeElement corresponding to 'Low-Fat Berry Blue Frozen Dessert'
        const recipeTitle = screen.getAllByText('Low-Fat Berry Blue Frozen Dessert')[0];
        
        // Simulate a click on the RecipeElement
        fireEvent.click(recipeTitle);
    
        // Verify the updated href attribute of the Link that wraps the RecipeElement
        const link = screen.getAllByRole("link", { name: /Low-Fat Berry Blue Frozen Dessert/i  })[0];
        expect(link?.getAttribute("href")).toBe("/1");
      });
  });

describe("Snapshot testing of LandingPage", async () => {
  it("should perform snapshot test LandingPage", async () => {
    const landingPage = render(<LandingPage />);
    expect(landingPage).toMatchSnapshot();
  });
});