import express, { Request, Response } from "express";
import { Score } from "../models/scores";
import { User } from "../models/users";
import { isAuth } from "./routeHelper";

const router = express.Router();

router.use(isAuth);

const getScores = async () => {
  User.hasMany(Score, { foreignKey: "id" });
  Score.belongsTo(User, { foreignKey: "userId" });

  const scores = await Score.findAll({
    include: { model: User, attributes: ["username"] },
    order: [["createdAt", "DESC"]],
  });
  if (!scores) throw new Error("Score not fetched");
  return scores.map((score: any) => {
    return {
      id: score.id,
      userId: score.userId,
      kills: score.kills,
      username: score.user.username,
      date: score.createdAt,
    };
  });
};

// @route GET api/score
// @desc get all scores recorded
// @access Private

router.get("/api/score", async (req: Request, res: Response) => {
  try {
    const scores = await getScores();
    res.status(200).send(scores);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: e });
  }
});

// @route POST api/score
// @desc create a new score
// @access Private

router.post("/api/score", async (req: Request, res: Response) => {
  try {
    const { kills } = req.body;

    const newScore = await Score.create({
      userId: req.userId,
      kills: parseInt(kills),
    });
    if (!newScore) throw new Error("error creating score");

    const scores = await getScores();
    res.status(200).send(scores);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: e });
  }
});

// @route PUT api/score/:id
// @desc update score with id => id
// @access Private

router.put("/api/score/:id", async (req: Request, res: Response) => {
  try {
    const { kills } = req.body;
    const { id } = req.params;

    const updateScore = await Score.update(
      { kills: parseInt(kills) },
      { where: { id, userId: req.userId } }
    );
    if (!updateScore) throw new Error("error updating score");

    const scores = await getScores();
    res.status(200).send(scores);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: e });
  }
});

// @route DELETE api/score/:id
// @desc remove score with id => id
// @access Private

router.delete("/api/score/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const destroyScore = await Score.destroy({
      where: { id, userId: req.userId },
    });
    if (!destroyScore) throw new Error("error destroying score");

    const scores = await getScores();
    res.status(200).send(scores);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: e });
  }
});

export { router as scoreRouter };
