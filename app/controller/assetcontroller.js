const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


exports.index = (req, res) => {

    res.status(200).json({
        "description": "Express Index",
        "Page": "Index"
    });
}