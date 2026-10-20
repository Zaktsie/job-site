import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { useUserStore } from "@/stores/user";

describe("JobFiltersSidebarCheckboxGroup", () => {
  const createProps = (props = {}) => ({
    header: "Some header",
    uniqueValues: new Set(["ValueA", "ValueB"]),
    action: vi.fn(),
    ...props,
  });

  const renderJobFiltersSidebarCheckboxGroup = (props, $router = { push: vi.fn() }) => {
    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useUserStore();

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
        mocks: {
          $router,
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { userStore };
  };

  it("renders unique list of values", async () => {
    const props = createProps({
      header: "Job Types",
      uniqueValues: new Set(["Full-time", "Part-time"]),
    });
    renderJobFiltersSidebarCheckboxGroup(props);

    const button = screen.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const jobTypesListItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      const action = vi.fn();
      const props = createProps({
        header: "Job Types",
        uniqueValues: new Set(["Full-time", "Part-time"]),
        action,
      });
      renderJobFiltersSidebarCheckboxGroup(props);

      const button = screen.getByRole("button", { name: /job types/i });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(action).toHaveBeenCalledWith(["Full-time"]);
    });

    it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
      const push = vi.fn();
      const $router = { push };
      const props = createProps({
        header: "Job Types",
        uniqueValues: new Set(["Full-time"]),
      });
      renderJobFiltersSidebarCheckboxGroup(props, $router);

      const button = screen.getByRole("button", { name: /job types/i });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });

  describe("when user clears job filters", () => {
    it("unchecks any checked checkboxes", async () => {
      const props = createProps({
        header: "Job Types",
        uniqueValues: new Set(["Full-time"]),
      });
      const { userStore } = renderJobFiltersSidebarCheckboxGroup(props);

      const button = screen.getByRole("button", { name: /job types/i });
      await userEvent.click(button);

      const fullTimeCheckboxBeforeAction = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckboxBeforeAction);
      expect(fullTimeCheckboxBeforeAction.checked).toBe(true);

      userStore.CLEAR_USER_JOB_FILTER_SELECTIONS();

      const fullTimeCheckboxAfterAction = await screen.findByRole("checkbox", {
        name: /full-time/i,
      });
      expect(fullTimeCheckboxAfterAction.checked).toBe(false);
    });
  });
});
