<template>
  <div class="min-h-screen bg-brand-gray-2 pb-16">
    <HeaderContainer>
      <template #title>
        <h1 class="w-full text-4xl font-normal">
          {{ isLoggedIn ? "Candidate Profile & Account" : "Sign in to Zak's Careers" }}
        </h1>
      </template>

      <template #subtitle>
        <h2 class="my-4 w-full text-base font-light">
          {{
            isLoggedIn
              ? "Manage your personal details, qualifications, saved jobs, and applications."
              : "Sign in or create a career profile to save jobs, track applications, and get personalized role matches."
          }}
        </h2>
      </template>
    </HeaderContainer>

    <div class="mx-auto mt-10 max-w-5xl px-8">
      <!-- LOGGED OUT: SIGN IN / CREATE ACCOUNT -->
      <div
        v-if="!isLoggedIn"
        class="mx-auto max-w-md rounded-xl border border-solid border-brand-gray-1 bg-white p-8 shadow-sm"
      >
        <div class="mb-6 flex border-b border-solid border-brand-gray-1">
          <button
            type="button"
            :class="[
              'flex-1 pb-3 text-center text-sm font-medium',
              authMode === 'login'
                ? 'border-b-2 border-brand-blue-1 text-brand-blue-1'
                : 'text-gray-500 hover:text-gray-800',
            ]"
            @click="authMode = 'login'"
          >
            Sign In
          </button>
          <button
            type="button"
            :class="[
              'flex-1 pb-3 text-center text-sm font-medium',
              authMode === 'register'
                ? 'border-b-2 border-brand-blue-1 text-brand-blue-1'
                : 'text-gray-500 hover:text-gray-800',
            ]"
            @click="authMode = 'register'"
          >
            Create Account
          </button>
        </div>

        <form
          v-if="authMode === 'login'"
          class="space-y-4"
          @submit.prevent="handleSignIn"
        >
          <div>
            <label
              for="login-email"
              class="mb-1 block text-xs font-medium text-gray-700"
              >Email Address</label
            >
            <input
              id="login-email"
              v-model.trim="loginForm.email"
              required
              type="email"
              class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
              placeholder="zak@zakcareers.com"
            />
          </div>

          <div>
            <label
              for="login-password"
              class="mb-1 block text-xs font-medium text-gray-700"
              >Password</label
            >
            <input
              id="login-password"
              v-model="loginForm.password"
              required
              type="password"
              class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div class="pt-2">
            <ActionButton
              text="Sign in to account"
              type="primary"
              class="w-full"
            />
          </div>
        </form>

        <form v-else class="space-y-4" @submit.prevent="handleRegister">
          <div>
            <label
              for="reg-name"
              class="mb-1 block text-xs font-medium text-gray-700"
              >Full Name</label
            >
            <input
              id="reg-name"
              v-model.trim="registerForm.name"
              required
              type="text"
              class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label
              for="reg-email"
              class="mb-1 block text-xs font-medium text-gray-700"
              >Email Address</label
            >
            <input
              id="reg-email"
              v-model.trim="registerForm.email"
              required
              type="email"
              class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <label
              for="reg-headline"
              class="mb-1 block text-xs font-medium text-gray-700"
              >Current Role / Headline</label
            >
            <input
              id="reg-headline"
              v-model.trim="registerForm.headline"
              type="text"
              class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
              placeholder="Full Stack Developer"
            />
          </div>

          <div>
            <label
              for="reg-location"
              class="mb-1 block text-xs font-medium text-gray-700"
              >Preferred Location</label
            >
            <input
              id="reg-location"
              v-model.trim="registerForm.location"
              type="text"
              class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
              placeholder="London"
            />
          </div>

          <div>
            <label
              for="reg-password"
              class="mb-1 block text-xs font-medium text-gray-700"
              >Password</label
            >
            <input
              id="reg-password"
              v-model="registerForm.password"
              required
              type="password"
              class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
              placeholder="Create a password"
            />
          </div>

          <div class="pt-2">
            <ActionButton
              text="Create account & Sign in"
              type="primary"
              class="w-full"
            />
          </div>
        </form>
      </div>

      <!-- LOGGED IN: ACCOUNT MANAGEMENT DASHBOARD -->
      <div v-else>
        <!-- Profile Summary Banner -->
        <div
          class="mb-8 flex flex-col justify-between gap-6 rounded-xl border border-solid border-brand-gray-1 bg-white p-6 shadow-sm md:flex-row md:items-center"
        >
          <div class="flex items-center gap-5">
            <img
              :src="userStore.userProfile.avatarUrl"
              alt="Profile avatar"
              class="h-20 w-20 rounded-full border border-solid border-brand-gray-1 object-contain"
            />
            <div>
              <h2 class="text-2xl font-medium text-gray-900">
                {{ userStore.userProfile.name }}
              </h2>
              <p class="text-sm text-brand-blue-1">
                {{ userStore.userProfile.headline }}
              </p>
              <p class="mt-1 text-xs text-gray-500">
                {{ userStore.userProfile.email }}
                <span v-if="userStore.userProfile.location">
                  &bull; {{ userStore.userProfile.location }}
                </span>
                <span v-if="userStore.userProfile.degree">
                  &bull; {{ userStore.userProfile.degree }}
                </span>
              </p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <ActionButton
              text="Match Jobs to My Profile"
              type="primary"
              @click="matchJobsToProfile"
            />
            <ActionButton
              text="Sign out"
              type="secondary"
              @click="userStore.logoutUser"
            />
          </div>
        </div>

        <!-- Dashboard Navigation Tabs -->
        <div
          class="mb-6 flex flex-wrap gap-2 border-b border-solid border-brand-gray-1 bg-white px-6 pt-3 rounded-t-xl"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            :class="[
              'px-4 pb-3 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'border-b-2 border-brand-blue-1 text-brand-blue-1'
                : 'text-gray-600 hover:text-gray-900',
            ]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- TAB 1: PERSONAL INFO -->
        <div
          v-if="activeTab === 'profile'"
          class="rounded-b-xl border border-t-0 border-solid border-brand-gray-1 bg-white p-8 shadow-sm"
        >
          <div
            v-if="saveSuccessMessage"
            class="mb-6 rounded-lg bg-green-50 p-4 text-sm font-medium text-brand-green-1"
          >
            {{ saveSuccessMessage }}
          </div>

          <h3 class="mb-6 text-lg font-medium text-gray-900">
            Personal Information
          </h3>

          <form class="space-y-6" @submit.prevent="savePersonalInfo">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  for="profile-name"
                  class="mb-1 block text-xs font-medium text-gray-700"
                  >Full Name</label
                >
                <input
                  id="profile-name"
                  v-model.trim="profileForm.name"
                  required
                  type="text"
                  class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
                />
              </div>

              <div>
                <label
                  for="profile-email"
                  class="mb-1 block text-xs font-medium text-gray-700"
                  >Email Address</label
                >
                <input
                  id="profile-email"
                  v-model.trim="profileForm.email"
                  required
                  type="email"
                  class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
                />
              </div>

              <div>
                <label
                  for="profile-headline"
                  class="mb-1 block text-xs font-medium text-gray-700"
                  >Headline / Role</label
                >
                <input
                  id="profile-headline"
                  v-model.trim="profileForm.headline"
                  type="text"
                  class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
                />
              </div>

              <div>
                <label
                  for="profile-location"
                  class="mb-1 block text-xs font-medium text-gray-700"
                  >Preferred City / Location</label
                >
                <input
                  id="profile-location"
                  v-model.trim="profileForm.location"
                  type="text"
                  class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
                />
              </div>

              <div>
                <label
                  for="profile-phone"
                  class="mb-1 block text-xs font-medium text-gray-700"
                  >Phone Number</label
                >
                <input
                  id="profile-phone"
                  v-model.trim="profileForm.phone"
                  type="text"
                  class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
                />
              </div>

              <div>
                <label
                  for="profile-portfolio"
                  class="mb-1 block text-xs font-medium text-gray-700"
                  >Portfolio / GitHub URL</label
                >
                <input
                  id="profile-portfolio"
                  v-model.trim="profileForm.portfolioUrl"
                  type="url"
                  class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                for="profile-avatar"
                class="mb-1 block text-xs font-medium text-gray-700"
                >Profile Avatar URL</label
              >
              <input
                id="profile-avatar"
                v-model.trim="profileForm.avatarUrl"
                type="url"
                class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
              />
            </div>

            <div>
              <label
                for="profile-bio"
                class="mb-1 block text-xs font-medium text-gray-700"
                >Bio / Summary</label
              >
              <textarea
                id="profile-bio"
                v-model.trim="profileForm.bio"
                rows="3"
                class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
              ></textarea>
            </div>

            <div class="flex justify-end">
              <ActionButton text="Save Profile Changes" type="primary" />
            </div>
          </form>
        </div>

        <!-- TAB 2: RESUME & QUALIFICATIONS -->
        <div
          v-if="activeTab === 'qualifications'"
          class="space-y-8 rounded-b-xl border border-t-0 border-solid border-brand-gray-1 bg-white p-8 shadow-sm"
        >
          <div
            v-if="saveSuccessMessage"
            class="rounded-lg bg-green-50 p-4 text-sm font-medium text-brand-green-1"
          >
            {{ saveSuccessMessage }}
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                for="qual-degree"
                class="mb-1 block text-xs font-medium text-gray-700"
                >Highest Degree</label
              >
              <select
                id="qual-degree"
                v-model="profileForm.degree"
                class="w-full rounded border border-solid border-brand-gray-1 bg-white p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
                @change="savePersonalInfo"
              >
                <option value="Associate">Associate</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="Ph.D.">Ph.D.</option>
                <option value="Pursuing Degree">Pursuing Degree</option>
              </select>
            </div>

            <div>
              <label
                for="qual-university"
                class="mb-1 block text-xs font-medium text-gray-700"
                >University / Institution</label
              >
              <input
                id="qual-university"
                v-model.trim="profileForm.university"
                type="text"
                class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
                @blur="savePersonalInfo"
              />
            </div>
          </div>

          <!-- Skills Manager -->
          <div class="border-t border-solid border-brand-gray-1 pt-6">
            <h3 class="mb-3 text-base font-medium text-gray-900">
              Skills &amp; Technologies
            </h3>
            <div class="mb-4 flex flex-wrap gap-2">
              <span
                v-for="skill in userStore.userProfile.skills"
                :key="skill"
                class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-brand-blue-1"
              >
                {{ skill }}
                <button
                  type="button"
                  class="ml-1 font-bold hover:text-gray-900"
                  @click="userStore.REMOVE_USER_SKILL(skill)"
                >
                  &times;
                </button>
              </span>
            </div>

            <form class="flex max-w-md gap-2" @submit.prevent="handleAddSkill">
              <input
                v-model.trim="newSkill"
                type="text"
                placeholder="Add a skill (e.g. TypeScript, Go, Kubernetes)"
                class="flex-1 rounded border border-solid border-brand-gray-1 p-2 text-sm focus:border-brand-blue-1 focus:outline-none"
              />
              <ActionButton text="Add Skill" type="secondary" />
            </form>
          </div>

          <!-- Work Experience Manager -->
          <div class="border-t border-solid border-brand-gray-1 pt-6">
            <h3 class="mb-4 text-base font-medium text-gray-900">
              Work Experience
            </h3>

            <div class="space-y-4">
              <div
                v-for="exp in userStore.userProfile.experience"
                :key="exp.id"
                class="flex items-start justify-between rounded-lg border border-solid border-brand-gray-1 p-4"
              >
                <div>
                  <h4 class="font-medium text-gray-900">
                    {{ exp.role }} &bull;
                    <span class="text-brand-blue-1">{{ exp.company }}</span>
                  </h4>
                  <p class="text-xs text-gray-500">{{ exp.period }}</p>
                  <p class="mt-2 text-sm text-gray-700">{{ exp.summary }}</p>
                </div>
                <button
                  type="button"
                  class="text-xs text-red-600 hover:underline"
                  @click="userStore.REMOVE_USER_EXPERIENCE(exp.id)"
                >
                  Remove
                </button>
              </div>
            </div>

            <form
              class="mt-6 space-y-4 rounded-lg bg-brand-gray-2 p-5"
              @submit.prevent="handleAddExperience"
            >
              <h4 class="text-sm font-medium text-gray-900">
                Add Work Experience
              </h4>
              <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <input
                  v-model.trim="newExperience.role"
                  required
                  type="text"
                  placeholder="Role (e.g. Software Engineer)"
                  class="rounded border border-solid border-brand-gray-1 bg-white p-2 text-sm focus:outline-none"
                />
                <input
                  v-model.trim="newExperience.company"
                  required
                  type="text"
                  placeholder="Company (e.g. VueTube)"
                  class="rounded border border-solid border-brand-gray-1 bg-white p-2 text-sm focus:outline-none"
                />
                <input
                  v-model.trim="newExperience.period"
                  required
                  type="text"
                  placeholder="Period (e.g. 2021 - 2023)"
                  class="rounded border border-solid border-brand-gray-1 bg-white p-2 text-sm focus:outline-none"
                />
              </div>
              <textarea
                v-model.trim="newExperience.summary"
                rows="2"
                placeholder="Key accomplishments and responsibilities..."
                class="w-full rounded border border-solid border-brand-gray-1 bg-white p-2 text-sm focus:outline-none"
              ></textarea>
              <ActionButton text="Add Experience" type="primary" />
            </form>
          </div>
        </div>

        <!-- TAB 3: MY APPLICATIONS -->
        <div
          v-if="activeTab === 'applications'"
          class="rounded-b-xl border border-t-0 border-solid border-brand-gray-1 bg-white p-8 shadow-sm"
        >
          <h3 class="mb-4 text-lg font-medium text-gray-900">
            Submitted Applications ({{ appliedJobs.length }})
          </h3>

          <div
            v-if="appliedJobs.length === 0"
            class="py-10 text-center text-sm text-gray-500"
          >
            <p class="mb-4">You haven't applied to any roles yet.</p>
            <router-link :to="{ name: 'JobResults' }">
              <ActionButton text="Browse Open Jobs" type="primary" />
            </router-link>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="job in appliedJobs"
              :key="job.id"
              class="flex flex-col justify-between gap-4 rounded-lg border border-solid border-brand-gray-1 p-5 sm:flex-row sm:items-center"
            >
              <div>
                <div class="flex items-center gap-2">
                  <router-link
                    :to="`/jobs/results/${job.id}`"
                    class="text-lg font-medium text-brand-blue-1 hover:underline"
                  >
                    {{ job.title }}
                  </router-link>
                  <span
                    class="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-brand-green-1"
                  >
                    Submitted ✓
                  </span>
                </div>
                <p class="mt-1 text-xs text-gray-600">
                  {{ job.organization }} &bull;
                  {{ job.locations?.join(", ") }} &bull; {{ job.jobType }}
                </p>
              </div>

              <div class="flex items-center gap-3">
                <router-link
                  :to="`/jobs/results/${job.id}`"
                  class="text-xs font-medium text-brand-blue-1 hover:underline"
                >
                  View Job
                </router-link>
                <button
                  type="button"
                  class="text-xs font-medium text-red-600 hover:underline"
                  @click="userStore.WITHDRAW_APPLICATION(job.id)"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 4: SAVED JOBS -->
        <div
          v-if="activeTab === 'saved'"
          class="rounded-b-xl border border-t-0 border-solid border-brand-gray-1 bg-white p-8 shadow-sm"
        >
          <h3 class="mb-4 text-lg font-medium text-gray-900">
            Saved Jobs ({{ savedJobs.length }})
          </h3>

          <div
            v-if="savedJobs.length === 0"
            class="py-10 text-center text-sm text-gray-500"
          >
            <p class="mb-4">
              You have no saved jobs yet. Click "Save ☆" on any job listing to
              bookmark it here.
            </p>
            <router-link :to="{ name: 'JobResults' }">
              <ActionButton text="Explore Jobs" type="primary" />
            </router-link>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="job in savedJobs"
              :key="job.id"
              class="flex flex-col justify-between gap-4 rounded-lg border border-solid border-brand-gray-1 p-5 sm:flex-row sm:items-center"
            >
              <div>
                <router-link
                  :to="`/jobs/results/${job.id}`"
                  class="text-lg font-medium text-brand-blue-1 hover:underline"
                >
                  {{ job.title }}
                </router-link>
                <p class="mt-1 text-xs text-gray-600">
                  {{ job.organization }} &bull;
                  {{ job.locations?.join(", ") }} &bull; {{ job.degree }}
                </p>
              </div>

              <div class="flex items-center gap-3">
                <router-link
                  :to="`/jobs/results/${job.id}`"
                  class="text-xs font-medium text-brand-blue-1 hover:underline"
                >
                  View &amp; Apply
                </router-link>
                <button
                  type="button"
                  class="text-xs font-medium text-red-600 hover:underline"
                  @click="userStore.TOGGLE_SAVED_JOB(job.id)"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 5: ACCOUNT SETTINGS -->
        <div
          v-if="activeTab === 'settings'"
          class="space-y-8 rounded-b-xl border border-t-0 border-solid border-brand-gray-1 bg-white p-8 shadow-sm"
        >
          <div>
            <h3 class="mb-4 text-lg font-medium text-gray-900">
              Email &amp; Notification Preferences
            </h3>
            <div class="space-y-3 text-sm text-gray-700">
              <label class="flex items-center gap-3">
                <input
                  v-model="userStore.userProfile.notifications.jobAlerts"
                  type="checkbox"
                />
                <span>Receive personalized job alerts matching my profile</span>
              </label>
              <label class="flex items-center gap-3">
                <input
                  v-model="userStore.userProfile.notifications.applicationUpdates"
                  type="checkbox"
                />
                <span>Receive status updates on my submitted applications</span>
              </label>
              <label class="flex items-center gap-3">
                <input
                  v-model="userStore.userProfile.notifications.newsletter"
                  type="checkbox"
                />
                <span>Receive engineering blog &amp; career event invitations</span>
              </label>
            </div>
          </div>

          <div class="border-t border-solid border-brand-gray-1 pt-6">
            <h3 class="mb-2 text-lg font-medium text-gray-900">
              Account Actions
            </h3>
            <p class="mb-4 text-xs text-gray-500">
              Sign out of your current session or reset your candidate profile
              data.
            </p>
            <div class="flex flex-wrap gap-4">
              <ActionButton
                text="Sign out"
                type="secondary"
                @click="userStore.logoutUser"
              />
              <button
                type="button"
                class="rounded border border-solid border-red-300 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                @click="userStore.RESET_ACCOUNT"
              >
                Reset Account Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import ActionButton from "@/components/shared/ActionButton.vue";
