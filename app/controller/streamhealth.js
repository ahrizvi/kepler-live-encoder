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

	const {exec} = require('child_process');
        const child = exec("ls")
           
	     
         child.stdout.on('data', (data) => {
         var resultsArr = data.split('\n')
         console.log(resultsArr);
         }).then(corefunction => { 

 	 Asset.findAll({
  	  	where: { active: 1 }
 
   	 }).map(el => el.get('id')).then(assetlistall => {

        	activeAssetArr = assetlistall
		activeAssetArr.forEach(element => {


           Asset.findOne({
           where: { id: element },
           attributes: ['id', 'name', 'input_location', 'output_nix_procid']
            }).then(assetlistone => {
             console.log(assetlistone.id);
	     console.log(assetlistone.name);
//           console.log(assetlistone.input_location)
//                console.log(assetlistone.output_nix_procid)

            						 })

	   						})

        res.status(200).json({
            "description": "Asset List",
            "Result": "assetlistall"
        });
 })

	})
//	.catch(err => {
//        res.status(400).json({
//            "description": "Can not update Asset",
 //           "error": err.message
 //       });
  //  })
}
