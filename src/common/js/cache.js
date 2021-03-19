import Taro from '@tarojs/taro'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

// 插入到数组首位
function insertArray(arr, val, cmp, maxLen) {
  const idx = arr.findIndex(cmp);
  if (idx === 0) {
    return;
  }
  if (idx > 0) {
    arr.splice(idx, 1);
  }
  arr.unshift(val);
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

// 从数组中删除
function deleteFromArray(arr, cmp) {
  const idx = arr.findIndex(cmp);
  if (idx > -1) {
    arr.splice(idx, 1);
  }
}

// 保存搜索记录到本地
export function saveSearch(query) {
  const searchs = Taro.getStorageSync(SEARCH_KEY) || [];
  insertArray(searchs, query, item => item === query, SEARCH_MAX_LEN);
  Taro.setStorageSync(SEARCH_KEY, searchs);
  return searchs;
}

// 删除某条搜索记录
export function deleteSearch(query) {
  const searchs = Taro.getStorageSync(SEARCH_KEY) || [];
  deleteFromArray(searchs, item => item === query);
  Taro.setStorageSync(SEARCH_KEY, searchs);
  return searchs;
}

// 清除全部搜索记录
export function clearSearch() {
  Taro.removeStorageSync(SEARCH_KEY);
  return [];
}

// 从本地存储加载搜索记录
export function loadSearch() {
  return Taro.getStorageSync(SEARCH_KEY) || [];
}

// 保存播放记录到本地
export function savePlay(song) {
  const songs = Taro.getStorageSync(PLAY_KEY) || [];
  insertArray(songs, song, item => item.id === song.id, PLAY_MAX_LEN);
  Taro.setStorageSync(PLAY_KEY, songs);
  return songs;
}

// 从本地存储加载播放记录
export function loadPlay() {
  return Taro.getStorageSync(PLAY_KEY) || [];
}

// 保存收藏到本地
export function saveFavorite(song) {
  const songs = Taro.getStorageSync(FAVORITE_KEY) || [];
  insertArray(songs, song, item => item.id === song.id, FAVORITE_MAX_LEN);
  Taro.setStorageSync(FAVORITE_KEY, songs);
  return songs;
}

// 删除某条收藏
export function deleteFavorite(song) {
  const songs = Taro.getStorageSync(FAVORITE_KEY) || [];
  deleteFromArray(songs, item => item.id === song.id);
  Taro.setStorageSync(FAVORITE_KEY, songs);
  return songs;
}

// 从本地加载收藏
export function loadFavorite() {
  return Taro.getStorageSync(FAVORITE_KEY) || [];
}
