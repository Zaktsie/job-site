<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import db from "../../../db.json";

const spotlights = ref([]);

const getSpotlights = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/spotlights`;
  try {
    const response = await axios.get(url);
    spotlights.value = response.data;
  } catch {
    spotlights.value = db.spotlights;
  }
};

onMounted(getSpotlights);
</script>
