import React from 'react';
import styled from 'styled-components';

interface Props {
    name: string;
    callback?: () => void;
}
const StyledButton = styled.input`
    box-sizing: border-box;
    padding: 5px;
    min-height: 20px;
    background-color: white;
    font-size: 0.8rem;
    font-weight: 800;
`;

const Button = ({ callback, name }: Props): JSX.Element => {
    return <StyledButton type="submit" value={name} onClick={() => callback && callback()} />;
};

export default Button;
