var submit = document.getElementById('submit');

submit.onclick = function(){
	var uname = document.loginform.username.value,
	pass = document.loginform.password.value;
	login(uname,pass);
}

function login(name,pass){
	console.log(name,pass)
	ajax({
		  type:"POST",
		  url:"/login/selectUser",
		  dataType:"json",
		  data:{"username":name,"password":pass},
		  success:function(data){
		    console.log(data);
		    if(data){
		    	if(data.status == 200){
		    		window.location.href = '/test'
		    	}else if(data.msg){
		    		alert(data.msg);
		    	}
			}
		  },
		  error:function(error){
		    console.log('error');
		  }
	})
}