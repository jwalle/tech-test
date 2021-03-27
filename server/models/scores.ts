import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../db";

export interface ScoreAttributes {
  id: number;
  userId: number;
  kills: number;
}

interface ScoreCreationAttibutes extends Optional<ScoreAttributes, "id"> {}

interface ScoreInstance
  extends Model<ScoreAttributes, ScoreCreationAttibutes>,
    ScoreAttributes {}

const Score = sequelize.define<ScoreInstance>("scores", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  kills: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export { Score };
