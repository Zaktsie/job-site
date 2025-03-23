<template>
  <header class="w-full text-sm">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div class="flex flex-nowrap h-full border-b border-solid border-brand-gray-1 px-8 mx-0">
        <a href="/"  class="flex h-full items-center text-xl">{{companyName}}</a>
        <h2 class="ml-8 flex h-full items-center"> Developed by {{developerName}}</h2>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainNav',
  data() {
    return {
      companyName: "Google Careers",
      developerName: "Zak Tsienyane",

    }
  }
}


</script>