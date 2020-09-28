import { DataTypes, Sequelize } from "sequelize";

export function Modeluser(sequealize: Sequelize) {
  return sequealize.define("tbl_users", {
    use_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    use_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    use_lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    use_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    use_phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    use_photo: {
      type: DataTypes.STRING,
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
