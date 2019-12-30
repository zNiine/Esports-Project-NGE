import React, { Component } from 'react';
import '../../SCSS/nav.scss'
import ngeLogo from '../Images/nge.png'
import {NavLink, BrowserRouter, Route, Link, Switch } from "react-router-dom"
import {withRouter} from 'react-router'

class nav extends Component {

    constructor(props){
        super(props)
        this.state = {
            imageFile: "",
            username: "",
        }
     

    }
    
     componentDidUpdate(prevProps){
        if (this.props.username !== prevProps.username) {
            this.setState({
                username: this.props.username[0]
            })
          }

          if (this.props.imageFile !== prevProps.imageFile) {
            this.setState({
                imageFile: this.props.imageFile[0]
            })
          }


       }
    


    

    render() {

        return (
            <div id="navContainer">
                {/*}
                <img src={this.state.imageFile} id="ngeLogo" />
                <div id="username">{this.state.username} </div>

        */}
        <img src={ngeLogo} id="ngeLogo" />
        <div id="username">Username</div>
        <br /> <br />
        <hr />
                <Switch>

                
                <div id="menu">
                    <NavLink to="/Tournaments.js"> Tournaments<br /> </NavLink>
                    <NavLink to="/Arena.js"> Arena<br /></NavLink>
                    <NavLink to="/tournaments.js"> Wagers<br /></NavLink>
                    <NavLink to="/tournaments.js"> Store<br /></NavLink>
                    <NavLink to="/tournaments.js"> Streams<br /></NavLink>
                </div>

                </Switch>

              
                
            </div>
        );
    }
}

export default withRouter(nav);