import HeaderContainer from "@/components/shared/HeaderContainer.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

const instance = getCurrentInstance();
const vueRoute = useRoute();
const vueRouter = useRouter();

const userStore = useUserStore();
const jobsStore = useJobsStore();

const isLoggedIn = computed(() => userStore.isLoggedIn);
const authMode = ref("login");
const activeTab = ref("profile");
const saveSuccessMessage = ref("");

const tabs = [
  { id: "profile", label: "Personal Info" },
  { id: "qualifications", label: "Resume & Qualifications" },
  { id: "applications", label: "My Applications" },
  { id: "saved", label: "Saved Jobs" },
  { id: "settings", label: "Account Settings" },
];

const loginForm = reactive({
  email: userStore.userProfile.email || "zak@zakcareers.com",
  password: "password123",
});

const registerForm = reactive({
  name: "",
  email: "",
  headline: "",
  location: "",
  password: "",
});

const profileForm = reactive({
  name: userStore.userProfile.name,
  email: userStore.userProfile.email,
  headline: userStore.userProfile.headline,
  location: userStore.userProfile.location,
  phone: userStore.userProfile.phone,
  portfolioUrl: userStore.userProfile.portfolioUrl,
  avatarUrl: userStore.userProfile.avatarUrl,
  bio: userStore.userProfile.bio,
  degree: userStore.userProfile.degree,
  university: userStore.userProfile.university,
});

