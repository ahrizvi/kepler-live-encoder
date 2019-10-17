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
        const name = startstream.name
        const input = startstream.input_location
        const vcodec = startstream.output_vid_codec
        const fps = startstream.output_vid_fps
        const vidsize = startstream.output_vid_res
        const vbitrt = startstream.output_vid_bitrate
        const vminrt = startstream.output_vid_minrate
        const vmaxrt = startstream.output_vid_maxrate
        const vbuffer = startstream.output_vid_buffer
        const abitrt = startstream.output_aud_bitrate
        const acodec = startstream.output_aud_codec
        const output = startstream.output_location

	console.log(name);
	console.log(input);
	console.log(vcodec);
	console.log(fps);
	console.log(vidsize);
	console.log(vbitrt);
	console.log(vminrt);
	console.log(vmaxrt);
	console.log(vbuffer);
	console.log(abitrt);
	console.log(acodec);
	console.log(output);



        const { spawn } = require('child_process');
        const ffmpeg = spawn('ffmpeg', [
        //    "-loglevel", "error",
            "-re",
            "-i", input,
            "-vcodec", vcodec,
            "-r", fps,
            "-flags", "cgop+ilme",
            "-sc_threshold", "1000000000",
            "-metadata", 'comment=' + `${name}`,
            "-b:v", vbitrt,
            "-minrate:v", vminrt,
            "-maxrate:v", vmaxrt,
            "-bufsize:v", vbuffer,
            "-acodec", acodec,
            "-ac", "2",
            "-b:a", abitrt,
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
        var streamIsActive = stopstream.active
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
