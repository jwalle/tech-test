import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../../contexts/AppContext";
import Control from "./Control";
import "./Forum.css";
import TableRow from "./TableRow";

const StyledTable = styled.table`
  margin: 1rem auto;
  border-collapse: collapse;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
    th,td {
      padding: 15px;
      background-color: rgba(255,255,255,0.2);
      width: 140px;
      text-align: center;
      background-color: none;
      &:last-child {
          width: 70px;
          div {
            display: flex;
            justify-content: space-around;
          }
        }
    }

    thead {
      background-color: #EE486B;
    }

    tbody {
      tr {
        &:hover {
    			background-color: rgba(255,255,255,0.3);
        }
      }
    }
`

const Forum = () => {
  const [scores, setScores] = useState(null)
  const { user } = useAppContext();

  useEffect(() => {
    axios.get('http://localhost:4242/api/score', {
      headers: {
        "Authorization": user.token,
      }
    }).then((res) => {
      setScores(res.data)
    })
  }, [])

  // if (!scores) return <p>Loading Content...</p>

  return (
    <div className="Forum">
      <div className="table">
        <Control setScores={setScores} />
        <StyledTable>
          <thead>
            <tr>
              <th>username</th>
              <th>kills</th>
              <th>date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {scores?.map((score, index) => <TableRow {...score} setScores={setScores} key={index} />)}
          </tbody>
        </StyledTable>
      </div>
      <ul className="stats">
        <li>The total sum of kills is : 112</li>
        <li>Lucas as the most kill/game with : 20</li>
        <li>Clem as the most kills with : 56</li>
      </ul>
    </div>
  );
}

export default Forum;