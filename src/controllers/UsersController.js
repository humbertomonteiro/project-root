const UsersModel = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UsersController {
  async list(req, res) {
    const data = await UsersModel.findAll();
    return res.json(data);
  }

  async findById(req, res) {
    const id = req.params.id;
    const data = await UsersModel.findByPk(id);

    if (data) {
      return res.json(data);
    } else {
      return res.status(404).json({
        message: "Usuário não encontrado.",
      });
    }
  }

  async create(req, res) {
    const body = req.body;

    if (body.password !== body.confirmPassword) {
      return res.status(400).json({
        message: "Senhas não coincidem.",
      });
    }

    try {
      const saltRounds = 10;
      body.password = await bcrypt.hash(body.password, saltRounds);

      await UsersModel.create(body);

      return res.status(201).json({
        message: "Usuário criado com sucesso!",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao cadastrar",
      });
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const body = req.body;

    try {
      const [updateRows] = await UsersModel.update(body, {
        where: { id },
      });

      if (updateRows) {
        console.log("Usuário atualizado com sucesso!");
        return res.status(204).end();
      } else {
        return res.status(404).json({
          message: "Usuário Não encontrado.",
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao atualizar usuário, " + error,
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    try {
      const deletedRows = await UsersModel.destroy({
        where: { id },
      });

      if (deletedRows) {
        console.log("Usuário deletado com sucesso!");
        return res.status(204).end();
      } else {
        return res.status(404).json({
          message: "Usuário não encontrado",
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Error ao remover usuário: " + error,
      });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "E-mail e senha são obrigatórios.",
      });
    }

    try {
      const user = await UsersModel.findOne({
        where: {
          email,
        },
        attributes: ["id", "email", "password", "firstName", "surname"],
      });

      if (!user) {
        return res.status(401).json({
          message: "Login ou senha incorretos.",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Login ou senha incorretos.",
        });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.APP_KEY,
        { expiresIn: "12h" }
      );

      return res.json({
        user,
        token,
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);

      return res.status(400).json({
        message: "Erro interno do servidor. Tente novamente mais tarde.",
      });
    }
  }
}

module.exports = UsersController;
