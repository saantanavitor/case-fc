const express = require('express');
require("dotenv").config();
const Usuario = require('./database/usuario')
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

const { connection, authenticate } = require("./database/database");
authenticate(connection);

app.post('/usuarios', async (req, res) => {
  console.log(req.body);
  const { nome, login, senha, email, telefone, cpf, dataNascimento, nomeMae, status} = req.body;
  
  try {
      const novoUsuario = await Usuario.create(
      { nome, login, senha, email, telefone, cpf, dataNascimento, nomeMae, status},
    );
      res.status(201).json(novoUsuario)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

app.post('/login', async (req, res) => {
  const { login, senha } = req.body;
  
  try {
    const loginUsuario = await Usuario.findOne(
      {where: { login: login, senha: senha }}
      )
      console.log(loginUsuario)
    if (!loginUsuario) {
      res.status(404).json({ message: "Usuário invalido."});
    } else {
    res.status(200).json({ token: uuidv4(), email: loginUsuario.email})
    }
    } catch (err) {
      res.status(500).json({ message: "Um erro aconteceu." });
    }
}); 

app.get('/usuarios', async (req, res) => {
  const listaUsuarios = await Usuario.findAll();
  res.json(listaUsuarios);
});

app.get('/usuarios/:id', async (req, res) => {
  try {
    const findUsuario = await Usuario.findByPk(req.params.id);
    res.status(200).json(findUsuario);
  } catch (err) {
    res.status(500).json({ message: "Um erro aconteceu." });
  }

})

app.put('/usuarios/:id', async (req, res) => {
  const { nome, login, senha, email, telefone, cpf, dataNascimento, nomeMae, status } = req.body;
  const usuario = await Usuario.findByPk(req.params.id);

  try {
      await Usuario.update(
        { nome, login, senha, email, telefone, cpf, dataNascimento, nomeMae, status },
        { where: {id: req.params.id} }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
})

app.delete('/usuarios/:id', async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);

  try {
    if (usuario) {
      const status = usuario.status === 'ativo' ? 'inativo' : 'ativo';
      await usuario.update(
        {status}
        );
      res.json({ message: "Usuário atualizado com sucesso"})
    } else {
      res.status(404).json({ message: "Usuário não encontrado"})
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
})

app.delete('/delete', async (req, res) => {
  const usuario = await Usuario.destroy({
    where: {},
    truncate: true
  })
})

app.listen(3000, () => {
  connection.sync({force: true});
  console.log("Servidor rodando em http://localhost:3000/")});