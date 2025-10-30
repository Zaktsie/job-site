import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";
import axios from "axios";

import getJobs from "../../../src/api/getJobs.js";

describe("getJobs", () => {
  beforeEach(() => {
    axios.get = jest.fn().mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Java developer",
        },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("fetch available jobs that candidates can apply to", async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith("http://testapi.com/jobs");
  });

  it("extracts jobs from the response", async () => {
    const jobs = await getJobs();
    expect(jobs).toEqual([{ id: 1, title: "Java developer" }]);
  });
});
