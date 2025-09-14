import { render, screen } from "@testing-library/vue";
import JobListing from "@/components/JobResults/JobListing.vue";
import { RouterLinkStub } from "@vue/test-utils";

describe("JobListing.vue", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "Yokohama",
    ...jobProps,
  });
  const renderJobListing = (jJobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          ...jJobProps,
        },
      },
    });
  };
  it("renders Job title", () => {
    const jobProps = createJobProps({ title: "Vue frontend dev" });
    renderJobListing(jobProps);
    expect(screen.getByText("Vue frontend dev")).toBeInTheDocument();
  });

  it("renders Job Organisation", () => {
    const jobProps = createJobProps({ organization: "2k Studios" });
    renderJobListing(jobProps);
    expect(screen.getByText("2k Studios")).toBeInTheDocument();
  });
});
