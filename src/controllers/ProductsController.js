const connection = require("../config/connection");
const ImagesProductModel = require("../models/ImagesProductModel");
const OptionsProductModel = require("../models/OptionsProductModel");
const ProductsModel = require("../models/ProductsModel");

class ProductsController {
  async list(req, res) {
    ProductsModel.hasMany(ImagesProductModel, {
      foreignKey: "product_id",
      as: "images",
    });
    ProductsModel.hasMany(OptionsProductModel, {
      foreignKey: "product_id",
      as: "options",
    });
    const {
      limit = 12,
      page = 1,
      fields,
      match,
      category_ids,
      price_range,
      option,
    } = req.query;

    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    const offset = (parsedPage - 1) * parsedLimit;

    const selectedFields = fields
      ? fields.split(",")
      : [
          "id",
          "enabled",
          "name",
          "slug",
          "stock",
          "description",
          "price",
          "price_with_discount",
          "category_ids",
        ];

    const whereConditions = {};

    if (match) {
      whereConditions.name = { [Op.iLike]: `%${match}%` };
      whereConditions.description = { [Op.iLike]: `%${match}%` };
    }

    if (category_ids) {
      const categoryIdsArray = category_ids
        .split(",")
        .map((id) => parseInt(id));
      whereConditions["$CategoriesModel.id$"] = { [Op.in]: categoryIdsArray };
    }

    if (price_range) {
      const [minPrice, maxPrice] = price_range
        .split("-")
        .map((price) => parseFloat(price));
      whereConditions.price = { [Op.between]: [minPrice, maxPrice] };
    }

    if (option) {
      const optionFilters = Object.keys(option).map((key) => ({
        [Op.and]: [
          { "options.id": key },
          { "options.value": { [Op.in]: option[key].split(",") } },
        ],
      }));
      whereConditions[Op.and] = optionFilters;
    }

    try {
      const { rows, count } = await ProductsModel.findAndCountAll({
        where: whereConditions,
        limit: parsedLimit === -1 ? undefined : parsedLimit,
        offset: parsedLimit === -1 ? 0 : offset,
        attributes: selectedFields,
        include: [
          {
            model: ImagesProductModel,
            as: "images",
            attributes: ["id", "enabled", "path"],
          },
          {
            model: OptionsProductModel,
            as: "options",
            attributes: ["id", "title", "shape", "radius", "type", "values"],
          },
        ],
        distinct: true,
        subQuery: false,
      });

      const response = {
        data: rows,
        total: count,
        limit: parsedLimit === -1 ? count : parsedLimit,
        page: parsedPage,
      };

      return res.json(response);
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao buscar produtos: " + error.message,
      });
    }
  }

  async findById(req, res) {
    const id = req.params.id;
    const data = await ProductsModel.findByPk(id);

    if (data) {
      return res.json(data);
    } else {
      return res.status(404).json({
        message: "Categoria não encontrada.",
      });
    }
  }

  async create(req, res) {
    const { images = [], options = [], ...productData } = req.body;
    const transaction = await connection.transaction();
    try {
      const newProduct = await ProductsModel.create(productData, {
        transaction,
      });

      await Promise.all(
        images.map((img) =>
          ImagesProductModel.create(
            {
              product_id: +newProduct.id,
              enabled: img.enabled,
              path: img.path,
            },
            { transaction }
          )
        )
      );

      await Promise.all(
        options.map((option) =>
          OptionsProductModel.create(
            {
              product_id: +newProduct.id,
              title: option.title,
              shape: option.shape,
              radios: option.radios,
              type: option.type,
              values: option.values,
            },
            { transaction }
          )
        )
      );

      await transaction.commit();

      return res.status(201).json({
        message: "Produto criado com sucesso!",
        product: newProduct,
        images,
        options,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Erro ao criar produto:" + error);
      return res.status(400).json({
        message: "Erro ao criar produto: " + error,
        error: error.message,
      });
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const body = req.body;

    try {
      const [updateRows] = await ProductsModel.update(body, {
        where: { id },
      });

      if (updateRows) {
        console.log("Categoria atualizada com sucesso!");
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
      const deletedRows = await ProductsModel.destroy({
        where: { id },
      });

      if (deletedRows) {
        console.log("Produto removido com sucesso!");
        return res.status(204).end();
      } else {
        return res.status(404).json({
          message: "Produto não encontrado",
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Error ao remover Produto: " + error,
      });
    }
  }
}

module.exports = ProductsController;
