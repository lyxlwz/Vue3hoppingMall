<template>
  <div class="home-page">
    <HomeSwiper :banner="data.banner"></HomeSwiper>
  </div>
</template>

<script setup>
import * as api from '../api/index';
import HomeSwiper from './Home/HomeSwiper'

import { reactive } from 'vue'

let result = await api.getHomePage();

const data = reactive({
  banner: result.banner,
});
console.log(result);
</script>

<style lang='less' scoped>
.home-page {
  /** 
   * 如果 postion 为 fixed 需要设置 padding-top
   * 否则为 stiky 不需要设置
   */
  padding-top: 80px;

  position: relative;
  height: 575px;
}
</style>