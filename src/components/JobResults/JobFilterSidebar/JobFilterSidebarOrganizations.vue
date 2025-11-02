<template>
  <CollapsibleAccordion header="Organizations">
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
  </CollapsibleAccordion>
</template>
<script>
import CollapsibleAccordion from "../../shared/CollapsibleAccordion.vue";

export default {
  name: "JobFilterSidebarOrganizations",
  components: { CollapsibleAccordion },
};
</script>
