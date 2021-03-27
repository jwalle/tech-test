import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import ScoreInput from './ScoreInput';


const StyledForm = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
`;

const Control = (): JSX.Element => {
    const submitScore = (e) => {
        e.preventDefault();
        e.target[0].value = null;
    }

    return (
        <StyledForm onSubmit={submitScore} className="control">
            <ScoreInput name="score" placeholder="Kill(s)" />
            <Button name="Ajouter un score ➡" />
        </StyledForm>
    )
}


export default Control;
