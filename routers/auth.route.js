const express = require('express');
const bcrypt = require('bcryptjs')


const userModel = require('../models/user.model');
const validate = require('../middlewares/validate.mdw');
const schema = require('../schemas/user.json');

const router = express.Router();

module.exports = router;

const opts = {
    expiresIn: 10*60
}

const accessToken = jwt.sign(payload,'SECRECT_KEY',opts)

router.post('/', validate(schema), async function (req, res) {
    const user = req.body;
    user.password = bcrypt.hash(req.body.password);
    const result = await userModel.add(user);
    delete user.password;
    user.user_id = result[0];
    res.json(user);
})

