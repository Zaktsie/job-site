import { computed, ref } from "vue";
import { defineStore } from "pinia";

import getDegrees from "@/api/getDegrees";

export const FETCH_DEGREES = "FETCH_DEGREES";
export const UNIQUE_DEGREES = "UNIQUE_DEGREES";

export const useDegreesStore = defineStore("degrees", () => {
  const degrees = ref([]);

  const FETCH_DEGREES = async () => {
    const receivedDegrees = await getDegrees();
    degrees.value = receivedDegrees;
  };

  const UNIQUE_DEGREES = computed(() =>
    degrees.value.map((degree) => degree.degree)
  );

  return { degrees, FETCH_DEGREES, UNIQUE_DEGREES };
});
