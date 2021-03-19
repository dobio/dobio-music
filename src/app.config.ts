export default {
  pages: [
    'pages/recommend/recommend',
    'pages/singer/singer',
    'pages/rank/rank',
    'pages/search/search',
    'pages/user/user',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#000',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white',
    backgroundColor: '#000',
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/recommend/recommend',
        text: '推荐',
      },
      {
        pagePath: 'pages/singer/singer',
        text: '歌手',
      },
      {
        pagePath: 'pages/rank/rank',
        text: '排行',
      },
      {
        pagePath: 'pages/search/search',
        text: '搜索',
      },
      {
        pagePath: 'pages/user/user',
        text: '我的',
      },
    ]
  }
}
