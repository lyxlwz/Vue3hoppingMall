<template>
  <div class="loading" v-show="data.isLoading">
    <Loading></Loading>
  </div>

  <div class="product" v-show="!data.isLoading">
    <div class="prod-list" :class="{ hidden: store.state.isFullScreen }">
      <h1>
        <SketchOutlined></SketchOutlined>产品推荐
      </h1>
    </div>
  </div>

  <div class="scene-list" :class="{ hidden: store.state.isFullScreen }">
    <h3>
      <RadarChartOutlined></RadarChartOutlined>切换使用场景
    </h3>
  </div>
</template>
  
<script setup>
/**
 * import 在导入模块中的变量的时候 需要 
 * import { a, b, c, d } from 'xxx'
 * 
 * 导入全部的话就是 
 * import * as api from 'xxxx'
 */
import * as api from '../api/index';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
import { onMounted, reactive } from 'vue'
import Loading from '@/components/Loading'
import { SketchOutlined, RadarChartOutlined } from '@ant-design/icons-vue';

const route = useRoute()
const store = useStore()
const data = reactive({
  product: [],
  isLoading: true,
})
onMounted(async () => {
  let result = await api.getProducts()
  data.isLoading = false

  console.log(result, '===result');
})

window.addEventListener('mousewheel', (event) => {
  if (event.deltaY > 0) {
    // 向上滚动
    store.commit('setFullScreen', true)
  }
  if (event.deltaY < 0) {
    // 向下滚动
    store.commit('setFullScreen', false)
  }
})

</script>
  
<style lang='less' scoped>
.prod-list,
.scene-list {
  width: 300px;
  height: 100vh;
  padding: 90px 0 0;
  position: fixed;
  z-index: 1000;

  transition: all 0.5s;
  background-color: rgba(180, 161, 22, 0.8);
  top: 0;
}

.prod-list {
  left: 0;
}

.prod-list.hidden {
  transform: translate(-100%, 0)
}

.scene-list {
  right: 0;
}

.scene-list.hidden {
  transform: translate(100%, 0)
}
</style>