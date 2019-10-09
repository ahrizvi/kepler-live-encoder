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

exports.assetcreate = (req, res) => {
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
            "Result": "Asset has been created successfuly"
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not create Asset",
            "error": err.message
        });
    })
}

exports.assetupdate = (req, res) => {
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
