import React, { Component } from 'react';
import * as firebase from 'firebase';
import redArrow from '../Images/redx.png'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
 


class tournteam extends Component {
    constructor(props){
        super(props)
        this.state={
            userID: '',
            tid: '',
            teamID: '',
            captain: false,
            roster: [],
            showX: false,
        }
        this.state.tid = this.props.tid
        this.state.teamID = this.props.teamId
        this.state.userID = this.props.userID
        this.showXFunc = this.showXFunc.bind(this)
        this.disbandTeam = this.disbandTeam.bind(this)
      
    }

    componentDidMount(){
        firebase.database().ref('tourneys/' + this.state.tid + '/teams/' + this.state.teamID + '/captain/').once('value', (data) => {

            if(data.toJSON() == this.state.userID){
                   this.setState({
                       captain: true,
                   })
               }
           })
           this.loadRoster()
        

    }

   loadRoster(){
    firebase.database().ref('tourneys/' + this.state.tid + '/teams/' + this.state.teamID + '/teamName/').once('value', (data) => {
        
               this.setState({
                   teamName: data.toJSON(),
               })
           
       })


    const rosterQuery = firebase.database().ref().child('tourneys/' + this.state.tid + '/teams/' + this.state.teamID + '/roster/');
    rosterQuery.once('value',snapshot =>{
        snapshot.forEach(child => {
           
          
                this.setState({
                    roster: this.state.roster.concat(child.val())
                })
           
        })
    })




   }

   showXFunc(d){
       const { showX } = this.state
       this.setState({
           showX: !showX,
       })
   }

   removePlayerFunc(d){
       if(d!=this.state.userID)
       {

       
        const { showX } = this.state
        this.setState({
         showX: !showX,
     })
     const removePlayerTeamQuery = firebase.database().ref().child('tourneys/' + this.state.tid + '/teams/' + this.state.teamID
     + '/roster/' + d)
     const removePlayerTournamentQuery = firebase.database().ref().child('futureTourneys/' + this.state.tid + '/Players/' + d)
     removePlayerTeamQuery.remove()
     removePlayerTournamentQuery.remove()
    }
    else{
        alert("You can't kick yourself, Captain")
    }
   }

   disbandTeam(){
       var that = this
        confirmAlert({
            title: 'Confirm to Disband',
            message: 'Are you sure you want to disband, this action can not be undone.',
            buttons: [{
                label: 'Yes',
                onClick: () => that.disbandScript()
            },
            {
                label: 'No',
                

            }
            
        ]
        })

   }

   disbandScript(){
    for(var i = 0; i < this.state.roster.length; i++){
        const removePlayerTournamentQuery = firebase.database().ref().child('futureTourneys/' + this.state.tid + '/Players/' + this.state.roster[i].userid)
        removePlayerTournamentQuery.remove()
       }
       const removeTeamQuery = firebase.database().ref().child('tourneys/' + this.state.tid + '/teams/' + this.state.teamID)
        removeTeamQuery.remove()
   }

    render() {
        const { showX } = this.state;
        return (
            <div>
                {
                    this.state.captain ?
                    <div id="captainContainer">
                        <div id="rosterPanel">
                        <div id="rosterPanelNamePlate">
                            Roster
                        </div>
                        <div id="rosterContainer">
                            <table>
                                
                                 {this.state.roster.map((data, i) =>{
                                    return(
                                        <tr>
                                            <td id="rosterPictureTableTD"> 
                                                <img id="rosterPicture" src={this.state.roster[i].pp} />
                                            </td>
                                            <td id="rosterUsername">
                                                {this.state.roster[i].username} 
                                            </td>
                                            <td id="rosterRemove">
                                                {this.state.showX ? 

                                                

                                                <img onClick={()=>this.removePlayerFunc(this.state.roster[i].userid)} id="xId" src={redArrow} />
                                                :
                                                null
                                                }
                                            </td>
                                        </tr>
                                    )
                                })}
                            </table>




                        </div>



                        </div>
                        <div id="gamesPanel">
                            <div id="gamePanelNamePlate">
                                Games
                            </div>

                        </div>

                        <div id="controlPanel">
                            <div id="controlPanelNamePlate">
                                {this.state.teamName}
                            </div>
                            <div id="controlTeamMenu">
                            <span onClick={this.showXFunc}>Remove Player</span><br />
                            <span>Invite Player</span><br />
                            <span onClick={this.disbandTeam}>Disband Team</span><br />

                            </div>

                        </div>
                        

                    </div>
                    :
                    <div id="playerContainer">

                    </div>
                        



                }
            </div>
        );
    }
}

export default tournteam;