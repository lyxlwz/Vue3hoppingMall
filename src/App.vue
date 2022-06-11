<template>
  <router-view></router-view>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

let route = useRoute();
let router = useRouter();
function goAbout() {
  console.log(route, '====router');
  router.push("/about")
}
</script>

<style>
</style>