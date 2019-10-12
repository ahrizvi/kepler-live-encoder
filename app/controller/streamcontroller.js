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

exports.StreamStart = (req, res) => {
    console.log('streamstart');
    let _url = req.query.url;
    console.log(_url);
    if (_url) {

        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Connection': 'Keep-Alive',
            'Content-Type': 'video/mp4'
        });

        // transcode rtsp input from ip-cam to mp4 file format (video: h.264 | audio: aac)
        let ffmpeg = child_process.spawn("ffmpeg", [
            "-probesize", "2147483647",
            "-analyzeduration", "2147483647",
            "-i", _url,
            "-vcodec", "copy",
            "-f", "mp4",
            "-movflags", "frag_keyframe+empty_moov+faststart",
            "-frag_duration", "3600",
            "pipe:1"
        ]);

        // redirect transcoded ip-cam stream to http response
        ffmpeg.stdout.pipe(res);

        // error logging
        ffmpeg.stderr.setEncoding('utf8');
        ffmpeg.stderr.on('data', (data) => {
            console.log(data);
        });
    } else {
        res.end();
    }
}