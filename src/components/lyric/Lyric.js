import React, { Component } from 'react'
import { reLyric, reUrl } from '../../util/requst'
import './Lyric.css'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { List } from 'antd-mobile';
const Item = List.Item;
export default class Lyric extends Component {
    constructor() {
        super()
        this.state = {
            lyricList: [], //歌词
            isShow: true,
            songurl: '',
            currentTime: '',// audio当前播放时间
            currentLyc: 0, // 当前歌词
            lycStyle: {}// 歌词滚动样式
        }
    }
    //播放按钮
    toPlay() {
        let audio = document.querySelector('audio')
        if (this.state.isShow) {
            audio.play()
            
        } else {
            audio.pause()
        }
        this.setState({
            isShow: !this.state.isShow
        });
        
        
    }
    componentDidMount() {
        // console.log(this.props.match.params.id);
        let id = this.props.match.params.id;
        //获取歌词
        reLyric({ id }).then(res => {
            let result = this.getSong(res.data.lrc.lyric);
            let re = result.slice(0, result.length - 1)
            this.setState({
                lyricList: re
            })
        });
        //播放地址
        reUrl({ id }).then(res => {
            this.setState({
                songurl: res.data.data[0].url
            })
        });
    }
    //将歌词和时间以对象的形式返回出来
    getSong(lyric) {
        let lyricList = this.state.lyricList;
        lyric.split(/[\n]/).map(item => {
            let temp = item.split(/\[(.+?)\]/);
            lyricList.push(
                {
                    time: temp[1], // 时间
                    lyc: temp[2] //歌词内容
                })
        });
        return lyricList
    }
    //当前时间补零操作
    getTimes(value) {
     
        if (!value) return ''
        let interval = Math.floor(value)
        let minute = (Math.floor(interval / 60)).toString().padStart(2, '0')
        let second = (interval % 60).toString().padStart(2, '0')
        return `${minute}:${second}`
    }
    timeUpdate(e) {
        
        let currentTime =  this.getTimes(document.getElementsByTagName('audio')[0]['currentTime']);
        let { currentLyc, lyricList } = this.state
        for (let i = currentLyc; i < lyricList.length - 1; i++) {
            // console.log(lyricList[i + 1]['time']);
            // console.log(currentTime);
            if (currentTime < lyricList[i + 1]['time'] && currentTime > lyricList[i]['time']) {
                // console.log(111);
                this.setState({
                    currentLyc: i,
                    lycStyle: {
                        transform: `translateY(-${0.545 * i}rem)`
                    }
                })
            }
        }
    }
    render() {
        let { lyricList, isShow, songurl, lycStyle, currentLyc } = this.state
        // console.log(lyricList);
        return (
            <div>
                <div className='top-box'>
                    <div className='circle-box'>
                        <div className='inner' onClick={() => { this.toPlay() }}>
                            {
                                isShow ? <PlayCircleOutlined /> : <PauseCircleOutlined />
                            }
                        </div>
                    </div>
                </div>
                <div className='audio-box'>
                    <audio src={songurl} autoPlay onTimeUpdate={(e) => { this.timeUpdate(e) }} controls id='audio' ></audio>
                </div>
                <div className='song-box'>
                    <div className='song-area' style={lycStyle}>
                        {
                            lyricList.map((item, index) => {
                                return (
                                    <List className="my-list" key={item.time} style={currentLyc === index ? { color: 'yellow' } : {}}>
                                        <Item>{item.lyc}</Item>
                                    </List>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
