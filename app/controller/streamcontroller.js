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

exports.ListDir = (req, res) => {
    console.log('ListDir');
    const { exec } = require('child_process');
    const child = exec("ls");

    child.stdout.on('data', (data) => {
        var resultsArr = data.split('\n')
        var obj_list = [];

        for (var i = 0; i < resultsArr.length; i++) {
            obj_list.push('Object ' + i);
        }

        var obj = {};
        for (var i = 0; i < obj_list.length; i++)

        {
            obj[obj_list[i]] = resultsArr[i];
        }
        console.log(obj);

        res.status(200).json({
            "description": "stdout",
            "Result": obj
        });
    })

    child.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
        var obj = {};
        obj["Error" = `${data}`]
        res.status(400).json({
            "description": "stderr",
            "Result": obj
        });
    })
}