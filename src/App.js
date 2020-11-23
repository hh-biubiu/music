import {Switch,Route,Redirect} from 'react-router-dom'
import Index from './components/index/Index'
import ListDetail from './components/listDetail/ListDetail'
import Lyric from './components/lyric/Lyric'
function App() {
  return (
    <div className="App">
        <Switch>
            <Route path='/index' component={Index}></Route>
            <Route path='/listDetail/:id' component={ListDetail}></Route>
            <Route path='/lyric/:id' component={Lyric}></Route>
            <Redirect to='/index/recommend'></Redirect>
        </Switch>
    </div>
  );
}

export default App;
