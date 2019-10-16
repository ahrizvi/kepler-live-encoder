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
	    
	    // console.log(procid);

 
	     const { spawn } = require('child_process');
	     const { exec } = require('child_process');
		
	     const p1 = spawn('ps', ['-ef']);
	     //const p2 = exec("awk '/'ffmpeg'/ {print $2, $11, $16 }", ); 
		

	     const p2 = exec("awk '/'ffmpeg'/ {print $2, $11, $16 }", {stdio: [p1.stdout, 'pipe', process.error]})
	    
		// const p2 = spawn('grep', ['ffmpeg']);
		
	     p2.stdout.on('data', (d) => {
  	     console.log(d.toString())
			})
//	p1.on('exit', (code, signal) => console.log('p1 done', code, signal))
//	p2.on('exit', (code, signal) => console.log('p2 done', code, signal))

	
	    // grep.stdout.pipe('data', (data) => {
            // var resultsArr = data.split('\n')
           //  console.log(resultsArr);
           //  console.log(procid);

		  })

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
}
