import styled from 'styled-components';
import Card from '../../common/Card';
import Title from '../../common/Card/Title';
import PassionIcon from './PassionIcon';
import PassionTitle from './PassionTitle';
import PassionItem from './PassionItem';
import PassionList from './PassionList';

const PassionCard = styled(Card)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export {
    PassionCard as default,
    PassionIcon,
    PassionTitle,
    PassionItem,
    PassionList,
    Title
};