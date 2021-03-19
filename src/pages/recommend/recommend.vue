<template>
  <view class="recommend">
    <my-swiper :imgUrls="imgUrls"/>
    <AtList>
      <AtListItem title='标题文字' />
      <AtListItem title='标题文字' arrow='right' />
      <AtListItem title='标题文字' extraText='详细信息' />
      <AtListItem title='禁用状态' disabled extraText='详细信息' />
    </AtList>
  </view>
</template>

<script>
import {AtList, AtListItem} from 'taro-ui-vue';
import MySwiper from '../../components/my-swiper';
import {getDiscList, getRecommend} from "../../api/recommend";
import {ERR_OK} from "../../api/config";

import 'taro-ui-vue/dist/style/components/list.scss';
import './recommend.scss';

export default {
  name: 'Recommend',
  components: {
    MySwiper,
    AtList,
    AtListItem,
  },
  data() {
    return {
      recommends: [],
      discList: [],
    };
  },
  computed: {
    imgUrls() {
      return this.recommends.map(item => item.picUrl);
    }
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  mounted() {

  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      })
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list;
        }
      })
    }
  },
  onLoad() {
    console.log('onLoad')
  }
}
</script>
