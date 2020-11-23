import React, { Component } from 'react'
import { Switch, Route,NavLink,Redirect } from 'react-router-dom'
import './Index.css'
import Hot from '../hot/Hot'
import Recommend from '../recommend/Recommend'
import Searchs from '../search/Searchs'
export default class Index extends Component {
    render() {
        return (
            <div>
                <div className='head'>
                    <p>网抑云</p>
                </div>
                <div className='nav-box'>
                    <NavLink to='/index/recommend' activeClassName='active'>推荐</NavLink>
                    <NavLink to='/index/hot' activeClassName='active'>热歌榜</NavLink>
                    <NavLink to='/index/search' activeClassName='active'>搜索</NavLink>
                </div>
                
                <Switch>
                    <Route path='/index/hot' component={Hot}></Route>
                    <Route path='/index/recommend' component={Recommend}></Route>
                    <Route path='/index/search' component={Searchs}></Route> 
                    <Redirect to='/index/recommend'></Redirect>
                </Switch>
                
            </div>
        )
    }
}
