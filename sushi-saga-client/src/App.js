import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state={
    sushis:[],
    eatenSushis:[],
    index:0,
    money:100
  }

  componentDidMount(){
    fetch('http://localhost:3000/sushis')
    .then(res => res.json())
    .then(data => this.setState({sushis:data}))
  }

  handleNextSushi = () => {
    // console.log('here...')
    if(this.state.index === 96){
      this.setState({
        index:0
      })
    }else{
      this.setState({
        index:this.state.index+4
      })
    }
  }

  handleEatenSushi = (sushi) => {
    // console.log(sushi)
    if(!this.state.eatenSushis.includes(sushi) && this.state.money >= sushi.price){
      this.setState({
        eatenSushis:[...this.state.eatenSushis, sushi],
        money:this.state.money - sushi.price
      })
    }
  }

  render() {
    // console.log(this.state.sushis)
    console.log(this.state.eatenSushis)
    let sushis = this.state.sushis.slice(this.state.index, this.state.index+4)
    return (
      <div className="app">
        <SushiContainer sushis={sushis} 
                        handleNextSushi={this.handleNextSushi} 
                        handleEatenSushi={this.handleEatenSushi}
                        eatenSushi={this.state.eatenSushis}
                        />
        <Table money={this.state.money} eatenSushi={this.state.eatenSushis}/>
      </div>
    );
  }
}

export default App;