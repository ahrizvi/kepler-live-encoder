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
        //  var obj = {};
        //  obj["Error" = `${data}`]
        res.status(400).json({
            "description": "stderr",
            "Result": `${data}`
        });
    })
}

exports.StartStream = (req, res) => {
    console.log('startstream');

    Asset.findOne({
        where: { id: req.params.id },
        //attributes: []
    }).then(startstream => {
        if (!startstream) {
            return res.status(404).json({ "error": "Can Not Start Stream, Invalid Asset ID" });
        }
        var streamIsActive = startstream.active
        if (streamIsActive !== '0') {
            return res.status(400).json({ "error": "Stream is already Live" });
        }

        const input = "udp://239.195.4.3:5000/"
        const output = "udp://10.100.40.15:7777/"

        const { spawn } = require('child_process');
        const ffmpeg = spawn('ffmpeg', [
            "-loglevel", "error",
            "-re",
            "-i", input,
            "-vcodec", "h264",
            "-r", "25",
            "-flags", "cgop+ilme",
            "-sc_threshold", "1000000000",
            "-b:v", "1.7M",
            "-minrate:v", "1.5M",
            "-maxrate:v", "2.5M",
            "-bufsize:v", "5M",
            "-acodec", "aac",
            "-ac", "2",
            "-b:a", "64k",
            "-f", "mpegts", output
        ], {
            detached: true
        });
        var procid = ffmpeg.pid
        console.log(procid)
        res.status(200).json({
            "description": "Asset has been started successfully",
            "Result": 'Asset with PID' + ' ' + procid + ' ' + 'has been started'
        });

        startstream.update({
                output_nix_procid: procid,
                active: 1
            },

            { where: { id: req.params.id } })


        var dummy = 'dummy1'
        console.log(dummy);

        ffmpeg.stderr.on('data', (err) => {
            console.log('err:', new String(err))
        });

    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });

}

exports.StopStream = (req, res) => {
    console.log('stopstream');

    Asset.findOne({
        where: { id: req.params.id },
        //attributes: []
    }).then(stopstream => {
        if (!stopstream) {
            return res.status(404).json({ "error": "Can Not Stop Stream, Invalid Asset ID" });
        }
        var streamIsActive = startstream.active
        if (streamIsActive !== '1') {
            return res.status(400).json({ "error": "Stream is already in 'Stop' State" });
        }

        var procid = stopstream.output_nix_procid
        const { spawn } = require('child_process');
        const ffmpeg = spawn('kill', ["-SIGTERM", procid], { detached: false });

        stopstream.update({
                output_nix_procid: 0,
                active: 0
            },

            { where: { id: req.params.id } })

        var dummy = 'dummy1'
        console.log(dummy);

        ffmpeg.stderr.on('data', (err) => {
            console.log('err:', new String(err))
            var errstr = err
            var ifpidNotExists = errstr.includes("No such process");
            if (ifpidNotExists == 'true') {

                return res.status(200).json({
                    "description": "Encoding Process Does'nt exist",
                    "Result": 'Asset with PID' + ' ' + procid + ' ' + 'does not exist'
                });
            }
        });

        res.status(200).json({
            "description": "Asset has been terminated successfully",
            "Result": 'Asset with PID' + ' ' + procid + ' ' + 'has been stopped'
        });

    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });

}