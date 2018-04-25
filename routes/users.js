var express = require('express');
var URL = require('url');
var User = require('./user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});
router.get('/getUserInfo', function(req, res, next) {
	var user = new User();
	var params = URL.parse(req.url,true).query;//获取url参数 依赖于url模块 使用前需要使用  require('url')

	if(params.id == '1'){
		user.name = 'lign';
		user.age = '1';
		user.city = 'Beijing';
	}else{
		user.name = 'SPTING';
		user.age = '2';
		user.city = '杭州';
	}
	var response = {status:1,data:user};
	res.send(JSON.stringify(response));
  // res.send('respond with a resource');
});

module.exports = router;
