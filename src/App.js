import React, {Component} from 'react';
import './App.css';
import './bootstrap.min.css'
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'

class App extends Component {
   state = {
    topContributions: []
  };
   getGithubData(url, stateName){
    axios.get(url)
      .then(({ data })=>{
        this.setState({[stateName]: data});
        console.log(this.state.topContributions);
      })
  };

  componentDidMount(){
    this.getGithubData('https://api.github.com/repos/CodeFlowOrg/OpenForce-2022/contributors?q=contributions&order=desc',"topContributions");
  }

  render(){
    const {topContributions} = this.state;
    return (
      <div className="App">
        <Table striped bordered condensed hover className="colorBlack">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Contributions</th>
          </tr>
        </thead>
        <tbody>
          {topContributions.map((row,index)=>(
            <tr key={row.login}> 
            <td>{index+1}</td>
            <td><a href={`https://github.com/${row.login}`}>
              <Image src= {row.avatar_url} className="imgHeight" roundedCircle />{row.login}
            </a></td>
            <td>{row.contributions}</td>
            </tr>
          ))}
        </tbody>
        </Table>
      </div>
    );
  }

}

export default App;