const newSkill = ref("");
const newExperience = reactive({
  role: "",
  company: "",
  period: "",
  summary: "",
});

const syncTabFromRoute = () => {
  const currentRoute = vueRoute || instance?.proxy?.$route;
  const tabParam = currentRoute?.query?.tab;
  if (tabParam && tabs.some((t) => t.id === tabParam)) {
    activeTab.value = tabParam;
  }
};

onMounted(() => {
  syncTabFromRoute();
  if (jobsStore.jobs.length === 0) {
    jobsStore.FETCH_JOBS();
  }
});

watch(
  () => (vueRoute || instance?.proxy?.$route)?.query?.tab,
  (newTab) => {
    if (newTab && tabs.some((t) => t.id === newTab)) {
      activeTab.value = newTab;
    }
  }
);

const handleSignIn = () => {
  const emailName = loginForm.email.split("@")[0];
  const updatedName =
    loginForm.email === userStore.userProfile.email
      ? userStore.userProfile.name
      : emailName.charAt(0).toUpperCase() + emailName.slice(1);

  userStore.loginUser({
    email: loginForm.email,
    name: updatedName,
  });
  Object.assign(profileForm, userStore.userProfile);
};

const handleRegister = () => {
  userStore.loginUser({
    name: registerForm.name,
    email: registerForm.email,
    headline: registerForm.headline || "Software Engineer",
    location: registerForm.location || "Cape Town",
  });
  Object.assign(profileForm, userStore.userProfile);
};

