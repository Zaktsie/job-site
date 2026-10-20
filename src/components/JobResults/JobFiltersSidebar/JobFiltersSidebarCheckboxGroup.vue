<template>
  <CollapsibleAccordion :header="header">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="value in uniqueValues"
            :key="value"
            class="h-8 w-1/2"
          >
            <input
              :id="value"
              v-model="selectedValues"
              :value="value"
              type="checkbox"
              class="mr-3"
              @change="selectValue"
            />
            <label :for="value" data-test="value">{{ value }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";

import CollapsibleAccordion from "@/components/shared/CollapsibleAccordion.vue";
import {
  useUserStore,
  CLEAR_USER_JOB_FILTER_SELECTIONS,
} from "@/stores/user";

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  uniqueValues: {
    type: [Set, Array],
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
});

const selectedValues = ref([]);
const instance = getCurrentInstance();

const selectValue = () => {
  props.action(selectedValues.value);
  instance?.proxy?.$router?.push({ name: "JobResults" });
};

const userStore = useUserStore();
userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === CLEAR_USER_JOB_FILTER_SELECTIONS) {
      selectedValues.value = [];
    }
  });
});
</script>
