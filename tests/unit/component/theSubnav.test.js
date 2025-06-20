import { render, screen } from "@testing-library/vue";
import TheSubnav from "@/components/TheSubnav.vue";

describe("The   Subnav", () => {
  describe("when user is on the jobs page", () => {
    it("renders jobs  count", () => {
      render(TheSubnav, {
        globals: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        data() {
          return {
            onJobResultsPage: true,
          };
        },
      });
      const jobCnt = screen.getByText("1642");
      expect(jobCnt).toBeInTheDocument();
    });
  });
  describe("when user is not on the jobs page", () => {
    it("does not renders jobs  count", () => {
      render(TheSubnav, {
        globals: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        data() {
          return {
            onJobResultsPage: false,
          };
        },
      });
      const jobCnt = screen.queryByText("1642");
      expect(jobCnt).toBeInTheDocument();
    });
  });
});
