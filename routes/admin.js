const Router = require("express").Router();

Router.post("/", async (req, res) => {
  try {
    const { email, password, secret } = req.body;
    const { EMAIL, PASSWORD, SECRET_CODE } = process.env;
    if (email !== EMAIL && password !== PASSWORD && secret !== SECRET_CODE) {
      res.send("Please Check Data");
      return;
    }
    res.json({ secret: secret });
  } catch (err) {
    res.send({ msg: err });
  }
});

Router.post("/check", async (req, res) => {
  try {
    const { SECRET_CODE } = process.env;
    const { secret } = req.body;

    if (secret === SECRET_CODE) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    res.send(false);
  }
});

module.exports = Router;
