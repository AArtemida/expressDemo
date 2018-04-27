var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../models/mysqlDB.js');
var userSQL = require('../models/usersql.js');
// mysqlDB.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

/* GET login listing. */
router.get('/', function(req, res, next) {
	var uname = '';
    if(req.session && req.session.userName){
        uname = req.session.userName;
     }
    if(uname == ''){
		res.render('login', { title:'登录'});
	}else{
		 res.redirect('/test');
	}
});

// 登录
router.all('/selectUser', function(req, res, next){//all接口，get页面
	pool.getConnection(function(err, connection) {
	if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params;
    }
	connection.query(userSQL.selectUser, [param.username,param.password], function(err, result) {
		if(err){
            throw err
        }else{
        	if(result.length > 0){
        		connection.query(userSQL.selectAdmin, [param.username,param.password], function(err, result) {
					if(err){
			            throw err
			        }else{
			        	if(result.length > 0){
			            	req.session.userName = param.username;
			            	res.send(JSON.stringify({status:'200',msg:'登录成功！'}));
			            	// res.redirect('/test');
			        	}else{
			        		res.send(JSON.stringify({status:'101',msg:'该账号没有管理员权限！'}));
			        	}
			        }
				});
        	}else{
        		res.send(JSON.stringify({status:'100',msg:'账号或密码错误！'}));
        	}
        }
        connection.release();
		});
	});
});

module.exports = router;