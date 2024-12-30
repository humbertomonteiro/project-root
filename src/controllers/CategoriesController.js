const CategoriesModel = require("../models/CategoriesModel");

class CategoriesController {
  async list(req, res) {
    const { limit = 12, page = 1, fields, use_in_menu } = req.query;

    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    const offset = (parsedPage - 1) * parsedLimit;

    const selectedFields = fields
      ? fields.split(",")
      : ["id", "name", "slug", "use_in_menu"];

    const whereConditions = use_in_menu ? { use_in_menu: true } : {};

    try {
      const { rows, count } = await CategoriesModel.findAndCountAll({
        where: whereConditions,
        limit: parsedLimit === -1 ? undefined : parsedLimit,
        offset: parsedLimit === -1 ? 0 : offset,
        attributes: selectedFields,
      });

      const response = {
        data: rows,
        total: count,
        limit: parsedLimit,
        page: parsedPage,
      };

      return res.json(response);
    } catch (error) {
      return res.status(400).json({
        message: "Dados da requisição incorretos.",
      });
    }
  }

  async findById(req, res) {
    const id = req.params.id;
    const data = await CategoriesModel.findByPk(id);

    if (data) {
      return res.json(data);
    } else {
      return res.status(404).json({
        message: "Categoria não encontrada.",
      });
    }
  }

  async create(req, res) {
    const body = req.body;
    try {
      await CategoriesModel.create(body);
      return res.status(201).json({
        message: "Categoria criada com sucesso!",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao criar categoia.",
      });
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const body = req.body;

    try {
      const [updateRows] = await CategoriesModel.update(body, {
        where: { id },
      });

      if (updateRows) {
        return res.status(204).end();
      } else {
        return res.status(404).json({
          message: "Categoria Não encontrada.",
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao atualizar categoria, " + error,
      });
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    try {
      const deletedRows = await CategoriesModel.destroy({
        where: { id },
      });

      if (deletedRows) {
        return res.status(204).end();
      } else {
        return res.status(404).json({
          message: "Categoria não encontrada",
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Error ao remover categoria: " + error,
      });
    }
  }
}

module.exports = CategoriesController;
