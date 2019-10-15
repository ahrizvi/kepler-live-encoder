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

exports.AssetStatusOne = (req, res) => {
    console.log('assetstatusone');

    Asset.findOne({
        where: { id: req.params.id },
<<<<<<< HEAD
        attributes: ['name', 'input_location', 'active']
=======
	attributes: ['name', 'input_location', 'active']
>>>>>>> 3d35d20659c3ac5f266980bcc55c94bc2929e1b8

    }).then(assetlistone => {
        res.status(200).json({
            "description": "Asset List",
            "Result": assetlistone
        });
    }).catch(err => {
        res.status(400).json({
            "description": "Can not update Asset",
            "error": err.message
        });
    })
}
<<<<<<< HEAD

exports.AssetStatusAll = (req, res) => {
    console.log('assetstatusall');

    Asset.findAll({
        //where: { id: req.params.id },
        attributes: ['name', 'input_location', 'active']

    }).then(assestatusall => {
        var dbstatus = [];

        for (var i = 0; i < assetstatusall.length; i++) {
            dbstatus.push(assetlistone.name)
        }
        res.status(200).json({
            "description": "Asset Name List",
            "Result": dbstatus
        });
    }).catch(err => {
        res.status(400).json({
            "description": "Can not update Asset",
            "error": err.message
        });
    })
}
=======
>>>>>>> 3d35d20659c3ac5f266980bcc55c94bc2929e1b8
