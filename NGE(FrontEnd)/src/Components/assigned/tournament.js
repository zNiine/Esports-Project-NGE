import React, { Component } from 'react';
import ngeLogo from '../Images/nge.png'
import {withRouter} from 'react-router'
import '../../SCSS/tournaments.scss'
import cod from '../Images/cod.jpg'
import fortnite from '../Images/fortnite.jpeg'
import tk from '../Images/tk.jpeg'
import madden from '../Images/madden.png'



import * as firebase from 'firebase';
import { createTypePredicateNodeWithModifier } from 'typescript';
const prettyMilliseconds = require('pretty-ms');





class tournament extends Component {
    constructor(props){
        super(props)
        this.state = {
            z: [],
            numberofTop: [],
            numberofBottom: [],
        }
    }
    
    componentDidMount(){
        this.fetchTournaments()
        const num = firebase.database().ref().child('numbers');
        num.once('value', snapshot =>{
            snapshot.forEach(child =>{
             
                
                var newTime = new Date(child.val().time)
                
                var newTime = newTime.toString();
                var x = {
                    name: child.val().name,
                    game: child.val().game,
                    creds: child.val().creds,
                    id: child.val().id,
                    numberperTeam: child.val().numberperTeam,
                    payout: child.val().payout,
                    time: newTime,
                    console: child.val().console,
                }
                this.setState({
                
                    numberofTop: this.state.numberofTop.concat([child.val]),
                    numberofBottom: this.state.numberofBottom.concat(x)
                })
            })
        })
    }

    fetchTournaments(){
        const fT = firebase.database().ref().child('futureTourneys');
        fT.once('value',snapshot =>{
            snapshot.forEach(child => {
               
             
                
                    var newTime = new Date(child.val().time)
                    var newTime = newTime.toString();
                    var x = {
                        name: child.val().name,
                        game: child.val().game,
                        creds: child.val().creds,
                        id: child.val().id,
                        numberperTeam: child.val().numberperTeam,
                        payout: child.val().payout,
                        time: newTime,
                        console: child.val().console,
                    }
                    this.setState({
                    
                        numberofTop: this.state.numberofTop.concat([child.val]),
                        numberofBottom: this.state.numberofBottom.concat(x)
                    })
               
            })
        })
       
    }

    tournamentClickHandle(e){

        let path = "/Tournaments/id/" + e
        this.props.history.push(path);
    }

    render() {
        return (
            <div id="TournamentContainer">
                <div id="topRow">
                    <table>
                    <th>
                            <img src={cod} id="codId" />
                            
                        </th>
                        <th>
                            <img src={fortnite} id="fortniteId" />
                            
                        </th>
                        <th>
                            <img src={tk} id="tkId" />
                            
                        </th>
                        <th>
                            <img src={madden} id="maddenId" />
                            
                        </th>
                    </table>

                </div>

                <div id="middleRow">
                    <table id="topRowTable">
                        {this.state.numberofTop.map((data, i) =>{
                            return(
                                
                                <th>
                                    <img src={cod} id="imageTag" />
                                    <div id="info"> 
                                    <div id="title">
                                         Duos Tournament
                                    </div>
                                    <div id="Credits">
                                        5 Credits to enter
                                    </div>
                                    <div id="payout">
                                        85% payout
                                    </div>
                                    <div id="time">
                                        3:30 PM Jan 5
                                    </div>
                                    </div>
                                </th>

                            )
                        })}
                    </table>

                </div>
                <div id="bottomRow">
                <table id="bottomRowTable">
                        {this.state.numberofBottom.map((data, i) =>{
                            return(
                                
                                <th  onClick={()=>{this.tournamentClickHandle(this.state.numberofBottom[i].id)}}>
                                    <img src={cod} id="imageTag" />
                                    <div id="info"> 
                                    <div id="title">
                                         {this.state.numberofBottom[i].name}
                                    </div>
                                    <div id="Credits">
                                    {this.state.numberofBottom[i].creds} Credits to enter
                                    </div>
                                    <div id="payout">
                                    {this.state.numberofBottom[i].payout} Payout
                                    </div>
                                    <div id="time">
                                        {this.state.numberofBottom[i].time}
                                        
                                    </div>
                                    </div>
                                </th>

                            )
                        })}
                    </table>

                </div>
            </div>
        );
    }
}

export default withRouter(tournament);