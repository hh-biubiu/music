import React, { Component } from 'react'
import { reBanner, reRecommend, reNew } from '../../util/requst'
import { Carousel, Grid, List } from 'antd-mobile';
import './Recommend.css'
import { PlayCircleOutlined } from '@ant-design/icons';
const Item = List.Item;
export default class Recommend extends Component {
    constructor() {
        super()
        this.state = {
            //轮播图
            banner: [],
            //推荐音乐
            RecommendList: [],
            //最新音乐
            newList: []
        }
    }
    componentDidMount() {
        //轮播图
        reBanner().then(res => {
            this.setState({
                banner: res.data.banners
            })
        });
        //推荐音乐
        reRecommend().then(res => {
            this.setState({
                RecommendList: res.data.result
            })
        });
        //最新音乐
        reNew().then(res => {
            this.setState({
                newList: res.data.result
            })
        })
       
    }
     //跳转到歌单详情
     toLiDetail(id){
        this.props.history.push('/listDetail/'+id)
    }

    //歌词页
    toSong(id){
        this.props.history.push('/lyric/'+id)
    }
    render() {
        let { banner, RecommendList, newList } = this.state
        return (
            <div>
                <Carousel
                    autoplay
                    infinite
                >
                    {
                        banner.map((item, index) => {
                            return <img src={item.imageUrl} key={index} />
                        })
                    }
                </Carousel>
                <div className='list-box'>
                    <h3>推荐歌单</h3>
                    <Grid
                        data={RecommendList.map(item => { return item })}
                        columnNum={3}

                        renderItem={item => (
                            <div style={{ padding: '12.5px' }} key={item.id} onClick={()=>{this.toLiDetail(item.id)}}>
                                <img src={item.picUrl} style={{ width: '75px', height: '75px' }} alt="" />
                                <div className='span'>
                                    <span>{item.name}</span>
                                </div>
                            </div>
                        )}
                    />
                </div>
                <div className='list-box'>
                    <h3>最新音乐</h3>
                    <div className='list-new'>
                        {
                            newList.map(item => {
                                return (
                                    <List className="my-list" key={item.id} onClick={()=>{this.toSong(item.id)}}>
                                        <Item extra={<PlayCircleOutlined />}>{item.name}</Item>
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
