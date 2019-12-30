import React, { Component } from 'react';
import Nav from '../assigned/nav';
import {NavLink, BrowserRouter, Route, Link, Switch } from "react-router-dom"
import Tournament from '../assigned/tournament.js'
import {withRouter} from 'react-router'
import Arena from '../assigned/arena.js'
import TournamentId from '../assigned/tournamentId.js'
import Temp from '../assigned/temp.js'

class Home extends Component {
    constructor(props){
        super(props)
       
        this.state ={
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
            <div>
               
               
                <BrowserRouter>
                
                    <Switch>
                        <Route exact path="/Tournaments.js" component = {withRouter(Tournament)} exact />
                        <Route exact path="/Arena.js" component = {withRouter(Arena)} exact />
                        <Route exact path="/Tournaments/id/:id" component = {withRouter(TournamentId)} exact />
                        <Route exact path="/Tournaments/id/:id/:teamName" component = {withRouter(Temp)} exact />

                    </Switch>
                    <Nav username = {this.props.username} imageFile = {this.props.imageFile} />
                
                </BrowserRouter>
                
            </div>
        );
    }
}

export default withRouter(Home); 