import { DataTypes, Sequelize } from "sequelize";

export function Modelrol(sequealize: Sequelize) {
  return sequealize.define("tbl_role", {
    ro_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ro_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ro_description: {
      type: DataTypes.STRING,
      allowNull: true,
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
