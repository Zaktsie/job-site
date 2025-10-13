import { render, screen } from "@testing-library/vue";

import TheSubnav from "../../../../src/components/Navigation/TheSubnav.vue";

describe("TheSubnav", () => {
  const renderTheSubnav = (routeName) => {
    render(TheSubnav, {
      global: {
        mocks: {
          $route: {
            name: routeName,
          },
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  };

  describe("when user is on jobs page", () => {
    it("displays job count", () => {
      const routeName = "JobResults";

      renderTheSubnav(routeName);

      const jobCount = screen.getByText("1642");
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is not on jobs page", () => {
    it("does NOT display job count", () => {
      const routeName = "Home";

      renderTheSubnav(routeName);

      const jobCount = screen.queryByText("16");
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
