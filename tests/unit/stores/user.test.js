import { createPinia, setActivePinia } from "pinia";

import { useUserStore } from "@/stores/user";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("keeps track of if user is logged in", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it("stores organizations that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedOrganizations).toEqual([]);
  });

  it("stores job types that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedJobTypes).toEqual([]);
  });

  it("stores degrees that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedDegrees).toEqual([]);
  });

  it("stores user's search term for skills and qualifications", () => {
    const store = useUserStore();
    expect(store.skillsSearchTerm).toBe("");
  });

  it("stores user profile information", () => {
    const store = useUserStore();
    expect(store.userProfile.name).toBe("Zak Tsienyane");
    expect(store.userProfile.email).toBe("zak@zakcareers.com");
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("loginUser and logoutUser", () => {
    it("logs the user in and out", () => {
      const store = useUserStore();
      store.loginUser();
      expect(store.isLoggedIn).toBe(true);

      store.logoutUser();
      expect(store.isLoggedIn).toBe(false);
    });

    it("updates user profile when credentials are provided on login", () => {
      const store = useUserStore();
      store.loginUser({ name: "Jane Doe", email: "jane@example.com" });
      expect(store.isLoggedIn).toBe(true);
      expect(store.userProfile.name).toBe("Jane Doe");
      expect(store.userProfile.email).toBe("jane@example.com");
    });
  });

  describe("UPDATE_USER_PROFILE", () => {
    it("updates user profile fields", () => {
      const store = useUserStore();
      store.UPDATE_USER_PROFILE({
        name: "Updated Name",
        headline: "Principal Engineer",
      });
      expect(store.userProfile.name).toBe("Updated Name");
      expect(store.userProfile.headline).toBe("Principal Engineer");
    });
  });

  describe("ADD_USER_SKILL and REMOVE_USER_SKILL", () => {
    it("adds and removes skills from user profile", () => {
      const store = useUserStore();
      store.ADD_USER_SKILL("TypeScript");
      expect(store.userProfile.skills).toContain("TypeScript");

      store.REMOVE_USER_SKILL("TypeScript");
      expect(store.userProfile.skills).not.toContain("TypeScript");
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations the user has chosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANIZATIONS(["Org1", "Org2"]);
      expect(store.selectedOrganizations).toEqual(["Org1", "Org2"]);
    });
  });

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates job types the user has chosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_JOB_TYPES(["Full-time", "Part-time"]);
      expect(store.selectedJobTypes).toEqual(["Full-time", "Part-time"]);
    });
  });

  describe("ADD_SELECTED_DEGREES", () => {
    it("updates degrees the user has chosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_DEGREES(["Bachelor's", "Master's"]);
      expect(store.selectedDegrees).toEqual(["Bachelor's", "Master's"]);
    });
  });

  describe("UPDATE_SKILLS_SEARCH_TERM", () => {
    it("receives search term for skills the user has entered", () => {
      const store = useUserStore();
      store.skillsSearchTerm = "";
      store.UPDATE_SKILLS_SEARCH_TERM("Vue");
      expect(store.skillsSearchTerm).toBe("Vue");
    });
  });

  describe("CLEAR_USER_JOB_FILTER_SELECTIONS", () => {
    it("removes all job filters that user has chosen", () => {
      const store = useUserStore();
      store.selectedDegrees = ["Associate"];
      store.selectedJobTypes = ["Random"];
      store.selectedOrganizations = ["Random"];
      store.skillsSearchTerm = "Vue";

      store.CLEAR_USER_JOB_FILTER_SELECTIONS();

      expect(store.selectedDegrees).toEqual([]);
      expect(store.selectedJobTypes).toEqual([]);
      expect(store.selectedOrganizations).toEqual([]);
      expect(store.skillsSearchTerm).toBe("");
    });
  });
});
