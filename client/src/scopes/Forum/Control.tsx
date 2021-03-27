import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import { useAppContext } from '../../contexts/AppContext';
import ScoreInput from './ScoreInput';

interface Props {
    setScores: Function;
}

const StyledForm = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
`;

const Control = ({ setScores }: Props): JSX.Element => {
    const { user } = useAppContext();
    const submitScore = (e) => {
        e.preventDefault();
        const kills = e?.target['score']?.value;
        if (kills === null) return;
        axios('http://localhost:4242/api/score', {
            method: 'POST',
            headers: {
                Authorization: user.token,
            },
            data: {
                kills
            }
        }
        ).then((response) => {
            setScores(response.data)
            e.target[0].value = null;
        }).catch(e => console.log("ERROR: ", e))
    }

    return (
        <StyledForm onSubmit={submitScore} className="control">
            <ScoreInput name="score" placeholder="Kill(s)" />
            <Button name="Ajouter un score ➡" />
        </StyledForm>
    )
}


export default Control;
