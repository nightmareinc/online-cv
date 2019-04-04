import React from 'react';
import SkillCardWrapper, * as SkillCard from '../../../../components/App/Resume/SkillCard';

const SkillBars = ({level}) => {
    let bars = Array(4).fill(<SkillCard.SkillBar active={false}/>);
    for(let i = 0;i < level;i++){
        bars[i] = <SkillCard.SkillBar active={true}/>;
    }
    return bars;
}

const SkillCardList = ({data}) => {
    return data.map((item,index) => (
        <SkillCard.SkillItem key={index}>
            <SkillCard.SkillTitle>
                {item.name}
            </SkillCard.SkillTitle>
            <SkillCard.SkillBarsList>
                <SkillBars level={item.level} />
            </SkillCard.SkillBarsList>
        </SkillCard.SkillItem>
    ))
}

const SkillsCardTemplate = ({data,cardTitle}) => {
    return (
        <SkillCardWrapper>
            <SkillCard.Title>
                {cardTitle}
            </SkillCard.Title>
            <SkillCardList data={data} />
        </SkillCardWrapper>
    );
};

export default SkillsCardTemplate;