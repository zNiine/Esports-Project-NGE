import React, { Component } from 'react';
import './App.scss';
import * as firebase from 'firebase';
import Login from './Components/unassigned/Login';
import Home from './Components/assigned/Home.js';
import {withRouter} from 'react-router';
import { NavLink, BrowserRouter, Route, Switch, Link } from "react-router-dom"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      username: "",
      imageFile: ""
    }

    

  
  }

  componentDidMount(){
   this.authListener();
  }

      authListener() {
        firebase.auth().onAuthStateChanged((user) =>{
          console.log(user);
          if(user){
            this.setState({ user: user });
            localStorage.setItem('user', user.uid);
            this.fetchUsername(user.uid)
            this.fetchImageFile(user.uid)
            

            
           
          }
          else{
            this.setState({ user: null });
            localStorage.removeItem('user');
            
          }
        })
      }

      fetchUsername(a){
        
      var url = 'http://127.0.0.1:5000/fetchUsername'
      fetch(url, {
          method: 'POST',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: a
          })
      })
      .then(res => res.json())
      .then(responce => {
          console.log(responce)
          this.username = responce;
          this.setState({ username: responce });
           
      })



      }
 

      fetchImageFile(a){
     
      var url = 'http://127.0.0.1:5000/fetchPic'
      fetch(url, {
          method: 'POST',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: a
          })
      })
      .then(res => res.json())
      .then(responce => {
          console.log(responce)
          this.imageFile = responce;
          this.setState({imageFile: responce });
          
      })






      }

  render() {
    return (
      <div className="App">  
      {this.state.user ? (<Home username = {this.state.username} imageFile = {this.state.imageFile} />) : (<Login/>)}
      </div>

      
    ); 
  }
} 
export default (App);
