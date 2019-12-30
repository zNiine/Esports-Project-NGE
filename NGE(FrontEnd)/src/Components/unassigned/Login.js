import React, { Component } from 'react';
import '../../SCSS/login.scss'
import ngeLogo from '../Images/nge.png'
import * as firebase from 'firebase';



class login extends Component {

    constructor(props){
        super(props);
        this.state={
            num: false,
        }
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
        this.ajaxCalls = this.ajaxCalls.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
       
        this.username = "";
        this.password1 = "";
        this.password2 = "";
        this.email = "";
        this.userID = "";
        this.loginEmail = "";
        this.loginPassword = "";
    }

    signIn(e){

    }

    signUp(e){
       if(this.state.password1 == this.state.password2)
       {
               this.checkUsername()
              
             
                
       }
       else{
           alert("Passwords do not match")
       }

    }

     ajaxCalls(type, url, data){
    
             url = 'http://127.0.0.1:5000/' + url
             fetch(url, {
                 method: 'POST',
                 headers:{
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({
                    data,
                 })
             })
             .then(res => res.json())
             .then(responce => {
                 console.log(responce)
                 return(responce)
             })

        }

        checkEmail(){
            var data = {
                email: this.state.email
            }
            var url = 'http://127.0.0.1:5000/checkEmail'
            fetch(url, {
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email
                })
            })
            .then(res => res.json())
            .then(responce => {
                console.log(responce)
                if(responce == false){
                    this.createUser()
                }
                else if(responce == true){
                    alert("Email already taken")
                }
            })

        }

        createUser(){
          var email = this.state.email
          var password = this.state.password1
          var username = this.state.username
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
                                
              
              var url = 'http://127.0.0.1:5000/createUser' 
              fetch(url, {
                  method: 'POST',
                  headers:{
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: username,
                    email: email,
                   userID: firebase.auth().currentUser.uid
                  })
              })
              .then(res => res.json())
              .then(responce => {
                  console.log(responce)
                  
              })
           
          })
            
        }
        checkUsername(){
           
            var url = 'http://127.0.0.1:5000/checkUsername'
            fetch(url, {
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username
                })
            })
            .then(res => res.json())
            .then(responce => {
                console.log(responce)
                if(responce == false){
                    this.checkEmail()
                }
                else if(responce == true){
                    alert("Username already taken")
                }
            })


           

        }




    render() {
        return (
            <div id="loginMainPanel">
                <div id="leftPanel">
                    <img src={ngeLogo} id="ngeLogo" />
                    
                </div>

                <div id="middlePanel">
                    <div id="registerPanel">

                        <input ref={this.username} onChange={e => 
                        this.setState({username: e.target.value})} placeholder="Username"/><br />
                        
                        <input ref={this.email} onChange={e => 
                        this.setState({email: e.target.value})}placeholder="Email"/><br />

                        <input ref={this.password1} onChange={e => 
                        this.setState({password1: e.target.value})} placeholder="Password"/><br />

                        <input ref={this.password2} onChange={e => 
                        this.setState({password2: e.target.value})}placeholder="Re-Password"/><br />

                        <button onClick={this.signUp}> Sign Up </button>

                    </div>

                    <div id="loginPanel">
                    
                        
                        <input ref={this.loginEmail} onChange={e => 
                        this.setState({loginEmail: e.target.value})}placeholder="Email"/><br />

                        <input ref={this.loginPassword} onChange={e => 
                        this.setState({loginPassword: e.target.value})} placeholder="Password"/><br />

                      

                        <button onClick={this.signUp}> Sign In </button>

                    </div>

                </div>

                
            </div>
        );
    }
}

export default login;