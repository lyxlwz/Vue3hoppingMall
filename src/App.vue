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
/* 设置子菜单样式 */
.ant-menu-submenu {
  z-index: 10000000 !important;
}

body .ant-menu-sub .ant-menu-item {
  height: auto;
}

.ant-menu-sub .ant-menu-item .prod-item {
  display: flex;
  width: 400px;
  justify-content: space-between;
}

.ant-menu .prod-item img {
  width: 100px;
  height: 100px;
}

.ant-menu-sub .ant-menu-item .prod-item .middle {
  width: 220px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.ant-menu-sub .ant-menu-item .prod-item .middle .title {
  font-size: 16px;
  font-weight: 900;
}

.ant-menu-sub .ant-menu-item .prod-item .middle .content {
  display: flex;
  justify-content: space-between;
}

.ant-menu-sub .ant-menu-item .prod-item .middle .btn {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 2px solid #ccc;
  margin: 0 5px;
  font-size: 15px;
  font-weight: 800;
}

.ant-menu-sub .ant-menu-item .prod-item .right .price {
  font-weight: 900;
  color: orange;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 设置总价样式 */
.ant-menu-item .total {
  font-weight: 900;
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
}

.ant-menu-item .total .num {
  color: orange;
  padding-right: 20px;
}
</style>