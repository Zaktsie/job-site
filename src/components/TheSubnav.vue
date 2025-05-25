<template>
  <div class="w-full h-16 border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex items-center h-full px8">
      <div>
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span><span class="text-brand-green-1">1642 </span>jobs matched</span>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "TheSubnav",
  components: { FontAwesomeIcon },
};
</script>
