import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}

const Style = styled.input`
    display: flex;
    align-items: center;
    margin: 10px;
    padding: 10px;
    min-height: 20px;
    width: 70px;
    justify-content: center;
    background: whitesmoke;
    color: black;
    font-size: 1rem;
    font-weight: 600;
`;

const ScoreInput = ({ placeholder, ...rest }: Props): JSX.Element => {
    return <Style {...rest} type="number" placeholder={placeholder} />;
};

export default ScoreInput;
