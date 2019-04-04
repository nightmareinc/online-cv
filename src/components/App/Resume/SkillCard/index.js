import styled from 'styled-components';
import Card from '../../common/Card';
import Title from '../../common/Card/Title';
import SkillItem from './SkillItem';
import SkillBarsList from './SkillBarsList';
import SkillBar from './SkillBar';
import SkillTitle from './SkillTitle';


const SkillCard = styled(Card)`
    display: flex;
    flex-direction: column;
`;

export {
    SkillCard as default,
    Title,
    SkillTitle,
    SkillBar,
    SkillBarsList,
    SkillItem,
};