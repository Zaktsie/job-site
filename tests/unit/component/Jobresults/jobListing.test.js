import { render, screen } from "@testing-library/vue";
import JobListing from "@/components/JobResults/JobListing.vue";
import { RouterLinkStub } from "@vue/test-utils";

describe("JobListing.vue", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "Yokohama",
    locations: ["Pretoria", "Remote"],
    minimumQualifications: ["Coding", "Creating Api's"],
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

  it('renders Job Qualifications"', () => {
    const jobProps = createJobProps({
      minimumQualifications: ["Coding", "Writing unit tests"],
    });
    renderJobListing(jobProps);
    expect(screen.getByText("Coding")).toBeInTheDocument();
    expect(screen.getByText("Writing unit tests")).toBeInTheDocument();
  });

  it("renders Job locations", () => {
    const jobProps = createJobProps({
      minimumQualifications: ["Cape Town", "Gauteng"],
    });
    renderJobListing(jobProps);
    expect(screen.getByText("Cape Town")).toBeInTheDocument();
    expect(screen.getByText("Gauteng")).toBeInTheDocument();
  });

  it("renders Job Organisation", () => {
    const jobProps = createJobProps({ organization: "2k Studios" });
    renderJobListing(jobProps);
    expect(screen.getByText("2k Studios")).toBeInTheDocument();
  });
});
