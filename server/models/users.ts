import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../db";

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

interface UserCreationAttibutes extends Optional<UserAttributes, "id"> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttibutes>,
    UserAttributes {}

const User = sequelize.define<UserInstance>("users", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { User };
