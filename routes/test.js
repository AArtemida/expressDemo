var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../models/mysqlDB.js');
var userSQL = require('../models/usersql.js');
// mysqlDB.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
var client = mysql.createConnection(dbConfig.mysql); // 建立连接

// 响应一个JSON数据
var responseJSON = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({ code:'-200', msg: '操作失败' });
	} else {
		res.json(ret);
	}
};
// 添加用户
router.get('/addUser', function(req, res, next){
	// 从连接池获取连接
	pool.getConnection(function(err, connection) {
	// 获取前台页面传过来的参数
	var param = req.query || req.params;
	// 建立连接 增加一个用户信息
	connection.query(userSQL.insert, [param.username,param.password,param.age], function(err, result) {
		if(result) {
			result = { code: 200, msg:'增加成功' };
		 }
		 // 以json形式，把操作结果返回给前台页面
		 responseJSON(res, result);
		 // 释放连接
		 connection.release();
		});
	});
});
// 查询用户
router.get('/', function(req, res, next){
     var uname = '';
     if(req.session && req.session.userName){
        uname = req.session.userName;
     }
     if(uname != ''){
    	// 从连接池获取连接
    	pool.getConnection(function(err, connection) {

    	connection.query(userSQL.queryAll, [], function(err, result) {
    		if(result) {
    			 // responseJSON(res, result);
    			 res.render('test', { title:'用户管理',uname:uname,data:result});
    		}
    		 connection.release();
    		});
    	});
    }else{
        res.redirect('/login');
    }
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('test', { title: 'Test' });
// });

// 注册接口
router.all('/register', function(req, res, next){
    if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params;
    }
    client.query(userSQL.getUserByName,[param.username],function (err, results){
        if (err){
            throw err
       }else{
                // 数据库不存在 就注册成功
                if (results.length == 0) {
                    // 把新用户插入数据库
                    client.query(userSQL.insert,[param.username,param.password,param.age],function (err, results) {
                    if(err){
                        throw err
                    }else{
                        res.send(JSON.stringify({status:'200',msg:'添加成功!'}));
                        // res.render('test', { title:'Test',data:results});
                    }
                })
                } else{ // 数据库存在就注册失败
                    res.send(JSON.stringify({status:'101',msg:'该用户名已存在'}));
                }
       }
    })
});
// 删除接口
router.all('/deleteUser', function(req, res, next){
	pool.getConnection(function(err, connection) {
	if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params;
    }
	connection.query(userSQL.deleteUser, [param.id], function(err, result) {
		if(err){
            throw err
        }else{
            res.send(JSON.stringify({status:'200',msg:'删除成功!'}));
        }
        connection.release();
	});
	});
});
// 批量删除
router.all('/deleteMore', function(req, res, next){
    pool.getConnection(function(err, connection) {
    if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params;
    }
    if(param.ids){
        param.ids = "\'"+param.ids.replace(/_/g,"','")+"\'";
    }
    connection.query(userSQL.deleteMore, [param.ids], function(err, result) {
        if(err){
            throw err
        }else{
             res.end(JSON.stringify({status:'200',msg:'删除成功!'}));
            // res.render('test', { title:'Test',data:result});
        }
        connection.release();
    });
    });
});
// 更新接口
router.all('/modifyUser', function(req, res, next){
	pool.getConnection(function(err, connection) {
	if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params;
    }
	connection.query(userSQL.updateUser, [param.username,param.password,param.age,param.id], function(err, result) {
		if(err){
            throw err
        }else{
             res.end(JSON.stringify({status:'200',msg:'修改成功!'}));
            // res.render('test', { title:'Test',data:result});
        }
        connection.release();
	});
	});
});

router.all('/logout', function(req, res, next){
  req.session.destroy(function(err) {
    if(err){
      res.send({status: 100, msg: '退出登录失败'});
    }else{
    // req.session.userName = null;
    // res.clearCookie(identityKey);
        res.redirect('/login');
    }
  });
});

module.exports = router;
