import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import MainNav from "@/components/Navigation/MainNav.vue";

describe("MainNav", () => {
  it("displays company name", () => {
    render(MainNav);
    const companyName = screen.getByText("Google Careers");
    expect(companyName).toBeInTheDocument();
  });
  it("displays menu items for navigations", () => {
    render(MainNav);
    const navMenuItems = screen.getAllByRole("listitem");
    const navMenuItemTexts = navMenuItems.map((item) => item.textContent);
    expect(navMenuItemTexts).toEqual([
      "Teams",
      "Jobs",
      "Location",
      "Benefits",
      "Students",
    ]);
  });
});

describe("user login", () => {
  it("displays user profile picture", async () => {
    render(MainNav);

    let profileImage = screen.queryByRole("img", {
      name: /user profile image/i,
    });
    expect(profileImage).not.toBeInTheDocument();

    const loginButton = screen.getByRole("button", {
      name: /sign in/i,
    });
    await userEvent.click(loginButton);

    profileImage = screen.getByRole("img", {
      name: /user profile image/i,
    });
    expect(profileImage).toBeInTheDocument();
  });
});
