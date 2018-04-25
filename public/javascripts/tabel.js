
	function addUser(){
		var name = document.testform.username.value,
			pass = document.testform.password.value,
			age = document.testform.age.value;
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
	function deleteUser(id){
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

	function modifyUser(id){
		var name = document.testform.username.value,
			pass = document.testform.password.value,
			age = document.testform.age.value,
			id = document.testform.id.value;
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

	function update(id,name,pass,age){
		document.testform.id.value = id;
		document.testform.username.value = name;
		document.testform.password.value = pass;
		document.testform.age.value = age;
		var modify = document.getElementsByName("modify");
		var addbutton = document.getElementsByName("add");
		modify[0].style.display = 'block';
		addbutton[0].style.display = 'none';
	}
