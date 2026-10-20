import axios from "axios";

import getDegrees from "@/api/getDegrees";

vi.mock("axios");

describe("getDegrees", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          degree: "Master's",
        },
      ],
    });
  });

  it("fetches degrees that candidates can apply to", async () => {
    await getDegrees();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/degrees");
  });

  it("extracts degrees from response", async () => {
    const degrees = await getDegrees();
    expect(degrees).toEqual([{ id: 1, degree: "Master's" }]);
  });
});
