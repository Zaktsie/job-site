import { render, screen } from "@testing-library/vue";

import TheHeadline from "@/components/TheHeadline.vue";
import { nextTick } from "vue";
import { afterEach } from "vitest";

describe("TheHeadline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("should  display introductory action verb ", () => {
    render(TheHeadline);
    const actionheading = screen.getByRole("heading", {
      name: /build for every one/i,
    });
    expect(actionheading).toBeInTheDocument();
  });

  it("should change action  verb at a constant interval ", () => {
    const mock = vi.fn();
    vi.stubGlobal("setInterval", mock);
    render(TheHeadline);
    expect(mock).toHaveBeenCalled();
  });

  it("should swap action verb after interval", async () => {
    render(TheHeadline);
    vi.advanceTimersToNextTimer();
    await nextTick();
    const actionVerb = screen.getByRole("heading", {
      name: /create for every one/i,
    });
    expect(actionVerb).toBeInTheDocument();
  });

  it("should remove interval when component disappears", () => {
    const clearInterval = vi.fn();
    vi.stubGlobal("clearInterval", clearInterval);

    const { unmount } = render(TheHeadline);
    unmount();
    expect(clearInterval).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
