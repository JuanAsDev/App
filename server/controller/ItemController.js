const { Item, User } = require("../models");

class ItemController {
  static async getItems(req, res) {
    try {
      let items = await Item.findAll({
        order: [["id", "ASC"]],
        include: [{ model: User }],
      });

      res.status(200).json(items);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async create(req, res) {
    try {
      const { name, category, price, stock, UserId } = req.body;
      let image = "https://via.placeholder.com/100";

      let result = await Item.create({
        name,
        category,
        price,
        stock,
        image,
        UserId,
      });

      res.status(201).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async delete(req, res) {
    try {
      let id = +req.params.id;

      let result = await Item.destroy({
        where: { id: id },
      });

      result === 1
        ? res.status(200).json({
            message: `Id ${id} has been deleted.`,
          })
        : res.status(400).json({
            message: `Id ${id} has not been deleted.`,
          });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async update(req, res) {
    try {
      let id = +req.params.id;
      const { name, category, price, stock, image, UserId } = req.body;

      let result = await Item.update(
        {
          name,
          category,
          price,
          stock,
          image,
          UserId,
        },
        {
          where: { id: id },
        }
      );

      result[0] === 1
        ? res.status(200).json({
            message: `Id ${id} has been updated.`,
          })
        : res.status(400).json({
            message: `Id ${id} has not been updated.`,
          });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async getDetails(req, res) {
    try {
      const id = +req.params.id;

      let result = await Item.findByPk(id);

      result
        ? res.status(200).json(result)
        : res.status(404).json({
            message: `Item id ${id} not found`,
          });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ItemController;
