window.onload = function(){
	var flag =false;
	$(".field").eq(0).blur(function(){
		var reg1 = /^1[34589]\d{9}$/;
		var reg2 = /^\w+@\w+(\.\w+)+$/;
		var val = $(this).val();
		if(reg1.test(val) || reg2.test(val)){
			flag = true;
			$(".error").eq(0).html("√");
		}else{
			flag = false;
			$(".error").eq(0).html("有误");
		}
	})
	$(".field").eq(1).blur(function(){
		var reg = /^\w{8,}$/;
		var val = $(this).val();
		if(reg.test(val)){
			flag = true;
			$(".error").eq(1).html("√");
		}else{
			flag = false;
			$(".error").eq(1).html("有误");
		}
	})
	var arr = [];
	$(".yz").click(function(){
		if(flag){
			var obj = {
				"uname" : $(".field").eq(0).val(),
				"pwd" : $(".field").eq(1).val()
			}
			console.log(obj);
			console.log(document.cookie);
			var userInfo = getCookie("info");
			if(userInfo.length!=0){
				for(var i=0;i<userInfo.length;i++){
					if(userInfo[i].uname == obj.uname){
						alert("该用户名已存在");
						return;
					}
				}
			}
			
			arr = userInfo;
			arr.push(obj);
			setCookie("info",JSON.stringify(arr));
			alert("注册成功");
			location.href = "login.html";
		}
		
	})
}
	

