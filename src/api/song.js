import {commonParams, HOST} from "./config";
import {getUid} from "../common/js/uid";
import {ERR_OK} from "./config";

export function getLyric(mid) {
  const url = HOST + '/api/lyric';
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  });
  return new Promise(resolve => {
    Taro.request({
      method: 'GET',
      url,
      data,
      success(res) {
        resolve(res.data);
      }
    })
  })
}

export function getSongsUrl(songs) {
  const url = HOST + '/api/getPurlUrl';
  const mids = [];
  const types = [];
  songs.forEach(song => {
    mids.push(song.mid);
    types.push(0);
  })
  const urlMid = genUrlMid(mids, types);
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0,
  });
  return new Promise((resolve, reject) => {
    let tryTimes = 3;

    function request() {
      Taro.request({
        method: 'POST',
        url,
        data: {
          comm: data,
          req_0: urlMid,
        },
        success(response) {
          const res = response.data
          if (res.code === ERR_OK) {
            let urlMid = res.req_0
            if (urlMid && urlMid.code === ERR_OK) {
              const purlMap = {}
              urlMid.data.midurlinfo.forEach(item => {
                if (item.purl) {
                  purlMap[item.songmid] = item.purl
                }
              })
              if (Object.keys(purlMap).length > 0) {
                resolve(purlMap)
              } else {
                retry()
              }
            } else {
              retry()
            }
          } else {
            retry()
          }
        }
      })
    }

    function retry() {
      if (--tryTimes >= 0) {
        request();
      } else {
        reject(new Error('Can not get the songs url'));
      }
    }

    request();
  });
}

function genUrlMid(mids, types) {
  const guid = getUid();
  return {
    module: 'vkey.GetVkeyServer',
    method: 'CgiGetVkey',
    param: {
      guid,
      songmid: mids,
      songtype: types,
      uin: '0',
      loginflag: 0,
      platform: '23'
    }
  }
}
