<template>
  <img
    :src="imageLink"
    class="h-8 w-8 rounded-3xl object-contain"
    alt="User profile image"
  />
</template>

<script setup>
import { computed } from "vue";
import { getActivePinia } from "pinia";

import { useUserStore } from "@/stores/user";

const defaultAvatar =
  "https://www.pngitem.com/pimgs/m/487-4876417_link-head-png-toon-link-face-png-transparent.png";

const userStore = getActivePinia() ? useUserStore() : null;

const imageLink = computed(
  () => userStore?.userProfile?.avatarUrl || defaultAvatar
);
</script>
