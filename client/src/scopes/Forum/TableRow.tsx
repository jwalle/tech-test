import React, { useState } from 'react';
import styled from 'styled-components';
import { faEdit, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppContext } from '../../contexts/AppContext';
import axios from 'axios';
import ScoreInput from './ScoreInput';

interface Props {
    id: number;
    kills: number;
    userId: number;
    username: string;
    date: string;
    setScores: Function;
}

interface StyledRowProps {
    selfRow: boolean;
}

const StyledRow = styled.tr<StyledRowProps>`
    td {
        color: ${(props) => (props.selfRow ? '#fff' : "#232E59")};
        background-color: ${(props) => (props.selfRow && "rgba(255,255,255,0.3)")};
        font-weight: 600;
    }
`

const StyledTableData = styled.td`
    margin: 0 !important;
    padding: 0 !important;
    height: 100%;
    text-align: center;
    input {
        height: 100%;
        width: 50px;
        padding: 5px;
        background: whitesmoke;
        color: black;
        font-size: 1rem;
        font-weight: 600;

    }
`

const TableRow = (props: Props): JSX.Element => {
    const { user } = useAppContext();
    const [edit, setEdit] = useState(null)
    const selfRow = props.userId === user.userId;

    const handleDelete = (scoreId: number) => {
        if (scoreId && selfRow) {
            axios(`http://localhost:4242/api/score/${scoreId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: user.token,
                },
            }
            ).then((response) => {
                props.setScores(response.data)
            }).catch(e => console.log("ERROR: ", e))
        }
    }

    const handleSave = (scoreId: number) => {
        // preventDefault();
        if (scoreId && selfRow && edit) {
            axios(`http://localhost:4242/api/score/${scoreId}`, {
                method: 'PUT',
                headers: {
                    Authorization: user.token,
                },
                data: {
                    kills: edit
                }
            }
            ).then((response) => {
                props.setScores(response.data);
                setEdit(null);
            }).catch(e => console.log("ERROR: ", e))
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setEdit(e.target.value)
    }

    return (
        <StyledRow selfRow={selfRow}>
            <td>{props.username}</td>
            {edit === null ?
                <td>
                    {props.kills}
                </td>
                :
                <StyledTableData>
                    <input name="score" type='number' value={edit} onChange={handleChange} />
                    <FontAwesomeIcon
                        style={{ cursor: 'pointer', color: "#267465", marginLeft: 20 }}
                        icon={faSave}
                        onClick={() => handleSave(props.id)} />
                </StyledTableData>
            }
            <td>{new Date(props.date).toDateString()}</td>
            <td>
                {selfRow &&
                    <div>
                        {edit === null ?
                            <FontAwesomeIcon
                                style={{ cursor: 'pointer', color: "#2943D1" }}
                                icon={faEdit}
                                onClick={() => setEdit(props.kills)} />
                            : <FontAwesomeIcon
                                style={{ cursor: 'pointer', color: "black" }}
                                icon={faTimes}
                                onClick={() => setEdit(null)} />
                        }
                        <FontAwesomeIcon
                            style={{ cursor: 'pointer', color: "#3e3434" }}
                            icon={faTrash}
                            onClick={() => handleDelete(props.id)} />
                    </div>
                }
            </td>
        </StyledRow>
    )
}

export default TableRow;
