<template>
  <h1>首页</h1>
  <ul>
    <li v-for="(item, index) in hero" :key="index">
      <h3>{{ item.category }}</h3>
    </li>
  </ul>
</template>

<script setup>
import * as api from '../api/index';

import { reactive } from 'vue'

let result = await api.getHomePage();
let hero = reactive(result.hero);
console.log(result);
</script>
<style lang='less' scoped>
</style>