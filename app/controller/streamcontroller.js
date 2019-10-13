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
    var procid = req.body.procid
     if (!procid === '1') {
         console.log(ffmpeg.pid)}
   
    
    var input = "udp://239.195.4.3:5000/"
    var output = "udp://10.100.40.15:7777/"
    const { spawn } = require('child_process');
	
    const ffmpeg = spawn('ffmpeg', [
        "-loglevel", "error",
	"-re",
        "-i", input,
        "-vcodec","h264",
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
    detached: true });
     var procid = req.body.procid
     console.log(procid)
	
	// if (procid === '1') {
  	// console.log(ffmpeg.pid)}else{console.log('procid != 1')};
	
	res.status(200).json({
            "description": "Param 1",
            "Result": "Channel has been started"
        });

ffmpeg.on('exit', (statusCode) => {
  if (!statusCode === 0) {
     console.log('Process Crashed')
}
})

ffmpeg
  .stderr
  .on('data', (err) => {
    console.log('err:', new String(err))
  })	
	
}
