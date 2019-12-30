import React, { Component } from 'react';

class temp extends Component {
    constructor(props){
        super(props)
        this.tid = this.props.match.params.id
    }
    componentDidUpdate(){
        let path = "/Tournaments/id/" + this.state.tid + '/'
        this.props.history.push(path);
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default temp;