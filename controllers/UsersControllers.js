const bcrypt = require("bcrypt");
const user = require("../models/user");
const { Op } = require("sequelize");

class UsersControllers {
  // [GET] /users ?search?page?limit
  async getAll(req, res) {
    try {
      const search = req.query.q;
      let page = 1;
      const limit = req.query.limit;
      page = (req.query.page - 1) * limit;
      if (search && limit) {
        const { count, rows } = await user.findAndCountAll({
          limit: parseInt(limit),
          where: {
            account: { [Op.substring]: `${search}` },
          },
        });
       return res.json({ total: count, data: rows });
      }
      if (page && limit) {
        const { count, rows } = await user.findAndCountAll({
          offset: parseInt(page),
          limit: parseInt(limit),
        });
        return res.json({ total: count, data: rows });
      }
      if (search) {
        const { count, rows } = await user.findAndCountAll({
          offset: parseInt(page),
          limit: parseInt(limit),
          where: {
            account: { [Op.substring]: `${search}` },
          },
        });
        return  res.json({ total: count, data: rows });
      }
      if (limit) {
        const { count, rows } = await user.findAndCountAll({
          limit: parseInt(limit),
        });
        return  res.json({ total: count, data: rows });
      } else {
        const { count, rows } = await user.findAndCountAll();
        return res.json({ total: count, data: rows });
      }
    } catch (err) {
      console.log("lỗi");
    }
  }
  // [GET] /users
  async get(req, res) {
    try {
      const users = await user.findAll({
        where: {
          id: req.params.id,
        },
      });
      res.json(users);
    } catch (err) {
      console.log("lỗi");
    }
  }
  // [DELETE] /users/id
  async delete(req, res) {
    try {
      await user.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send("succesfully !!!");
    } catch (err) {
      console.log("lỗi");
    }
  }

  // [PUT] /users/id
  async update(req, res) {
    const checkAccount = await user.findOne({
      where: {
        account: req.body.account,
      },
    });
    if (checkAccount)
      return res.status(400).json({ msg: "tài khoản đã tồn tại" });
    try {
      await user.update(
        {
          account: req.body.account,
          password: req.body.password,
          gmail: req.body.gmail,
          role: req.body.role,
          createdAt: null,
          updatedAt: { [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000) },
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.send("succesfully !!!");
    } catch (err) {
      console.log("lỗi");
    }
  }

  // [POST] /register
  async register(req, res) {
    const { account, password, gmail, confirmPassword } = req.body;
    const checkAccount = await user.findOne({
      where: {
        account: account,
      },
    });
    if (checkAccount)
      return res.status(400).json({ msg: "tài khoản đã tồn tại" });
    if (password != confirmPassword)
      return res
        .status(400)
        .json({ msg: "xác nhận tài khoản không trùng khớp" });
    const satl = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, satl);
    try {
      await user.create({
        account: account,
        gmail: gmail,
        password: hashPassword,
        role: 1,
        createdAt: null,
        updatedAt: { [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000) },
      });
      res.send({ msg: "succesfully !!!" });
    } catch (err) {
      console.log(err);
    }
  }
  //[POST] /login
  async login(req, res){
      try{
        const userCurrent = await user.findAll({
          where : {
            account : req.body.account
        }})
        const match = await bcrypt.compare(req.body.password, userCurrent[0].password)
        if(!match) return res.status(400).json({msg:"Sai Mật Khẩu"})
        const userID = userCurrent[0].id
        const account = userCurrent[0].account
        const gmail = userCurrent[0].gmail
        const role = userCurrent[0].role
        res.json({userID, account,gmail,role })
      }catch(err) {
        res.status(404).json({msg:"account không tồn tại"})
      }
    }
}

module.exports = new UsersControllers();
