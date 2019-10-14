const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

    const usercontroller = require('../controller/usercontroller.js');
    const assetcontroller = require('../controller/assetcontroller.js');
    const streamcontroller = require('../controller/streamcontroller.js');
    const streamhealthcontroller = require('../controller/streamhealth.js');

    app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], usercontroller.signup);

    app.post('/api/auth/signin', usercontroller.signin);

    app.get('/api/test/user', [authJwt.verifyToken], usercontroller.userContent);

    app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], usercontroller.managementBoard);

    app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], usercontroller.adminBoard);

    app.get('/api/index', assetcontroller.index);

    //    app.post('/api/assetcreate',[authJwt.verifyToken, authJwt.isAdmin],assetcontroller.assetcreate);

    app.post('/api/assetcreate', assetcontroller.assetCreate);

    app.post('/api/assetupdate/:id', assetcontroller.assetUpdate);

    app.get('/api/assetlist/', assetcontroller.AssetListAll);

    app.get('/api/asset/:id/', assetcontroller.AssetListOne);

    app.delete('/api/assetdelete/:id/', assetcontroller.AssetDeleteOne);

    app.get('/api/stream/index', streamcontroller.index);

    app.get('/api/stream/listdir', streamcontroller.ListDir);

    app.post('/api/startstream/:id/', streamcontroller.StartStream);

    app.post('/api/stopstream/:id/', streamcontroller.StopStream);

    app.get('/api/streamhealth', streamhealthcontroller.index);
}
/