import React, { Component } from 'react';
import Axios from 'axios';
import { URL } from '../../../config/statics';

class Resume extends Component {
    state = {
        resumeData: {},
        loading: true
    }

    cancelToken = Axios.CancelToken;
    source = this.cancelToken.source();

    requestResume() {
        Axios.get(`${URL}/resume`,{
            cancelToken: this.source.token
        })
        .then( res => {
            this.setState({
                resumeData: res.data,
                loading: false
            });
        }).catch(err => {
            if (Axios.isCancel(err)){
                console.log('req was cancelled: >> ',err);
            } else {
                console.error('some other error happened',err);
            }
        });
    };

    componentWillMount(){
        setTimeout(() => {
            this.requestResume();
        }, 2000);
        
    };

    componentWillUnmount(){
        this.source.cancel('COMPONENT CLEANUP');
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