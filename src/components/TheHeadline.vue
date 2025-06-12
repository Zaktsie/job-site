<template>

<section>
  <h1>{{ action }} for everyBody</h1>
  <h2>Find your next job at Google corp </h2>
</section>

</template>

<script>
export default {
  name: "TheHeadline",
  data() {
    return {
      action: "Hello",
    }
  },
  created() {
    console.log(this.sample," I have been created")
  }

}
</script>