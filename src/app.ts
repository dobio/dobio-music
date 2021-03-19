import Vue from 'vue';
import store from './store';

import './app.scss'

const App = {
  onLaunch() {
    console.log('onLaunch')
  },
  onShow(options) {
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}

export default App
