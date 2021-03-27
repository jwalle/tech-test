import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}

const Style = styled.input`
    display: flex;
    margin: 10px;
    padding: 10px;
    min-height: 20px;
    width: 200px;
    background: whitesmoke;
    color: black;
    font-size: 1rem;
    font-weight: 600;
`;

const LoginInput = ({ placeholder, ...rest }: Props): JSX.Element => {
    return <Style {...rest} placeholder={placeholder} />;
};

export default LoginInput;
