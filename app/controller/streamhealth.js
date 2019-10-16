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
        activeAssetArr.forEach(element => {


            Asset.findOne({
                where: { id: element },
                attributes: ['id', 'name', 'input_location', 'output_nix_procid']
            }).then(assetlistone => {

                var dbassetid = assetlistone.id
                var dbassetname = assetlistone.name
                var dbprocid = assetlistone.output_nix_procid
                var dbinloc = assetlistone.input_location
                console.log(procid);

                var ps = require('ps-node');
                ps.lookup({ pid: dbprocid },
                    function(err, resultList) {
                        if (err) {
                            throw new Error(err);
                        }

                        resultList.forEach(function(process) {
                            if (process) {

                                //   console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);

                                sys_proc_cmd = process.command
                                sys_proc_args = process.arguments

                                var chk1 = process.pid

                                if (!chk1) {
                                    return res.status(404).send('Process Live Check 1 failed. No Process found');
                                }

                                var chk2 = sys_proc_args.includes(dbinloc)
                                if (chk2 != true) {
                                    return res.status(404).send('Process Live Check 2 failed');
                                }

                                var chk3 = sys_proc_cmd.includes(FFMPEG)

                                if (chk3 != true) {
                                    return res.status(404).send('Process Live Check 3 failed. Process no more belongs to FFMPEG');
                                }
                            }

                        });
                    });

            })

        })

        res.status(200).json({
            "description": "Asset List",
            "Result": "assetlistall"
        });
        // }


        //	.catch(err => {
        //        res.status(400).json({
        //            "description": "Can not update Asset",
        //           "error": err.message
        //       });
        //  })
    })

}