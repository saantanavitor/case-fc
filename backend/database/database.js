const { Sequelize } = require('sequelize');

const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);

async function authenticate(connection) {
    try {
        await connection.authenticate();
        ("Conexão estabelecida com sucesso!");
    } catch (err) {
        ("Um erro inesperado aconteceu: ", err);
    }
}

module.exports = {connection, authenticate };