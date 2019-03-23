import React, { Component } from 'react';
import Axios from 'axios';
import { URL } from '../../../config/statics';

class Resume extends Component {
    state = {
        resumeData: {},
        loading: true
    }

    componentWillMount(){
        console.log('loading',this.state.loading)
        setTimeout(() => {
            Axios.get(`${URL}/resume`)
            .then( res => {
                this.setState({
                    resumeData: res.data,
                    loading: false
                });
            });
        }, 2000);
        
    };

    render() {
        return (
            <div>
                {this.state.loading ? <h1> true </h1> : <h1> false </h1>}
            </div>
        );
    }
}

export default Resume;