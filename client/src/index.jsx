import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }
/*
  fetchAll() {
    axios.get('/repos')
    .then((response)=>{
      this.setState({repos:response.data})
    })
    .catch(console.log("Fetch All failed"));
  }
*/
  search (term) {
    console.log(`${term} was searched`);
    if(term!==''){
      axios.post('/repos',{
        username:term
      })
      .then(()=>
      axios.get('/repos').then((response)=>{
       // console.log(response.data);
        this.setState({
          repos:response.data
        })
      })
    )
    }

    // TODO
    /*
    if(term!==''&& !this.state.repos.includes(term)){
      this.setState({
        repos:[...this.state.repos,term]
      });
    }
    console.log(this.state.repos);
    */
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));