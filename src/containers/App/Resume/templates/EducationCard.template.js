import React from 'react';
import EducationCardWrapper, * as EduCard from '../../../../components/App/Resume/EducationCard';

const EducationTemplate = (props) => {
    const {data,cardTitle,order} = props;
    return data.map((item,index) => (
        <EducationCardWrapper order={order} key={index}>
            <EduCard.Title>
                {cardTitle}
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