const savePersonalInfo = () => {
  userStore.UPDATE_USER_PROFILE({ ...profileForm });
  saveSuccessMessage.value = "Profile changes saved successfully!";
  setTimeout(() => {
    saveSuccessMessage.value = "";
  }, 2500);
};

const handleAddSkill = () => {
  if (newSkill.value) {
    userStore.ADD_USER_SKILL(newSkill.value);
    newSkill.value = "";
  }
};

const handleAddExperience = () => {
  if (newExperience.role && newExperience.company) {
    userStore.ADD_USER_EXPERIENCE({ ...newExperience });
    newExperience.role = "";
    newExperience.company = "";
    newExperience.period = "";
    newExperience.summary = "";
  }
};

const savedJobs = computed(() =>
  jobsStore.jobs.filter((job) => userStore.isJobSaved(job.id))
);

const appliedJobs = computed(() =>
  jobsStore.jobs.filter((job) => userStore.isJobApplied(job.id))
);

const matchJobsToProfile = () => {
  userStore.CLEAR_USER_JOB_FILTER_SELECTIONS();
  if (userStore.userProfile.degree) {
    userStore.ADD_SELECTED_DEGREES([userStore.userProfile.degree]);
  }
  const router = vueRouter || instance?.proxy?.$router;
  if (router) {
    router.push({ name: "JobResults" });
  }
};
</script>
