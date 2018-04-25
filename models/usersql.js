//增删改查sql语句
var UserSQL = {
	insert:'INSERT INTO test(userName,password,age) VALUES(?,?,?)',
	queryAll:'SELECT * FROM test',
	getUserByName:'SELECT * FROM test WHERE userName = ? ',
	getUserById:'SELECT * FROM test WHERE id = ? ',
	deleteUser:'DELETE FROM test WHERE id = ? ',
	updateUser:'UPDATE test SET userName = ?,password = ?,age = ? WHERE id = ? ',
};
module.exports = UserSQL;