import React, { Component } from 'react'
import './Searchs.css'
import { Input, Button } from 'antd';
import { reSearch, reHotSearch } from '../../util/requst'

import { List } from 'antd-mobile';
import { PlayCircleOutlined } from '@ant-design/icons';
const Item = List.Item;
const { Search } = Input;

export default class Searchs extends Component {
    constructor() {
        super()
        this.state = {
            searchList: [],
            size: 'large',
            hotList:[],
            keywords:''
        }
    }
    toSearch(e) {
        let keywords = e.target.value;
        reSearch({ keywords }).then(res => {
            this.setState({
                searchList: res.data.result.songs
            })
        })
    }
    toHot(keywords){
        this.setState({
            keywords:keywords
        });
        reSearch({ keywords }).then(res => {
            this.setState({
                searchList: res.data.result.songs
            })
        })
    }
    //去到歌词页
    toLyric(id){
        this.props.history.push('/lyric/'+id)
    }
    componentDidMount() {
        reHotSearch().then(res => {
            this.setState({
                hotList:res.data.result.hots
            })
        })
    }
    render() {
        let { searchList ,size,hotList,keywords} = this.state
        return (
            <div>
                <div className='search-input'>
                    <Search placeholder="请输入关键词" value={keywords} onChange={(e) => { this.toSearch(e) }} style={{ width: "60%", margin: '20px 30px' }} enterButton />
                </div>
                <div className='hot-search'>
                    {
                       hotList.map(item=>{
                           return  (
                            <Button type="primary" shape="round" size={size} key={item.first} onClick={()=>{this.toHot(item.first)}}>
                                {item.first}
                            </Button>
                           )
                       })
                    }
                </div>
                <div className='list-new'>
                    {
                        searchList.map(item => {
                            return (
                                <List className="my-list" key={item.id} onClick={()=>{this.toLyric(item.id)}}>
                                    <Item extra={<PlayCircleOutlined />}>{item.name}</Item>
                                </List>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
