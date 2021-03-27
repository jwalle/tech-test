import React from "react";
import styled from "styled-components";

const StyledList = styled.ul`
   height: fit-content;
  align-self: flex-start;
  margin: 0 auto;
  margin: 1rem;
  line-height: 3rem;
  font-size: 1.4rem;
  font-weight: 600;
  list-style-type: disclosure-closed;
  min-width: 400px;   
`;

interface Props {
    scores: ScoreProps[];
}

const killsSum = (scores) => scores?.reduce((a, b) => a + b.kills, 0);

// reduce the scores array by grouping by userId and adding kills. Then sort by total kills.

const reduceStats = (scores) => scores?.reduce((res, score) => {
    if (!(score.userId in res))
        res.__array.push(res[score.userId] = { ...score, games: 1, kpg: score.kills });
    else {
        res[score.userId].kills += score.kills;
        res[score.userId].games += 1;
        res[score.userId].kpg = res[score.userId].kills / res[score.userId].games;
    }
    return res;
}, { __array: [] }).__array
    ;

const Stats = (props: Props) => {
    const { scores } = props;
    const reducedStats = reduceStats(scores);
    const scoreStats = reducedStats.sort(function (a, b) { return b.kills - a.kills; });
    const killPerGame = reducedStats.sort((a, b) => (b.kpg) - (a.kpg))
    return (
        <StyledList>
            <li>The total sum of kills is : {killsSum(scores)}</li>
            <li>{scoreStats[0].username} as the most kills with : {scoreStats[0].kills}</li>
            <li>{killPerGame[0].username} as the most kills/games  with : {+parseFloat(killPerGame[0].kpg).toFixed(2)}</li>
        </StyledList>
    );
}

export default Stats;