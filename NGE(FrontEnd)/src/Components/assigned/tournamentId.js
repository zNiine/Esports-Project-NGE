import React, { Component } from 'react';
import '../../SCSS/tid.scss'
import cod from '../Images/cod.jpg'
import MyTeamPage from '../assigned/myTeam.js'
import * as firebase from 'firebase';
import BracketPage from '../assigned/bracket.js'



class tournamentId extends Component {

    constructor(props){
        super(props)

        this.state = {
            bracket: false,
            myTeam: true,
            rules: false,
            tid: '',
            userID: '',
            
        }
        this.fetchUserTeam = this.fetchUserTeam.bind(this)
        
        this.userId = ''
        this.tid = this.props.match.params.id
        this.userTeamId = ''
       
    }



    componentDidMount(){
        this.fetchUserTeam()
    

    }

    fetchUserTeam(){
        var that = this
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            let userID = user.uid
            that.setState({
                userID: user.uid,
            })
            let tidd = that.state.tid
            firebase.database().ref('futureTourneys/' + tidd + '/Players/' + userID).on('value', (data) =>
            {
              if(data.toJSON() == undefined){
                  firebase.database().ref('currentTourneys/' + that.tid + '/Players/' + userID).on('value', (data) =>
                  {
                    if(data.toJSON() == undefined){

                    }
                    else{
                        this.userTeamId = data.toJSON()
                    }                        
                  })
            }
            else{
                this.userTeamId = data.toJSON()

            }

        })

    }
        })


    }

    

    controlComponent(d){
       
        switch(d){
            case 'bracket':
                this.setState({
                    bracket: true,
                    myTeam: false,
                    rules: false,
                })
                break;

                case 'myTeam':
                this.setState({
                    bracket: false,
                    myTeam: true,
                    rules: false,
                })
                break;

                case 'rules':
                this.setState({
                    bracket: false,
                    myTeam: false,
                    rules: true,
                })
                break;
        }

    }
    render() {
        return (
            <div id="tContainer">
                <div id="tMenu">
                    <div id="ttMenu">
                         <div class="tMen" onClick={()=>{this.controlComponent('bracket')}}>Bracket</div>
                         <div class="tMen" onClick={()=>{this.controlComponent('myTeam')}}>MyTeam</div>
                         <div class="tMen" onClick={()=>{this.controlComponent('rules')}}>Rules</div>
                    </div>
                    <div>
                    {
                        this.state.bracket ?
                        <BracketPage tid = {this.tid} userID={this.state.userID} />
                        : null
                        
                    }

                    {
                        this.state.myTeam ?
                        <MyTeamPage tid={this.tid} teamid={this.teamId} userID={this.state.userID} />
                        : null
                    }

                    {
                        this.state.rules ?
                        <rules tid={this.tid} />
                        : null
                    }
                  
                  </div>

                </div>
                
            </div>
        );
    }
}

export default tournamentId;