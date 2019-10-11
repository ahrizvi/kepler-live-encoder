const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;
const Asset = db.asset;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


exports.index = (req, res) => {
    res.status(200).json({
        "description": "Express Index",
        "Page": "Index"
    });
}

exports.assetCreate = (req, res) => {
    // Save asset to Database
    console.log("Processing asset -> Create");

    Asset.create({
        name: req.body.name,
        input_location: req.body.inloc,
        input_interface: req.body.inintfs,
        output_location: req.body.outloc,
        output_interface: req.body.outintfs,
        output_vid_res: req.body.outvdores,
        output_vid_fps: req.body.outvdofps,
        output_vid_codec: req.body.outvdocodec,
        output_vid_bitrate: req.body.outvdobitrt,
        output_vid_logopath: req.body.outlogopth,
        output_vid_logo_xaxis: req.body.outlogoxax,
        output_vid_logo_yaxis: req.body.outlogoyax,
        output_aud_codec: req.body.outaudcodec,
        output_aud_bitrate: req.body.outaudbitrt,
        output_muxrate: req.body.outmuxrt,
        output_sdt_spname: req.body.outsdtspn,
        output_sdt_sname: req.body.outsdtsn,
        output_nix_procid: 00000,
        active: 0

    }).then(asset => {
        res.status(200).json({
            "Result": "Asset has been created successfully"
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not create Asset",
            "error": err.message
        });
    })
}

exports.assetUpdate = (req, res) => {
    // update asset in Database
    console.log("Processing asset -> update");

    Asset.update({
            name: req.body.name,
            input_location: req.body.inloc,
            input_interface: req.body.inintfs,
            output_location: req.body.outloc,
            output_interface: req.body.outintfs,
            output_vid_res: req.body.outvdores,
            output_vid_fps: req.body.outvdofps,
            output_vid_codec: req.body.outvdocodec,
            output_vid_bitrate: req.body.outvdobitrt,
            output_vid_logopath: req.body.outlogopth,
            output_vid_logo_xaxis: req.body.outlogoxax,
            output_vid_logo_yaxis: req.body.outlogoyax,
            output_aud_codec: req.body.outaudcodec,
            output_aud_bitrate: req.body.outaudbitrt,
            output_muxrate: req.body.outmuxrt,
            output_sdt_spname: req.body.outsdtspn,
            output_sdt_sname: req.body.outsdtsn,
            output_nix_procid: 00000,
            active: 0
        },

        { where: { id: req.params.id } })

    //        console.log(req.body.name)
    //        console.log(req.body.inloc)

    .then(asset => {
        res.status(200).json({
            "Result": "Asset has been updated"
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not update Asset",
            "error": err.message
        });
    })
}

exports.AssetListAll = (req, res) => {
    console.log('assetList');

    Asset.findAll({
        //  where: {id: 1},
        attributes: ['name', 'active']
    }).then(assetlistall => {
        res.status(200).json({
            "description": "Asset List",
            "Result": assetlistall
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not update Asset",
            "error": err.message
        });
    })
}

exports.AssetListOne = (req, res) => {
    console.log('assetListone');

    Asset.findOne({
        where: { id: req.params.id },
        //attributes: []
    }).then(assetlistone => {
        res.status(200).json({
            "description": 'AssetID' + ' ' + assetlistone.id + ' ' + 'parameters',
            "Result": assetlistone
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not update Asset",
            "error": err.message
        });
    })
}
exports.AssetDeleteOne = (req, res) => {
    console.log('assetdeleteone');

    Asset.findByPk({
        where: { id: req.params.id },
        //attributes: []
    }).then(assetdeleteone => {
        res.status(200).json({
            "description": "Asset Delete Status",
            "Result": 'Asset' + ' ' + req.params.id + ' ' + 'Deleted'
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not Delete Asset",
            "error": err.message
        });
    })
}