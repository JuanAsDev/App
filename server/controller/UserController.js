const { User } = require("../models");

class UserController {
  static async getUsers(req, res) {
    try {
      let users = await User.findAll();

      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async register(req, res) {
    try {
      const { username, email, password, role } = req.body;
      let image = "https://via.placeholder.com/100";

      let result = await User.create({
        username,
        email,
        password,
        role,
        image,
      });

      res.status(201).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let result = await User.findOne({
        where: { email },
      });

      if (result) {
        if (result.password === password) {
          res.status(200).json(result);
        } else {
          res.status(401).json({
            message: "Invalid password",
          });
        }
      } else {
        res.status(404).json({
          message: "Email not found",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      let id = +req.params.id;

      let result = await User.destroy({
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
      const { username, email, password, role, image } = req.body;

      let result = await User.update(
        {
          username,
          email,
          password,
          role,
          image,
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

      let result = await User.findByPk(id);

      result
        ? res.status(200).json(result)
        : res.status(404).json({
            message: `User id ${id} not found`,
          });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = UserController;
