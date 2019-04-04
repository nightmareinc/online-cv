import React from 'react';
import ExperienceCardWrapper, * as ExpCard from '../../../../components/App/Resume/ExperienceCard';

const ExperienceList = ({data}) => {
    return data.map((item,index)=>(
        <ExpCard.SectionListWrapper key={index}>
            <ExpCard.SectionTitle>
                {item.jobTitle}
            </ExpCard.SectionTitle>
            <ExpCard.SectionStartDate>
                {item.begin}
            </ExpCard.SectionStartDate>
            <ExpCard.SectionEndDate>
                {item.end}
            </ExpCard.SectionEndDate>
            <ExpCard.SectionSubTitle>
                {item.company}
            </ExpCard.SectionSubTitle>
            <ExpCard.SectionDescription>
                {item.jobDescription}
            </ExpCard.SectionDescription>
        </ExpCard.SectionListWrapper>
    ));
};

const ExperienceCardTemplate = ({data,cardTitle}) => {
    return (
        <ExperienceCardWrapper>
            <ExpCard.Title>
                {cardTitle}
            </ExpCard.Title>
            <ExperienceList data={data} />
        </ExperienceCardWrapper>
    );
};

export default ExperienceCardTemplate;