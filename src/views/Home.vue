<template>
  <!-- Vue3 suspense 异步组件 异步请求数据的时候 loading 判断 是否显示数据 -->
  <suspense>
    <!-- 数据没有请求回来的时候 loading -->
    <template #fallback>
      <div class="loading">
        <Loading></Loading>
      </div>
    </template>
    <!-- 数据请求回来 界面渲染数据 -->
    <template #default>
      <h1>
        <HomeAsync></HomeAsync>
      </h1>
    </template>
  </suspense>
</template>

<script setup>
import { onMounted, defineAsyncComponent } from 'vue';
import Loading from '@/components/Loading'

const HomeAsync = defineAsyncComponent(() => import('../components/HomeCom'))

onMounted(async () => {
  // let result = await api.getHomePage();
  // console.log(result);
})

</script>
<style lang='less' scoped>
</style>