const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

    const usercontroller = require('../controller/usercontroller.js');
    const assetcontroller = require('../controller/assetcontroller.js');
    const streamcontroller = require('../controller/streamcontroller.js');
    const streamhealthcontroller = require('../controller/streamhealth.js');

    app.post('/api/v1/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], usercontroller.signup);

    app.post('/api/v1/auth/signin', usercontroller.signin);

    app.get('/api/v1/test/user', [authJwt.verifyToken], usercontroller.userContent);

    app.get('/api/v1/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], usercontroller.managementBoard);

    app.get('/api/v1/test/admin', [authJwt.verifyToken, authJwt.isAdmin], usercontroller.adminBoard);

    app.get('/api/v1/index', assetcontroller.index);

    //    app.post('/api/assetcreate',[authJwt.verifyToken, authJwt.isAdmin],assetcontroller.assetcreate);

    app.post('/api/v1/asset/create', assetcontroller.assetCreate);

    app.post('/api/v1/asset/update/:id', assetcontroller.assetUpdate);

    app.get('/api/v1/asset/list/all/', assetcontroller.AssetListAll);

    app.get('/api/v1/asset/list/:id/', assetcontroller.AssetListOne);

    app.delete('/api/v1/asset/delete/:id/', assetcontroller.AssetDeleteOne);

    app.get('/api/v1/stream/index', streamcontroller.index);

    app.get('/api/v1/stream/listdir', streamcontroller.ListDir);

    app.post('/api/v1/stream/start/:id/', streamcontroller.StartStream);

    app.post('/api/v1/stream/stop/:id/', streamcontroller.StopStream);

    app.get('/api/v1/stream/status/index', streamhealthcontroller.index);

    app.get('/api/v1/stream/status/:id', streamhealthcontroller.AssetStatusOne);

    app.get('/api/v1/stream/statusall', streamhealthcontroller.AssetStatusAll);

}
