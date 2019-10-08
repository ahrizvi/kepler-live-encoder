const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

    const controller = require('../controller/usercontroller.js');
    const controller = require('../controller/assetcontroller.js');

    app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], usercontroller.signup);

    app.post('/api/auth/signin', usercontroller.signin);

    app.get('/api/test/user', [authJwt.verifyToken], usercontroller.userContent);

    app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], usercontroller.managementBoard);

    app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], usercontroller.adminBoard);

    app.get('/api/index', assetcontroller.index);

    //app.get('/api/userslist', [authJwt.verifyToken], controller.userslist); 

}