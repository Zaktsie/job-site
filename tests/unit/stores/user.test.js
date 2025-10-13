import { createPinia, setActivePinia } from "pinia";

import { useUserStore } from "../../../src/stores/user.js";

describe("User State", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("should return the user state", async () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });
});

describe("User Actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("LoginUser", () => {
    it("when the user logs in", async () => {
      const store = useUserStore();
      store.loginUser();
      expect(store.isLoggedIn).toBe(true);
    });
  });
});
