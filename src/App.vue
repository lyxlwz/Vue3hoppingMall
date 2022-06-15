<template>
  <Home-header ref="HomeHeaderTheme"></Home-header>
  <router-view></router-view>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import HomeHeader from '@/components/HomeHeader';
import { watch, reactive, onMounted, ref } from 'vue';
//第一种获取target值的方式，通过vue中的响应式对象可使用toRaw()方法获取原始对象
import { toRaw } from '@vue/reactivity'

let route = useRoute();
let router = useRouter();

const data = reactive({
  theme: 'light',
})
const HomeHeaderTheme = ref(null);

onMounted(() => {
  // 当界面挂载出来后就会自动执行
  console.log(HomeHeaderTheme, HomeHeaderTheme.value, toRaw(HomeHeaderTheme.value), JSON.parse(JSON.stringify(HomeHeaderTheme.value)));
});
//接受的是null,原因是setup执行时机比mounted早,dom还没形成
console.log(HomeHeaderTheme.value);
// data.theme =

// watch(() => userInfo.username, (newVal, oldVal) => {
//   console.log(newVal, '----newVal');
//   console.log(oldVal, '----oldVal');
// })
</script>

<style>
</style>