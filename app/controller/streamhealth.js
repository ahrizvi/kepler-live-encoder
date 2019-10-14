const db = require('../config/db.config.js');
const config = require('../config/config.js');
const Asset = db.asset;

const Op = db.Sequelize.Op;

exports.index = (req, res) => {
    res.status(200).json({
        "description": "Stream Index",
        "Page": "Index"
    });
}

exports.AssetStatusAll = (req, res) => {
        console.log('assetstatusall');

        Asset.findAll({
                //  where: {id: 1},
                attributes: ['name', 'active', =

                }).then(assetlistall => {
                res.status(200).json({
                    "description": "Asset List",
                    "Result": assetlistall
                });
            }).catch(err => {
                res.status(400).json({
                    "description": "Can not update Asset",
                    "error": err.message
                });
            })
        }