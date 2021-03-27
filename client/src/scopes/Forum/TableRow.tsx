import React from 'react';
import styled from 'styled-components';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    kills: number;
    username: string;
    date: string;
}

const StyledActionCase = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
`;

const TableRow = (props: Props): JSX.Element => {
    return (
        <tr>
            <td>{props.username}</td>
            <td><StyledActionCase>{props.kills} <FontAwesomeIcon icon={faEdit} /></StyledActionCase></td>
            <td>{new Date(props.date).toDateString()}</td>
            <td>
                <FontAwesomeIcon icon={faTrash} />
            </td>
        </tr>
    )
}

export default TableRow;
