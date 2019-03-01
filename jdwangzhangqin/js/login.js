window.onload = function(){
	$(".login-tab").click(function(){
		$(this).find("a").addClass("checked").end().siblings().find("a").removeClass("checked");
		console.log($(".active").eq($(this).index()))
	})
	$(".login-tab-r").click(function(){
		$(".login-box").css({display:"block",visibility:"visible"});
		$(".qrcode-login").css({display:"none",visibility:"hidden"});
	})
	$(".login-tab-l").click(function(){
		$(".qrcode-login").css({display:"block",visibility:"visible"});
		$(".login-box").css({display:"none",visibility:"hidden"});
	})
	$(".code-img").mouseenter(function(){
		$(this).stop().animate({left:0},500).next().show();
	})
	$(".code-img").mouseleave(function(){
		$(this).stop().animate({left:64},500).next().hide();
	})
	console.log(document.cookie)
	$(".login-btn").click(function(){
		var flag = true;
		var uname = $("#loginname").val();
		var pwd = $("#nloginpwd").val();
		var userInfo = getCookie("info");
		console.log(userInfo.length);
		for(var i=0;i<userInfo.length;i++){
			var cur = userInfo[i];
			console.log(cur)
			if(uname == cur.uname){
				flag =false;
				if(pwd == cur.pwd){
					alert("登陆成功");
					var obj = {
						status : 1,
						name : uname
					}
					setCookie("loginInfo",JSON.stringify(obj));
					location.href = `index.html?status=1&uname=${uname}`;
					return;
				}else{
					alert("密码不对！请重新输入");
					return;
				}
			}
			
		}
		if(flag){
			alert("未注册")
		}
	})
	/*$(".biao").submit(function(){
		var flag = true;
		var uname = $("#loginname").val();
		var pwd = $("#nloginpwd").val();
		var userInfo = getCookie("info");
		console.log(userInfo.length);
		for(var i=0;i<userInfo.length;i++){
			var cur = userInfo[i];
			console.log(cur)
			if(uname == cur.uname){
				flag =false;
				if(pwd == cur.pwd){
					alert("登陆成功");
					var obj = {
						status : 1,
						name : uname
					}
					setCookie("loginInfo",JSON.stringify(obj));
					location.href = `index.html?status=1&uname=${uname}`;
					return true;
				}else{
					alert("密码不对！请重新输入");
					return false;
				}
			}
			
		}
		if(flag){
			alert("未注册");
			return false;
		}
	})*/
	
}
