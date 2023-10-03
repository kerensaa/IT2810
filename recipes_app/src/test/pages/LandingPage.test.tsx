import LandingPage from "../../pages/LandingPage";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
/*
describe("Page testing of LandingPage", async () => {
  it("renders LandingPage", () => {
    render(<LandingPage />);
  });
}); */

describe("Snapshot testing of LandingPage", async () => {
  it("should perform snapshot test LandingPage", async () => {
    const landingPage = render(<LandingPage />);
    expect(landingPage).toMatchSnapshot();
  });
});
