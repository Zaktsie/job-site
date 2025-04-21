<template>
  <header class="w-full text-sm">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div class="flex flex-nowrap h-full border-b border-solid border-brand-gray-1 px-8 mx-0">
        <a :href="url"  class="flex h-full items-center text-xl font-semibold">{{companyName}}</a>
        <nav class="ml-12  h-full">
          <ul class="flex h-full list-none">
            <li class="h-full ml-9 first:ml-0" v-for="item in menuItems" :key="item">
              <a href="#" class="flex h-full items-center py-2.5">{{item}}</a>
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex h-full items-center">
          <ProfileImage v-if="loggedIn" />
          <ActionButton v-else text="Sign In" @click="loginUser"  />

        </div>
      </div>
    </div>
  </header>
</template>

<script>

import ActionButton from "@/components/ActionButton.vue";
import ProfileImage from "@/components/ProfileImage.vue";

export default {
  name: 'MainNav',
  components: {
    ActionButton,
    ProfileImage,
  },
  data() {
    return {
      companyName: "Google Careers",
      url: "https://www.google.com/about/careers/applications/",
      menuItems: [
          "Teams",
          "Jobs",
          "Location",
          "Benefits",
          "Students",
      ],
      loggedIn: false,
    }
  },
  methods: {
    loginUser() {
      this.loggedIn = true;
    },
  }
}


</script>