import React, { Component } from 'react';
import Axios from 'axios';
import { URL } from '../../../config/statics';
import ResumeWrapper from '../../../components/App/Resume';
import Loader from '../../../components/App/common/Loader';
import InfoCardTemplate from './templates/InfoCard.template';
import ContactCardTemplate from './templates/ContactCard.template';
import EducationCardTemplate from './templates/EducationCard.template';
import ExperienceCardTemplate from './templates/ExperienceCard.template';
import SkillsCardTemplate from './templates/SkillsCard.template';
import PassionCardTemplate from './templates/PassionCard.template';

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
        this.requestResume();
    };

    componentWillUnmount(){
        this.source.cancel('COMPONENT CLEANUP');
    };

    renderResume(data){
        return Object.entries(data).map((item,index) => {
            switch (item[0]) {
                case 'info':
                    return <InfoCardTemplate order={1} key={index} cardTitle={null} data={item[1]} />;
                case 'contact':
                    return <ContactCardTemplate order={2} key={index} cardTitle="contact" data={item[1]} />;
                case 'education':
                    return <EducationCardTemplate order={5} key={index} cardTitle="education" data={item[1]} />;
                case 'experience':
                    return <ExperienceCardTemplate order={4} key={index} cardTitle="experience" data={item[1]} />;
                case 'skills':
                    return <SkillsCardTemplate order={3} key={index} cardTitle="skills" data={item[1]} />;
                case 'language':
                    return <SkillsCardTemplate order={6} key={index} cardTitle="languages" data={item[1]} />;
                case 'passion':
                    return <PassionCardTemplate order={7} key={index} cardTitle="passions" data={item[1]} />;
                default:
                    break;
            }
        });
    }

    render() {
        return (
            <ResumeWrapper>
                {this.state.loading 
                ? <Loader><span></span></Loader> :
                this.renderResume(this.state.resumeData)}
            </ResumeWrapper>
        );
    }
}

export default Resume;