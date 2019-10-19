const db = require('../config/db.config.js');
const config = require('../config/config.js');
const Asset = db.asset;

const Op = db.Sequelize.Op;

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
        input_location: req.body.iloc,
        input_interface: req.body.iintfs,
        output_location: req.body.oloc,
        output_interface: req.body.ointfs,
        output_vid_res: req.body.ovdores,
        output_vid_fps: req.body.ovdofps,
        output_vid_codec: req.body.ovdocodec,
        output_vid_bitrate: req.body.ovdobitrt,
        output_vid_minrate: req.body.ovdominrt,
        output_vid_maxrate: req.body.ovdomaxrt,
        output_vid_buffer: req.body.ovdobufr,
        output_vid_logopath: req.body.ologopth,
        output_vid_logo_xaxis: req.body.ologoxax,
        output_vid_logo_yaxis: req.body.ologoyax,
        output_aud_codec: req.body.oaudcodec,
        output_aud_bitrate: req.body.oaudbitrt,
        output_muxrate: req.body.omuxrt,
        output_sdt_spname: req.body.osdtspn,
        output_sdt_sname: req.body.osdtsn,
        output_nix_procid: 00000,
        active: 0

    }).then(asset => {
        res.status(200).json({
            "Result": "Asset has been created successfully"
        });
    }).catch(err => {
        res.status(400).json({
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
            input_location: req.body.iloc,
            input_interface: req.body.iintfs,
            output_location: req.body.oloc,
            output_interface: req.body.ointfs,
            output_vid_res: req.body.ovdores,
            output_vid_fps: req.body.ovdofps,
            output_vid_codec: req.body.ovdocodec,
            output_vid_bitrate: req.body.ovdobitrt,
            output_vid_minrate: req.body.ovdominrt,
            output_vid_maxrate: req.body.ovdomaxrt,
            output_vid_buffer: req.body.ovdobufr,
            output_vid_logopath: req.body.ologopth,
            output_vid_logo_xaxis: req.body.ologoxax,
            output_vid_logo_yaxis: req.body.ologoyax,
            output_aud_codec: req.body.oaudcodec,
            output_aud_bitrate: req.body.oaudbitrt,
            output_muxrate: req.body.omuxrt,
            output_sdt_spname: req.body.osdtspn,
            output_sdt_sname: req.body.osdtsn,
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
        res.status(400).json({
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
        res.status(400).json({
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
        res.status(400).json({
            "description": "Can not get Asset parameters",
            "error": err.message
        });
    })
}

exports.AssetDeleteOne = (req, res) => {
    // console.log('assetdeleteone');

    Asset.findOne({
        where: { id: req.params.id },
        //attributes: []
    }).then(assetdeleteone => {
        if (!assetdeleteone) {
            return res.status(404).json({ "error": "Asset not found or already deleted" });
        }
        Asset.destroy({
            where: {
                id: assetdeleteone.id
            }
        });
        res.status(200).json({
            "description": "Asset has been deleted successfully",
            "Result": 'Asset with ID' + ' ' + req.params.id + ' ' + 'has been deleted'
        });

    }).catch(err => {
        res.status(500).json({
            "description": "Asset can not be deleted due to an unknown error",
            "error": err.message
        });
    })
}