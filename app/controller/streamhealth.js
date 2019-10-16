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
        attributes: ['name', 'input_location', 'active']

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

exports.AssetStatusAll = (req, res) => {

    Asset.findAll({
        where: { active: 1 }
    }).map(el => el.get('id')).then(assetlistall => {

        activeAssetArr = assetlistall
        console.log(activeAssetArr);

        activeAssetArr.forEach(element => {

            console.log(element)

            Asset.findOne({
                where: { id: element },
                attributes: ['name', 'input_location', 'active']
            }).then(assetlistone => {
                console.log(assetlistone.name);
                console.log(assetlistone.input_location)
                console.log(assetlistone.active)

            })

        })

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