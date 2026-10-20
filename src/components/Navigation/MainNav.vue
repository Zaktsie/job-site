<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed left-0 top-0 z-30 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex h-full items-center text-xl font-semibold"
        >
          <img :src="logo" alt="Zak's Careers" class="mr-2 h-8" />
          <span>Zak's Careers</span>
        </router-link>

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="ml-9 h-full first:ml-0"
            >
              <router-link
                :to="menuItem.url"
                class="flex h-full items-center py-2.5 hover:text-brand-blue-1"
              >
                {{ menuItem.text }}
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="relative ml-auto flex h-full items-center gap-4">
          <router-link
            v-if="savedJobIds.length > 0"
            :to="{ name: 'JobResults', query: { saved: 'true' } }"
            class="text-xs font-medium text-brand-blue-1 hover:underline"
          >
            Saved ({{ savedJobIds.length }})
          </router-link>

          <div v-if="isLoggedIn" class="relative flex items-center gap-3">
            <button
              type="button"
              class="flex items-center gap-2 rounded-full border border-solid border-brand-gray-1 px-2.5 py-1 hover:bg-brand-gray-2"
              aria-label="Toggle account menu"
              @click="toggleAccountMenu"
            >
              <ProfileImage />
              <span class="hidden text-xs font-medium text-gray-800 sm:inline">
                {{ userProfile?.name || "Account" }}
              </span>
            </button>

            <div
              v-if="showAccountMenu"
              class="absolute right-0 top-14 z-50 w-80 rounded-2xl border border-solid border-brand-gray-1 bg-white p-5 shadow-lg"
            >
              <div class="flex flex-col items-center border-b border-solid border-brand-gray-1 pb-4 text-center">
                <img
                  :src="userProfile?.avatarUrl"
                  alt="Account avatar"
                  class="mb-2 h-16 w-16 rounded-full border border-solid border-brand-gray-1 object-contain"
                />
                <p class="text-base font-semibold text-gray-900">
                  {{ userProfile?.name }}
                </p>
                <p class="text-xs text-gray-500">{{ userProfile?.email }}</p>
                <p
                  v-if="userProfile?.headline"
                  class="mt-1 rounded-full bg-blue-50 px-3 py-0.5 text-xs font-medium text-brand-blue-1"
                >
                  {{ userProfile.headline }}
                </p>

                <router-link
                  to="/profile"
                  class="mt-4 w-full rounded-full border border-solid border-brand-gray-3 px-4 py-2 text-xs font-medium text-brand-blue-1 hover:bg-blue-50"
                  @click="showAccountMenu = false"
                >
                  Manage your career account
                </router-link>
              </div>

              <div class="my-3 space-y-1 text-xs">
                <router-link
                  to="/profile?tab=applications"
                  class="flex items-center justify-between rounded-lg px-3 py-2 text-gray-700 hover:bg-brand-gray-2"
                  @click="showAccountMenu = false"
                >
                  <span>My Applications</span>
                  <span class="rounded-full bg-brand-gray-2 px-2 py-0.5 font-semibold">
                    {{ appliedJobIds.length }}
                  </span>
                </router-link>

                <router-link
                  to="/profile?tab=saved"
                  class="flex items-center justify-between rounded-lg px-3 py-2 text-gray-700 hover:bg-brand-gray-2"
                  @click="showAccountMenu = false"
                >
                  <span>Saved Jobs</span>
                  <span class="rounded-full bg-brand-gray-2 px-2 py-0.5 font-semibold">
                    {{ savedJobIds.length }}
                  </span>
                </router-link>

                <router-link
                  to="/profile?tab=qualifications"
                  class="flex items-center justify-between rounded-lg px-3 py-2 text-gray-700 hover:bg-brand-gray-2"
                  @click="showAccountMenu = false"
                >
                  <span>Resume &amp; Qualifications</span>
                  <span class="text-brand-blue-1">Edit</span>
                </router-link>
              </div>

              <div class="border-t border-solid border-brand-gray-1 pt-3">
                <button
                  type="button"
                  class="w-full rounded-lg px-3 py-2 text-center text-xs font-medium text-red-600 hover:bg-red-50"
                  @click="handleLogout"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>

          <div v-else class="flex items-center gap-2">
            <router-link
              to="/profile"
              class="text-xs font-medium text-gray-600 hover:text-brand-blue-1"
            >
              Account
            </router-link>
            <ActionButton text="Sign in" @click="loginUser" />
          </div>
        </div>
      </div>

      <TheSubnav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from "vue";

import { useUserStore } from "@/stores/user";
import ActionButton from "@/components/shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import TheSubnav from "@/components/Navigation/TheSubnav.vue";
import logo from "@/assets/logo.png";

const userStore = useUserStore();

const menuItems = ref([
  { text: "Teams", url: "/teams" },
  { text: "Locations", url: "/locations" },
  { text: "Life at Zak careers", url: "/" },
  { text: "How we hire", url: "/hire" },
  { text: "Students", url: "/students" },
  { text: "Jobs", url: "/jobs/results" },
]);

const showAccountMenu = ref(false);

const isLoggedIn = computed(() => userStore.isLoggedIn);
const userProfile = computed(() => userStore.userProfile);
const savedJobIds = computed(() => userStore.savedJobIds || []);
const appliedJobIds = computed(() => userStore.appliedJobIds || []);

const loginUser = () => {
  userStore.loginUser();
};

const toggleAccountMenu = () => {
  showAccountMenu.value = !showAccountMenu.value;
};

const handleLogout = () => {
  showAccountMenu.value = false;
  userStore.logoutUser();
};

const headerHeightClass = computed(() => ({
  "h-16": !isLoggedIn.value,
  "h-32": isLoggedIn.value,
}));
</script>
