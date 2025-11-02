<template>
  <div
    class="flex flex-col border-r border-solid border-brand-gray-1 bg-white p-4 w-95"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-xl font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear Filters" type="secondary"></action-button>
        </div>
      </div>
      <CollapsibleAccordion header="Degree">
        <p>Placeholder</p>
      </CollapsibleAccordion>
      <CollapsibleAccordion header="Job Types">
        <p>Placeholder</p>
      </CollapsibleAccordion>

      <JobFilterSidebarOrganizations />
    </section>
  </div>
</template>
<script>
import ActionButton from "../../../components/shared/ActionButton.vue";
import CollapsibleAccordion from "../../shared/CollapsibleAccordion.vue";
import JobFilterSidebarOrganizations from "./JobFilterSidebarOrganizations.vue";

export default {
  name: "JobFilterSidebar",
  components: {
    ActionButton,
    CollapsibleAccordion,
    JobFilterSidebarOrganizations,
  },
};
</script>
