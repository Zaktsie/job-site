<template>
  <section>
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClasses">{{ action }}</span> <br />
      for every one
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Google corp</h2>
  </section>
</template>

<script>
import nextElement from "@/util/nextElement.js";

export default {
  name: "TheHeadline",
  data() {
    return {
      action: "Build",
      interval: null,
    };
  },

  computed: {
    actionClasses() {
      return {
        [this.action.toLocaleLowerCase()]: true,
      };
    },
  },
  created() {
    this.changeTitle();
  },
  beforeMount() {
    clearInterval(this.interval);
  },
  methods: {
    changeTitle() {
      setInterval(() => {
        const actionsArr = ["Build", "Create", "Design", "Code"];
        this.action = nextElement(actionsArr, this.action);
      }, 3000);
    },
  },
};
</script>

<style>
.build {
  color: #1a73e8;
}

.design {
  color: #f9ab00;
}

.create {
  color: #34a853;
}

.code {
  color: #d93025;
}
</style>
