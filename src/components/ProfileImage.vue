<template>
<img :src="imageSrc" class="h-8 w-8 rounded-3xl object-contain"  alt=""/>
  
</template>

<script>
export default {
  name: "ProfileImage",
  data() {
    return {
      imageSrc:
          "https://avatars.githubusercontent.com/u/115221112?s=400&u=d2ec33798d2ff11f89cb8c035213e00242e21347&v=4"
    }
  }
}
</script>
