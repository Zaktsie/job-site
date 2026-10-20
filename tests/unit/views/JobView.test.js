import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import JobView from "@/views/JobView.vue";
import { useJobsStore } from "@/stores/jobs";

describe("JobView", () => {
  it("displays full job details when matching job exists in store with string or numeric id", async () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    jobsStore.jobs = [
      {
        id: "1",
        title: "Angular Developer",
        organization: "Vue and Me",
        degree: "Master's",
        jobType: "Intern",
        locations: ["Lisbon"],
        minimumQualifications: ["Engineer enterprise convergence"],
        preferredQualifications: ["Syndicate innovative markets"],
        description: ["Build awesome web applications."],
        dateAdded: "2021-07-04",
      },
    ];

    render(JobView, {
      global: {
        plugins: [pinia],
        mocks: {
          $route: {
            params: { id: "1" },
          },
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(await screen.findByText("Angular Developer")).toBeInTheDocument();
    expect(screen.getByText("Vue and Me")).toBeInTheDocument();
    expect(screen.getByText("Lisbon")).toBeInTheDocument();
    expect(
      screen.getByText("Engineer enterprise convergence")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Syndicate innovative markets")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Build awesome web applications.")
    ).toBeInTheDocument();
  });
});
