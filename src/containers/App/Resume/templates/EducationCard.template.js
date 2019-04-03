import React from 'react';
import EducationCardWrapper, * as EduCard from '../../../../components/App/Resume/EducationCard';

const EducationTemplate = ({data}) => {
    return data.map((item,index) => (
        <EducationCardWrapper key={index}>
            <EduCard.Title>
                Education
            </EduCard.Title>
            <EduCard.SectionTitle>
                {item.name}
            </EduCard.SectionTitle>
            <EduCard.SectionStartDate>
                {item.begin}
            </EduCard.SectionStartDate>
            <EduCard.SectionEndDate>
                {item.end}
            </EduCard.SectionEndDate>
            <EduCard.SectionSubTitle>
                {item.field}
            </EduCard.SectionSubTitle>
            <EduCard.SectionDescription>
                {item.note}
            </EduCard.SectionDescription>
        </EducationCardWrapper>
    ));
};

export default EducationTemplate;