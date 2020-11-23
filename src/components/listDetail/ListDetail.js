import React, { Component } from 'react'
import {reListDetail} from '../../util/requst'
import { List } from 'antd-mobile';
import './ListDetail.css'
import { PlayCircleOutlined } from '@ant-design/icons';
const Item = List.Item;
export default class ListDetail extends Component {
    constructor(){
        super()
        this.state={
            listDetail:[],
            listTitle:{}
        }
    }
    componentDidMount(){
        console.log(this.props);
        let id = this.props.match.params.id
        reListDetail({id}).then(res=>{
            this.setState({
                listDetail:res.data.playlist.tracks,
                listTitle:res.data.playlist
            })
        })
    }
      //歌词页
      toSong(id){
        this.props.history.push('/lyric/'+id)
    }
    render() {
        let {listDetail,listTitle}=this.state
        return (
            <div>
                <div className='list-title'>
                    <img src={listTitle.coverImgUrl} />
                    <p>{listTitle.name}</p>
                </div>
                  <div className='list-new'>
                        {
                            listDetail.map(item => {
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
