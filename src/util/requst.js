import axios from 'axios'
import qs from 'qs'
// 响应拦截
axios.interceptors.response.use(res=>{
    
    console.group("=======请求地址："+res.config.url+"=============")
    console.log(res);
    console.groupEnd()
    return res;
})
 //轮播图
export const reBanner =()=>{
    return axios({
        url:'/banner',
        method:'get'
    })
}

//推荐歌单
export const reRecommend =()=>{
    return axios({
        url:'/personalized',
        method:'get'
    })
}
//推荐歌单详情
export const reListDetail=(params)=>{
    return axios({
        url:'/playlist/detail',
        method:'get',
        params:params
    })
}

//推荐最新音乐
export const reNew =()=>{
    return axios({
        url:'/personalized/newsong',
        method:'get'
    })
}
//热歌榜
export const reHot =(params)=>{
    return axios({
        url:'/top/list',
        method:'get',
        params:params
    })
}
//搜索
export const reSearch =(params)=>{
    return axios({
        url:'/search',
        method:'get',
        params:params
    })
}
//热门搜索
export const reHotSearch =()=>{
    return axios({
        url:'/search/hot',
        method:'get'
    })
}
//获取歌词
export const reLyric =(params)=>{
    return axios({
        url:'/lyric',
        method:'get',
        params:params
    })
}
//播放地址
export const reUrl =(params)=>{
    return axios({
        url:'/song/url',
        method:'get',
        params:params
    })
}
