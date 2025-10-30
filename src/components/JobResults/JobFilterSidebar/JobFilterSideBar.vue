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
      <collapsible-accordion>
        <div class="mt-5">
          <fieldset>
            <ul class="flex flex-row flex-wrap">
              <li class="h-8 w-1/2">
                <input id="VueTube" type="checkbox" class="mr-3" />
                <label for="VueTube">Vuetube</label>
              </li>
              <li class="h-8 w-1/2">
                <input id="Vue and Me" type="checkbox" class="mr-3" />
                <label for="Vue and Me">Vue and Me</label>
              </li>
              <li class="h-8 w-1/2">
                <input id="Vue Can Do It" type="checkbox" class="mr-3" />
                <label for="Vue Can Do It">Vue Can Do It</label>
              </li>
              <li class="h-8 w-1/2">
                <input id="Point of Vue" type="checkbox" class="mr-3" />
                <label for="Point of Vue">Point of Vue</label>
              </li>
            </ul>
          </fieldset>
        </div>
      </collapsible-accordion>
    </section>
  </div>
</template>
<script>
import ActionButton from "../../../components/shared/ActionButton.vue";
import CollapsibleAccordion from "../../shared/CollapsibleAccordion.vue";

export default {
  name: "JobFilterSidebar",
  components: { ActionButton, CollapsibleAccordion },
};
</script>
