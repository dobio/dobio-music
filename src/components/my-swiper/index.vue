<template>
  <view class="my-swiper">
    <swiper
      :indicatorDots="indicatorDots"
      :indicatorColor="indicatorColor"
      :indicatorActiveColor="indicatorActiveColor"
      :autoplay="autoplay"
      :circular="circular"
    >
      <swiper-item v-for="item in imgUrls" :key="item">
        <image :src="item" class="swiper-image"/>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import './index.scss';

export default {
  name: "MySwiper",
  props: {
    imgUrls: {
      type: Array,
      default: null,
    }
  },
  data() {
    return {
      indicatorDots: true,
      indicatorColor: 'rgba(255,255,255,0.5)',
      indicatorActiveColor: 'rgba(255,255,255,0.9)',
      autoplay: true,
      circular: true,
    };
  },
}
</script>
