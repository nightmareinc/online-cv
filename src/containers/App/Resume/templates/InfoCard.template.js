import React from 'react';
import InfoCardWrapper, * as InfoCard from '../../../../components/App/Resume/InfoCard';

const InfoCardTemplate = ({data,order}) => {
    return (
        <InfoCardWrapper order={order}>
            <InfoCard.Avatar image={data.image} />
            <InfoCard.Name>
                {`${data.firstName} ${data.lastName}`}
            </InfoCard.Name>
            <InfoCard.Sub>
                {`${data.jobTitle}`}
            </InfoCard.Sub>
            <InfoCard.Description title={'BIO'}>
                {`${data.bio}`}
            </InfoCard.Description>
        </InfoCardWrapper>
    );
};

export default InfoCardTemplate;