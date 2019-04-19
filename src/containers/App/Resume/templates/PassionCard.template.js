import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import PassionCardWrapper, * as PassionCard from '../../../../components/App/Resume/PassionCard';

const PassionItems = ({data}) => {
    return data.map((item,index) => (
        <PassionCard.PassionItem key={index}>
            <PassionCard.PassionIcon>
                <Icon icon={item.icon} size='lg' />
            </PassionCard.PassionIcon>
            <PassionCard.PassionTitle>
                {item.title}
            </PassionCard.PassionTitle>
        </PassionCard.PassionItem>
    ))
}

const PassionCardTemplate = ({data,cardTitle,order}) => {
    return (
        <PassionCardWrapper order={order}>
            <PassionCard.Title>
                {cardTitle}
            </PassionCard.Title>
            <PassionCard.PassionList>
                <PassionItems data={data} />
            </PassionCard.PassionList>
        </PassionCardWrapper>
    );
};

export default PassionCardTemplate;