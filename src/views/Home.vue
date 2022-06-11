<template>
  <h1>HOME 页面</h1>
  <a-button type="primary">Primary Button</a-button>
  <input placeholder="Basic usage">

  <button>less 按钮</button>
</template>

<script setup>
import * as api from '../api/index';

import { onMounted } from 'vue';
onMounted(async () => {
  let result = await api.getHomePage();
  console.log(result);
})

</script>
<style lang='less' scoped>
</style>