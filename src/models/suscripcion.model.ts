import { DataTypes, Sequelize } from "sequelize";
export function ModelSuscripcion(sequealize: Sequelize) {
  return sequealize.define("tbl_subscription", {
    su_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    su_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    su_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    su_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
}
