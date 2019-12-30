import React, { Component } from 'react';
import '../../SCSS/myTeam.scss'
import CreateTeam from '../assigned/createTeam.js'
import * as firebase from 'firebase';
import MyTournTeam from '../assigned/tournteam.js'

class myTeam extends Component {
    constructor(props){
        super(props)
        this.tid = this.props.tid
        this.teamId = this.props.teamId
      

        this.state = {
            teamId: this.teamId,
            tid: this.tid,
            userID: this.userID,
            hasTeam: true,
        }



    }

    componentDidMount(){
        var that = this
        setTimeout(function(){
            that.checkname()
        }, 350)
        
          
        
       
    }

    componentDidUpdate(prevProps){
        
    }
    checkname(){
       
            this.userID = firebase.auth().currentUser.uid
           
                if(this.state.teamId == undefined){
                    firebase.database().ref('futureTourneys/' + this.tid + '/Players/' + this.userID).once('value', (data) =>
                    {
                      
                      if(data.toJSON() == undefined){
        
                      }
                      else{
                        console.log(data.toJSON())
                          this.setState({
                            hasTeam: false,
                            teamId: data.toJSON(),
                        })
                      }                        
                    })
                    
                    
                }


            
       
        
        
        
    }

    render() {
        return (
            <div id="newContainer">
                {
                    this.state.hasTeam ?
                    <CreateTeam tid={this.state.tid} />
                    :
                    
                    <MyTournTeam teamId={this.state.teamId} tid={this.state.tid} userID={this.userID} />
                }
                
            </div>
        );
    }
}

export default myTeam;