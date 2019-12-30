import React, { Component } from 'react';
import '../../SCSS/bracket.scss'
import $ from 'jquery'
import challange from '../../jquery.challonge'

class bracket extends Component {
    

    constructor(props){
        super(props)
        this.tid = this.props.tid
        this.state = {
            tid: this.tid,
            url: '',
        }
    }

    componentDidMount(){
        {/*}
        var url = 'http://127.0.0.1:5000/fetchBracket'
        fetch(url, {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tid: this.state.tid
            })
        })
        .then(res => res.json())
        .then(responce => {
            console.log(responce)
           
            
        })
    */}

    $("button").challonge(this.state.tid, {subdomain: '', theme: '1', multiplier: '1.0', match_width_multiplier: '1.0', show_final_results: '0', show_standings: '0'});



    }

    render() {
        return (
            <div>
                <div id="bracket">
                
                    <input id="teamSearch" placeholder="Search for team here" />

                
                <button id="bracketBracket">

                </button>
                </div>
                

            </div>
        );
    }
}

export default bracket;