import React, { Component } from 'react';
//import logo from './logo.svg';
import styles from './App.css';

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}


class App extends Component {
  render() {
    return (
      <div>
         {/* <img src={logo} className="App-logo" alt="logo" />*/} 
          <Tiles />
      </div>
      );
  }
}

class Tile extends Component {
  render() {
    return (
        <div className={styles.card}>
          <img src={this.props.img} alt={this.props.img} className={styles.tileImg}/>
          <div className={styles.container}>
            <h4 className={styles.placeName}><b>{this.props.name}</b></h4> 
            <p>{this.props.shortDescription}</p> 
          </div>
        </div>
    );
  }
}

class Tiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/places?state=california")
      .then((response) => response.json())
      .then((data) => this.setState({items: data}))  
  }

  render() {

  	return (
  		    <div className="flex-container">
  		        {this.state.items.map(item => 
  		        	<Tile  name={item.name} shortDescription={item.shortdescription} crowdRank={item.crowdrank} img={item.imageUrl}/>)
  		        }
  		    </div>
  		);

  }
  
}

export default App;
