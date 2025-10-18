import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useJobsStore } from "../../../src/stores/jobs.js";

vi.mock("axios");
describe("Jobs state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should store job listings", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("Jobs actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS"),
    () => {
      it("makes API requests and stores received jobs", async () => {
        axios.get.mockResolvedValue({ data: ["job 1", "job 2"] });
        const store = useJobsStore();
        await store.FETCH_JOBS();
        expect(store.jobs).toEqual(["job 1", "job 2"]);
      });
    };
});
