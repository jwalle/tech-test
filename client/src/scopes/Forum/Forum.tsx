import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useAppContext } from "../../contexts/AppContext";
import Control from "./Control";
import "./Forum.css";
import TableRow from "./TableRow";
import Stats from "./Stats";

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
      th {
        &:nth-child(2) {
          cursor: pointer;
          &:hover {
    			background-color: rgba(255,255,255,0.3);
          }
        }
      }
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
  const [scores, setScores] = useState<ScoreProps[] | null>(null)
  const { user } = useAppContext();
  const [sort, setSort] = useState<'DESC' | 'ASC' | null>(null)

  useEffect(() => {
    axios.get('http://localhost:4242/api/score', {
      headers: {
        "Authorization": user.token,
      }
    }).then((res) => {
      setScores(res.data)
    })
  }, [])

  const sortedScores = (scores: ScoreProps[]): ScoreProps[] => {
    if (sort) {
      return scores.sort((a, b) => sort === 'DESC' ? a.kills - b.kills : b.kills - a.kills)
    }
    return scores;
  }

  return (
    <div className="Forum">
      <div className="table">
        <Control setScores={setScores} />
        <StyledTable>
          <thead>
            <tr>
              <th>username</th>
              <th onClick={() => setSort(sort === 'DESC' ? 'ASC' : 'DESC')} >
                kills {sort === 'ASC' && "↑"} {sort === 'DESC' && "↓"}
              </th>
              <th>date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedScores(scores)?.map((score, index) => <TableRow {...score} setScores={setScores} key={index} />)}
          </tbody>
        </StyledTable>
      </div>
      <Stats scores={scores} />
    </div>
  );
}

export default Forum;