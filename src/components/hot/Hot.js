import React, { Component } from 'react'
import {reHot} from '../../util/requst'
import { List } from 'antd-mobile';
import { PlayCircleOutlined } from '@ant-design/icons';
const Item = List.Item;
export default class Hot extends Component {
    constructor(){
        super()
        this.state={
            hotList:[]
        }
    }
    componentDidMount(){
        let idx =1
        reHot({idx}).then(res=>{
            this.setState({
                hotList:res.data.playlist.tracks
            })
        })
    }
       //歌词页
       toSong(id){
        this.props.history.push('/lyric/'+id)
    }
    render() {
        let {hotList} =this.state
        return (
            <div>
                <div className='list-new'>
                        {
                            hotList.map(item => {
                                return (
                                    <List className="my-list" key={item.id} onClick={()=>{this.toSong(item.id)}}>
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
