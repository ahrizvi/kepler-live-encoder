const db = require('../config/db.config.js');
const config = require('../config/config.js');
const ps = require('ps-node');
const cron = require('node-cron');
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
                    // console.log(dbprocid);

                // A simple pid lookup
                ps.lookup({ pid: dbprocid }, function(err, resultList) {
                    if (err) {
                        throw new Error(err);
                    }
                    var process = resultList[0];
                    //  console.log(dbinloc);
                    if (process) {
                        // console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);
                        sys_proc_pid = process.pid
                        sys_proc_args = process.arguments
                            //	console.log(sys_proc_args)
                            //	console.log(dbinloc)
                        db_input_loc = dbinloc
                        db_procid = dbprocid
                            //	console.log(db_input_loc);
                            //	console.log(db_procid);
                        var chk1 = sys_proc_args.includes(db_input_loc)
                            //  console.log(chk1);
                        var chk2 = sys_proc_pid.includes(db_procid)
                            //  console.log(chk2);
                            //  console.log(chk1, chk2);
                        var arr1 = [chk1, chk2]
                        var arr2 = [true, true]
                            // console.log(arr1);
                            // console.log(arr2);
                        var arraysMatch = function(arr1, arr2) {
                            // Check if the arrays are the same length
                            if (arr1.length !== arr2.length) return false;
                            // Check if all items exist and are in the same order
                            for (var i = 0; i < arr1.length; i++) {
                                if (arr1[i] !== arr2[i])
                                    return false;
                            }
                            // Otherwise, return true
                            return true;
                        }

                        arrMatchResult = arraysMatch(arr1, arr2)
                        if (arrMatchResult != true) {

                            assetlistone.update({
                                output_nix_procid: 0,
                                active: 0
                            }, {
                                where: { id: dbassetid }
                            });
                        }

                        console.log(arrMatchResult);

                    } else {
                        console.log('No such process found!');

                        assetlistone.update({
                            output_nix_procid: 0,
                            active: 0
                        }, {
                            where: { id: dbassetid }
                        });
                    }
                });
                res.status(200).json({
                    "description": "Asset List",
                    "Result": "assetlistall"
                });

            })
        })
    })
}
