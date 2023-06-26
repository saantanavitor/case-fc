const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Usuario = connection.define("usuario", {
  nome: {
    type: DataTypes.STRING(130),
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    type: DataTypes.STRING(17),
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING(14),
    allowNull: false,
    unique: true,
  },
  dataNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  nomeMae: {
    type: DataTypes.STRING(130),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Usuario;