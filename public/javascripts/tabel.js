	var unameInput = document.testform.username,
	passInput = document.testform.password,
	ageInput = document.testform.age,
	idInput = document.testform.id;
	var selectArr = [];//批量操作的数组

	function addUser(){//添加用户
		var name = unameInput.value.trim(),
			pass = passInput.value.trim(),
			age = ageInput.value.trim();
		if(typeof name == 'undefined' || name == ''||typeof pass == 'undefined' || pass == ''){
			return;
		}
		ajax({
		  type:"POST",
		  url:"/test/register",
		  dataType:"json",
		  data:{"username":name,"password":pass,"age":age},
		  success:function(data){
		    console.log(data);
		    location.reload();
		  },
		  error:function(){
		    console.log("error")
		  }
		})
	}
	function deleteUser(id){//删除用户
		ajax({
		  type:"POST",
		  url:"/test/deleteUser",
		  dataType:"json",
		  data:{"id":id},
		  success:function(data){
		    console.log(data);
		    location.reload();
		  },
		  error:function(){
		    console.log("error")
		  }
		})
	}
	function deleteMore(){//批量删除
		if(selectArr.length == 0){
			return;
		}
		var ids = selectArr.join('_');
		console.log(ids)
		ajax({
		  type:"POST",
		  url:"/test/deleteMore",
		  dataType:"json",
		  data:{"ids":ids},
		  success:function(data){
		    console.log(data);
		    location.reload();
		  },
		  error:function(){
		    console.log("error")
		  }
		})
	}

	function modifyUser(){//修改用户信息
		var name = unameInput.value.trim(),
			pass = passInput.value.trim(),
			age = ageInput.value.trim(),
			id = idInput.value.trim();
		if(typeof name == 'undefined' || name == ''||typeof pass == 'undefined' || pass == ''){
			return;
		}
		ajax({
		  type:"POST",
		  url:"/test/modifyUser",
		  dataType:"json",
		  data:{"id":id,"username":name,"password":pass,"age":age},
		  success:function(data){
		    console.log(data);
		    location.reload();
		  },
		  error:function(){
		    console.log("error")
		  }
		})
	}

	var close = document.getElementsByClassName('close')[0],
	mask = document.getElementsByClassName('mask')[0],
	mask2 = document.getElementsByClassName('mask2')[0],
	modify = document.getElementsByName("modify")[0],
	addbutton = document.getElementsByName("add")[0],
	show_add = document.getElementById('show_add'),
	show_delete = document.getElementById('show_delete'),
	cancel = document.getElementById('cancel'),
	confirm = document.getElementById('confirm');

	function update(id,name,pass,age){//更新按钮
		show_add.click();
		idInput.value = id;
		unameInput.value = name;
		passInput.value = pass;
		ageInput.value = age;
		modify.style.display = 'block';
		addbutton.style.display = 'none';
	}

	function clearInput(){//清除input
		var inputArr = mask.firstElementChild.getElementsByTagName('input');
		for(var i = 0; i < inputArr.length; i++){
			var type = inputArr[i].getAttribute('type');
			if(type == 'text'){
				inputArr[i].value = '';
			}
		}
	}


	close.onclick = function(){//关闭弹框
		this.parentNode.parentNode.style.display = 'none';
	}
	show_add.onclick = function(){//弹出添加框
		mask.style.display = 'block';
		mask.firstElementChild.setAttribute('class','fbox animated bounceInDown');
		modify.style.display = 'none';
		addbutton.style.display = 'block';
		clearInput();
	}
	show_delete.onclick = function(){
		if(selectArr.length == 0){
			return;
		}
		mask2.style.display = 'block';
		mask2.firstElementChild.setAttribute('class','tip animated bounceInDown');
	}
	cancel.onclick = function(){
		this.parentNode.parentNode.style.display = 'none';
	}
	confirm.onclick = function(){
		deleteMore();
	}

	function selectBox(id,obj){//勾选
		var theclass = obj.getAttribute('class');
		if(theclass.indexOf('checkboxSelect') > -1){
			obj.setAttribute('class','checkbox');//移除
			selectArr.splice(selectArr.indexOf(id),1);
		}else{
			obj.setAttribute('class','checkbox checkboxSelect');//添加
			selectArr.push(id);
		}
	}
