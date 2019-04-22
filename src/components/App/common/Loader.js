import styled from 'styled-components';

const Loader = styled.div`
    display: block;
    height: 120px;
    width: 120px;
    margin: auto;
    position: relative;

    & span {
        display: block;
        position: absolute;
        top: 0; left: 0;
        bottom: 0; right: 0;
        margin: auto;
        height: 110px;
        width: 110px;
    }
    & span::before {
        content: "";
        display: block;
        position: absolute;
        top: 0; left: 0;
        bottom: 0; right: 0;
        margin: auto;
        height: 100px;
        width: 100px;
        border: 3px solid ${props => props.theme.darker};
        border-bottom: 3px solid transparent;
        border-radius: 50%;
        -webkit-animation: loader-3-1 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
        animation: loader-3-1 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
    }
    @-webkit-keyframes loader-3-1 {
        0%   { -webkit-transform: rotate(0deg); }
        40%  { -webkit-transform: rotate(180deg); }
        60%  { -webkit-transform: rotate(180deg); }
        100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes loader-3-1 {
        0%   { transform: rotate(0deg); }
        40%  { transform: rotate(180deg); }
        60%  { transform: rotate(180deg); }
        100% { transform: rotate(360deg); }
    }
    & span::after {
        content: "";
        position: absolute;
        top: 0; left: 5px;
        bottom: 0; right: 0;
        margin: auto;
        width: 30px;
        height: 30px;
        background: ${props => props.theme.darker};
        border-radius: 50%;
        -webkit-animation: loader-3-2 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
        animation: loader-3-2 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
    }
    @-webkit-keyframes loader-3-2 {
        0%   { -webkit-transform: translate3d(0, -100px, 0) scale(0, 2); opacity: 0; }
        50%  { -webkit-transform: translate3d(0, 0, 0) scale(1.25, 1.25); opacity: 1; }
        100% { -webkit-transform: translate3d(0, 8px, 0) scale(0, 0); opacity: 0; }
    }
    @keyframes loader-3-2 {
        0%   { transform: translate3d(0, -100px, 0) scale(0, 2); opacity: 0; }
        50%  { transform: translate3d(0, 0, 0) scale(1.25, 1.25); opacity: 1; }
        100% { transform: translate3d(0, 8px, 0) scale(0, 0); opacity: 0; }
    }
`;
// credit to https://codepen.io/rbv912/pen/dYbqLQ

export default Loader;