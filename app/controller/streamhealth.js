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

                var assetid = assetlistone.id
                var assetname = assetlistone.name
                var procid = assetlistone.output_nix_procid
                var inloc = assetlistone.input_location
                console.log(procid);

                var ps = require('ps-node');
                ps.lookup({ pid: 123 },
                    function(err, resultList) {
                        if (err) {
                            throw new Error(err);
                        }

                        resultList.forEach(function(process) {
                            if (process) {

                                //   console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);
                                sys_proc_cmd = process.command
                                sys_proc_args = process.arguments


                                db_input_loc = "udp://239.195.4.3:5000/"
                                db_proc_cmd = "ffmpeg"

                                var chk1 = sys_proc_args.includes(db_input_loc)
                                var chk2 = sys_proc_cmd.includes(db_proc_cmd)
                                var chk3 = chk1 + ' ' + chk2
                                console.log(chk3);

                            } else {
                                console.log('No such process found!');
                            }
                        });
                    });

            })

        })

        // })

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