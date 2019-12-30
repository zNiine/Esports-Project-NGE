import React, { Component } from 'react';
import { userInfo } from 'os';
import { Route , withRouter} from 'react-router-dom';
import * as firebase from 'firebase';



class createTeam extends Component {
    constructor(props){
        super(props)
        this.tid = this.props.tid
        this.state={
            tid: this.tid,
            teamName: [],
            MyteamName: '',
        }
       
    }

    createTeamButtonClick(){
        var checkTeamName = this.checkTeamNameFunc()
        var that = this
        if(checkTeamName == true)
        {
            alert("Name already in use")
        }
        else{
            var url = 'http://127.0.0.1:5000/createTeam'
            fetch(url, {
                  method: 'POST',
                  headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                 body: JSON.stringify({
                    MyteamName: this.state.MyteamName,
                  tid: this.state.tid
                })
      })
      .then(res => res.json())
      .then(responce => {
        var teamData = {
            teamid: responce,
            captain: firebase.auth().currentUser.uid,
            teamName: this.state.MyteamName,
        }

        var tournamentUpdates = {}
        tournamentUpdates['/tourneys/' + this.state.tid + '/teams/' + responce] = teamData
        var playerUpdates = {}
        playerUpdates['futureTourneys/' + this.state.tid + '/Players/' + firebase.auth().currentUser.uid] = responce
        firebase.database().ref().update(tournamentUpdates)
        firebase.database().ref().update(playerUpdates)
        this.componentReset()
        

    })
            var teamData = {
                captain: firebase.auth().currentUser.uid,
                teamName: this.teamName,
            }

           



        }
    }

    componentReset(){
        this.forceUpdate()
       
    }

    checkTeamNameFunc(){
    var teamNameChec = this.teamName
    const checkTeamNameQuery = firebase.database().ref().child('/tourneys/' + this.state.tid + '/teams/')
    checkTeamNameQuery.once('value', snapshot => {
        snapshot.forEach(child => {
            this.setState({
                teamName: this.state.teamName.concat(child.val())
            })
            
        })
        var check = false;
        for(var i = 0; i < this.state.teamName.length; i++)
        {
           
            if(this.state.teamName[i].name === teamNameChec)
            {
                check = true;
                break;
            }
            else{
                continue;
            }
        }

        return check;
    })


    }


    render() {
        return (
            <div id="createTeamPanel">
                <input id="teamNameInput" ref={this.MyteamName} onChange={e => this.setState({
                    MyteamName: e.target.value,
                })} placeholder="Team Name" /><br />
                <button id="createTeamButton" onClick={()=>{this.createTeamButtonClick()}}> Create </button>
            </div>
        );
    }
}

export default withRouter(createTeam);