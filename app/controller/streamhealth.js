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
                console.log(dbprocid);


                var ps = require('ps-node');

                // A simple pid lookup
                ps.lookup({ pid: dbprocid }, function(err, resultList) {
                    if (err) {
                        throw new Error(err);
                    }

                    var process = resultList[0];
                    console.log(dbinloc);

                    if (process) {

                        console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);
                        sys_proc_cmd = process.command
                        sys_proc_args = process.arguments

                        console.log(dbinloc)

                        db_input_loc = [dbinloc, 'CHK1']
                        db_proc_cmd = [dbprocid, 'CHK2']

                        var chk1 = sys_proc_args.includes(db_input_loc)
                        var chk2 = sys_proc_cmd.includes(db_proc_cmd)
                        console.log(chk1, chk2);
                        var statchecker = [chk1, chk2]
                        var groundtruth = [true, true]

                        console.log(statchecker);
                        console.log(groundtruth);

                        if (statchecker != groundtruth) {
                            assetlistone.update({
                                    output_nix_procid: 0,
                                    active: 0
                                },

                                { where: { id: assetlistone.id } })
                        }

                    } else {
                        console.log('No such process found!');
                    }
                });


            })


            res.status(200).json({
                "description": "Asset List",
                "Result": "assetlistall"
            });
        })
    })
}