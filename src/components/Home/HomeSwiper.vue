<template>
  <div class="home-swiper">
    <div class="swiper-bg" :style="{ backgroundColor: data.bgColor }"></div>
    <a-carousel arrows autoplay :beforeChange="changeFn">
      <template #prevArrow>
        <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
          <left-circle-outlined />
        </div>
      </template>
      <template #nextArrow>
        <div class="custom-slick-arrow" style="right: 10px">
          <right-circle-outlined />
        </div>
      </template>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
    </a-carousel>
  </div>
</template>

<script setup>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { reactive, defineProps } from 'vue'

/**
 * defineProps 可导入也可不导入 
 * Vue3新版本中有了这个（编译宏）不需要进行导入
 */
const props = defineProps({
  banner: Array,
})

let data = reactive({
  bgColor: props.banner[0].bg_color,
})
console.log(props);

function changeFn(from, to) {
  data.bgColor = props.banner[to].bg_color
}
</script>
<style lang='less' scoped>
.swiper-bg {
  position: absolute;
  display: block;
  width: 100%;
  height: 575px;
  background-color: orangered;
  transform-origin: 0 0;
  transform: skew(0, -8deg);
  transition: all 0.5s;
}

/* For demo */
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 575px;
  line-height: 575px;
  // background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  z-index: 1;
}

.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}

.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
</style>