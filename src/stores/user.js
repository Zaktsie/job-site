import { defineStore } from "pinia";

export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES";
export const ADD_SELECTED_DEGREES = "ADD_SELECTED_DEGREES";
export const ADD_SELECTED_LOCATIONS = "ADD_SELECTED_LOCATIONS";
export const UPDATE_SKILLS_SEARCH_TERM = "UPDATE_SKILLS_SEARCH_TERM";
export const UPDATE_LOCATION_SEARCH_TERM = "UPDATE_LOCATION_SEARCH_TERM";
export const CLEAR_USER_JOB_FILTER_SELECTIONS =
  "CLEAR_USER_JOB_FILTER_SELECTIONS";
export const TOGGLE_SAVED_JOB = "TOGGLE_SAVED_JOB";
export const APPLY_TO_JOB = "APPLY_TO_JOB";
export const WITHDRAW_APPLICATION = "WITHDRAW_APPLICATION";
export const SET_ONLY_SAVED_JOBS = "SET_ONLY_SAVED_JOBS";
export const UPDATE_SORT_BY = "UPDATE_SORT_BY";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const ADD_USER_SKILL = "ADD_USER_SKILL";
export const REMOVE_USER_SKILL = "REMOVE_USER_SKILL";
export const ADD_USER_EXPERIENCE = "ADD_USER_EXPERIENCE";
export const REMOVE_USER_EXPERIENCE = "REMOVE_USER_EXPERIENCE";
export const RESET_ACCOUNT = "RESET_ACCOUNT";

const defaultUserProfile = () => ({
  name: "Zak Tsienyane",
  email: "zak@zakcareers.com",
  headline: "Software Engineer",
  location: "Cape Town",
  phone: "+27 21 555 0192",
  portfolioUrl: "https://github.com/Zaktsie",
  bio: "Passionate engineer building modern web applications with Vue 3, Pinia, and Tailwind CSS.",
  degree: "Master's",
  university: "University of Cape Town",
  skills: ["Vue 3", "JavaScript", "Pinia", "Tailwind CSS"],
  preferredJobTypes: ["Full-time"],
  avatarUrl:
    "https://www.pngitem.com/pimgs/m/487-4876417_link-head-png-toon-link-face-png-transparent.png",
  experience: [
    {
      id: "1",
      role: "Frontend Engineer",
      company: "VueTube",
      period: "2023 - Present",
      summary:
        "Built responsive web interfaces and state management architecture.",
    },
  ],
  notifications: {
    jobAlerts: true,
    applicationUpdates: true,
    newsletter: false,
  },
});

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    userProfile: defaultUserProfile(),
    selectedOrganizations: [],
    selectedJobTypes: [],
    selectedDegrees: [],
    selectedLocations: [],
    skillsSearchTerm: "",
    locationSearchTerm: "",
    savedJobIds: [],
    appliedJobIds: [],
    onlySavedJobs: false,
    sortBy: "relevance",
  }),
  getters: {
    isJobSaved: (state) => (jobId) =>
      state.savedJobIds.map(String).includes(String(jobId)),
    isJobApplied: (state) => (jobId) =>
      state.appliedJobIds.map(String).includes(String(jobId)),
    hasActiveFilters: (state) =>
      state.selectedOrganizations.length > 0 ||
      state.selectedJobTypes.length > 0 ||
      state.selectedDegrees.length > 0 ||
      state.selectedLocations.length > 0 ||
      Boolean(state.skillsSearchTerm) ||
      Boolean(state.locationSearchTerm) ||
      state.onlySavedJobs,
  },
  actions: {
    loginUser(credentials) {
      if (
        credentials &&
        typeof credentials === "object" &&
        !("target" in credentials)
      ) {
        this.userProfile = {
          ...this.userProfile,
          ...credentials,
        };
      }
      this.isLoggedIn = true;
    },
    logoutUser() {
      this.isLoggedIn = false;
    },
    [UPDATE_USER_PROFILE](updates) {
      this.userProfile = {
        ...this.userProfile,
        ...updates,
      };
    },
    [ADD_USER_SKILL](skill) {
      const trimmed = (skill || "").trim();
      if (trimmed && !this.userProfile.skills.includes(trimmed)) {
        this.userProfile.skills.push(trimmed);
      }
    },
    [REMOVE_USER_SKILL](skill) {
      this.userProfile.skills = this.userProfile.skills.filter(
        (s) => s !== skill
      );
    },
    [ADD_USER_EXPERIENCE](exp) {
      this.userProfile.experience.unshift({
        id: String(Date.now()),
        ...exp,
      });
    },
    [REMOVE_USER_EXPERIENCE](id) {
      this.userProfile.experience = this.userProfile.experience.filter(
        (item) => String(item.id) !== String(id)
      );
    },
    [ADD_SELECTED_ORGANIZATIONS](organizations) {
      this.selectedOrganizations = organizations;
    },
    [ADD_SELECTED_JOB_TYPES](jobTypes) {
      this.selectedJobTypes = jobTypes;
    },
    [ADD_SELECTED_DEGREES](degrees) {
      this.selectedDegrees = degrees;
    },
    [ADD_SELECTED_LOCATIONS](locations) {
      this.selectedLocations = locations;
    },
    [UPDATE_SKILLS_SEARCH_TERM](term) {
      this.skillsSearchTerm = term;
    },
    [UPDATE_LOCATION_SEARCH_TERM](term) {
      this.locationSearchTerm = term;
    },
    [SET_ONLY_SAVED_JOBS](value) {
      this.onlySavedJobs = Boolean(value);
    },
    [UPDATE_SORT_BY](sortOrder) {
      this.sortBy = sortOrder;
    },
    [TOGGLE_SAVED_JOB](jobId) {
      const normalizedId = String(jobId);
      const index = this.savedJobIds.findIndex(
        (id) => String(id) === normalizedId
      );
      if (index === -1) {
        this.savedJobIds.push(normalizedId);
      } else {
        this.savedJobIds.splice(index, 1);
      }
    },
    [APPLY_TO_JOB](jobId) {
      const normalizedId = String(jobId);
      const exists = this.appliedJobIds.some(
        (id) => String(id) === normalizedId
      );
      if (!exists) {
        this.appliedJobIds.push(normalizedId);
      }
    },
    [WITHDRAW_APPLICATION](jobId) {
      const normalizedId = String(jobId);
      this.appliedJobIds = this.appliedJobIds.filter(
        (id) => String(id) !== normalizedId
      );
    },
    [CLEAR_USER_JOB_FILTER_SELECTIONS]() {
      this.selectedDegrees = [];
      this.selectedJobTypes = [];
      this.selectedOrganizations = [];
      this.selectedLocations = [];
      this.skillsSearchTerm = "";
      this.locationSearchTerm = "";
      this.onlySavedJobs = false;
    },
    [RESET_ACCOUNT]() {
      this.isLoggedIn = false;
      this.userProfile = defaultUserProfile();
      this.savedJobIds = [];
      this.appliedJobIds = [];
      this.CLEAR_USER_JOB_FILTER_SELECTIONS();
    },
  },
});
