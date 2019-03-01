window.onload = function(){
	var txt = document.getElementsByClassName("text")[0];
	/*txt.onkeyup = function(){
		var data = this.value;
		var sc = document.createElement("script");
		sc.src = " https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+data+"&cb=fnc";
		document.body.appendChild(sc);
	}
	function fnc(msg){
		var arr = msg.s;
		var res = "";
		for(var i=0;i<arr.length;i++){
			str += `<li title="${arr[i]}" id="d_0">
									<div class="search_item">${arr[i]}</div>
									<div class="search_count">搜索历史</div>
								</li>`
		}
		str += `<li class="close">全部删除</li>`;
		shelper.innerHTML = str;
	}*/
	console.log(getCookie("shopInfo"))
	$("#J_event_close").click(function(){
		$(".top_ad").animate({opacity:0},1000,function(){
			$(this).hide();
		});
	})
	var a = getCookie("shopInfo");
	var c = "";
	var n = 0;
	var p = 0;
	for(var i=0;i<a.length;i++){
		c += `<li class="card_item">
				<div class="cart_inner">
					<div class="cart_img">
						<a href="" class="card_img_lk">
							<img src="images/${a[i].src}.jpg"/>
						</a>
					</div>
					<div class="cart_name">
						<a href="" >${a[i].name}</a>
					</div>
					<div class="cart_info">
						<div class="cart_price">${a[i].price}×${a[i].count}</div>
						<a href="javascript:;" class="cart_del" data-in="111" data-id="${a[i].id}">删除</a>
					</div>
				</div>
			</li>`;
		n += parseInt(a[i].count);
		p += a[i].count * a[i].price;
	}
	$(".cart_list").on("click",".cart_del",function(){
		for(var i=0;i<a.length;i++){
			if(a[i].id == $(this).data("id")){
				if(confirm("确定删除吗？")){
					a.splice(i,1);
					setCookie("shopInfo",JSON.stringify(a));
					$(this).parent().parent().parent().remove();
				}
			}
		}
	})
	$(".ci-count").html(n)
	$(".cart_list").html(c);
	$(".cart_num").eq(0).html(n);
	$(".cart_num").eq(1).html("$"+p);
	$.ajax({
		type : "GET",
		url : "res/city.json",
		success : function(res){
			var arr = res.info;
			var con = "";
			for(var i=0;i<arr.length;i++){
				con += `<div class="item">
												<a href="">${arr[i]}</a>	
											</div>`;
			}
			$(".ui-area-content-list").html(con);
			$(".item").eq(0).find("a").addClass("selected")
		}
	});
	$("#ttbar-selectcity").mouseenter(function(){
		$(this).find(".dd").show();
		$(".ui-areamini-text-wrap").css("background","#fff").css("border-bottom-color","#fff").css("height","31px");
	})
	$("#ttbar-selectcity").mouseleave(function(){
		$(this).find(".dd").hide();
		$(".ui-areamini-text-wrap").css("background","#e3e4e5").css("border-bottom-color","#e3e4e5").css("height","28px");
	})
	$(".ui-area-content-list").on("mouseenter",".item",function(){
		$(this).find("a").addClass("selected").end().siblings().find("a").removeClass("selected");
		return false;
	})
	/*var f = true;
	$(".logo").mouseenter(function(){
		console.log(f)
		if(f){
			$(".logo_scene").removeClass("logo_scene_hide");
			$(".logo_scene_img").css("opacity",1);
			f = false;
		}
		setTimeout(function(){
			$(".logo_scene").addClass("logo_scene_hide");
			$(".logo_scene_img").css("opacity",0);
			f = true;
		},3000)
	})*/
	
	var index = 0;
	var timer = setInterval(autoplay,3500);
	function autoplay(){
		index++;
		if(index==8){
			index=0;
		}
		$(".slider_item").eq(index).fadeIn(1000).siblings().fadeOut(600);
		
	}
	
	
	$(window).scroll(function(){
		var sTop = $(document).scrollTop();
		var h = $(".sk").offset().top
		if(sTop>h){
			$("#search").addClass("search-fix");
			//$("#search").css("top","-50px").animate({top:0},1000);
		}else{
			$("#search").removeClass("search-fix");
		}
	})
	$(".service_frame").mouseenter(function(){
		//$(".service_frame").find("a").css("margin-top",-48);
		$(".service_frame").find("a").animate({marginTop:-50},1000,function(){
		});
		$(this).find("span").css("border-color","red");
		$(".service_frame").find("a").find("span").siblings().css("visibility","hidden");
		$(this).find("span").css("color","red").end().siblings().find("span").css("color","black");
		$(".service_hide").show(1000);
		$(".service_hide_item").eq($(this).index()).show().siblings().hide();
		
	})
	$(".service_frame span").mouseenter(function(){
		$(this).css("border-color","red").parent().parent().siblings().find("span").css("border-color","#fff");
	})
	/*$(".service_hide").click(function(){
		$(this).hide(1000);
		$(".service_frame").find("a").animate({marginTop:0},1000);
		$(".service_frame").find("a").find("span").siblings().css("visibility","visible");
	})*/
	$(".jp-tab").mouseenter(function(){
		$(this).find("a").addClass("current").end().siblings().find("a").removeClass("current");
		$(".tab-content").stop().animate({left:$(this).index()*-190},1000);
	})
	$(".hotel-tab").mouseenter(function(){
		$(this).find("a").addClass("current").end().siblings().find("a").removeClass("current");
		$(".tab-content").stop().animate({left:$(this).index()*-190},1000);
	})
	$("#shelper li").mouseenter(function(){
		$(this).find(".search_count").html("删除").css("color","#005AA0");
	})
	$("#shelper li").mouseleave(function(){
		$(this).find(".search_count").html("搜索历史").css("color","#aaa");
	})
	$("#shelper li").click(function(){
		$(".text").val($(this).find(".search_item").html());
		$(this).parent().hide();
		//$(".search-bg").hide();
	})
	$(".text").click(function(){
		$("#shelper").show();
		$(".search-bg").hide();
		return false;
	})
	$(document).click(function(){
		$("#shelper").hide();
		//$(".search-bg").show();
	})
	//头部显示隐藏
	$("#myjd").mouseenter(function(){
		$(this).find(".downlayer").show();
	})
	$("#myjd").mouseleave(function(){
		$(this).find(".downlayer").hide();
	})
	$(".company").mouseenter(function(){
		$(this).find(".downlayer").show();
	})
	$(".company").mouseleave(function(){
		$(this).find(".downlayer").hide();
	})
	$("#settleup").mouseenter(function(){
		$(this).find(".dropdown-layer").show();
		$(this).find(".cw_icon").css("border-color","#ccc")
		$(this).find(".cw_icon").css("border-bottom-color","#fff")
		$(this).find(".cw_icon").css("height","35px")
	})
	$("#settleup").mouseleave(function(){
		$(this).find(".dropdown-layer").hide();
		$(this).find(".cw_icon").css("border-color","#e3e4e5")
		$(this).find(".cw_icon").css("height","33px")
	})
	$(".mobile").mouseenter(function(){
		$(this).find(".mobile_pop").show();
	})
	$(".mobile").mouseleave(function(){
		$(this).find(".mobile_pop").hide();
	})
	$.ajax({
		type : "GET",
		url : "res/hotword.json",
		async : true,
		success : function(res){
			var arr = res.hotword.first;
			var brr = res.hotword.searchbg;
			var index = 0;
			setInterval(function(){
				index++;
				if(index == 3){
					index = 0;
				}
				$(".hotwords .first-word").html(arr[index]);
			},1500)
			setInterval(function(){
				index++;
				if(index == 3){
					index = 0;
				}
				$(".search-bg").html(brr[index]);
			},2000)
			for(var i=1;i<res.hotword.data.length;i++){
				$(".hotwords a").eq(i).html(res.hotword.data[i]);
			}
		}
	})
	var deff = $.ajax({
		type:"get",
		url:"res/sklist.json",
		async:true
	});
	deff.done(function(response){
		var content = ""
		var arr = response.info;
		for(let i=0;i<4;i++){
			arr.push(arr[i]);
		}
		for(let j=0;j<4;j++){
			arr.unshift(arr[19]);
			
		}
		for(let i=0;i<arr.length;i++){
			var cur = arr[i];
			content+=`<div class="slider_item">
						<a href="sk_item_lk" title=${cur.name}>
							<div class="sk_item_img">
								<img src="images/${cur.src}" alt="" />
							</div>
							<p class="sk_item_name">${cur.name}</p>
							<div class="sk_item_price">
								<span class="mod_price sk_item_price_now">
									<i>￥</i>
									<span>${cur.newprice}</span>
								</span>
								<span class="mod_price sk_item_price_origin">
									<i>￥</i>
									<span>${cur.originprice}</span>
								</span>
							</div>
						</a>
					</div>`;
		}
		$(".sk_slider_wrapper").html(content);
	})
	var count = 1;
	/*$(".slider_control_next").click(function(){
		count++;
		if(count == 7){
			$(".sk_slider_wrapper").css("transform","translate3d(-800px,0,0)");
			count =2;
		}
		$(".sk_slider_wrapper").css("transition","transform 500ms ease-in-out 0s");
		$(".sk_slider_wrapper").css("transform","translate3d("+count*-800+"px,0,0)");
		
		
		//$(".sk_slider_wrapper").animate({transform:translate3d("+count*-800+"px,0,0)});
	})
	$(".sk_slider_wrapper").css("transition","none 0s ease 0s");*/
	$(".slider_control_next").click(function(){
		count++;
		if(count == 7){
			$(".sk_slider_wrapper").css({"left":"-800px"});
			count =2;
		}
		//$(".sk_slider_wrapper").css("transition","transform 500ms ease-in-out 0s");
		$(".sk_slider_wrapper").stop().animate({left:count*-800},500);
		
		
		//$(".sk_slider_wrapper").animate({transform:translate3d("+count*-800+"px,0,0)});
	})
	$(".slider_control_prev").click(function(){
		count--;
		if(count == -1){
			$(".sk_slider_wrapper").css({"left":"-4000px"});
			count =4;
		}
		//$(".sk_slider_wrapper").css("transition","transform 500ms ease-in-out 0s");
		$(".sk_slider_wrapper").stop().animate({left:count*-800},500);
		
		
		//$(".sk_slider_wrapper").animate({transform:translate3d("+count*-800+"px,0,0)});
	})
	var num=0;
	setInterval(function(){
		num++;
		if(num == 2){
			num=0;
		}
		$(".chn_wrapper").animate( { marginLeft : -180 } , 1500 ,function(){
			//运动完成后  marginLeft值恢复到0
			//将ul中的第一个li（第一张图片）剪切到ul的后面
			$(".chn_wrapper").css("margin-left",0)
				   .find( "a:first" )
				   .appendTo( ".chn_wrapper" );
		} )
		$(".sk_btn").eq(num).addClass("active").siblings().removeClass("active");
	},1500)
	setInterval(function(){
		$(".daily_slider_wrapper").animate( { marginLeft : -350 } , 1500 ,function(){
			//运动完成后  marginLeft值恢复到0
			//将ul中的第一个li（第一张图片）剪切到ul的后面
			$(".daily_slider_wrapper").css("margin-left",0)
				   .find( "a:first" )
				   .appendTo( ".daily_slider_wrapper" );
			//$(".second .icon_body_btn").addClass("body_btn_active").siblings().removeClass("body_btn_active");
		} )
		
	},3000)
	$(".icon_body_btn").mouseenter(function(){
		$(this).addClass("body_btn_active").siblings().removeClass("body_btn_active");
	})
	$(".icon_body_btn").eq(1).mouseenter(function(){
		$(".body_list").stop().animate({marginLeft:-350},1000);
	})
	$(".icon_body_btn").eq(0).mouseenter(function(){
		$(".body_list").stop().animate({marginLeft:0},1000);
	})
	$(".cate_menu_item").mouseenter(function(){
$(".cate_part").eq($(this).index()).show().siblings().hide();
$(this).css("background","#d9d9d9").siblings().css("background","#fff");
	})
	$(".cate").mouseenter(function(){
		$(".cate_pop").show();
	})
	$(".cate").mouseleave(function(){
		$(".cate_pop").hide();
	})
	$(".toolbar_tab_item").mouseenter(function(){
		$(this).children().css("background-color","#C81623 ");
		$(this).find(".tab_text").stop().animate({left:-60},500);
	})
	$(".toolbar_tab_item").mouseleave(function(){
		$(this).children().css("background-color","#7a6e6e ");
		$(this).find(".tab_text").stop().animate({left:35},500);
	})
	$(".toolbar_footer_item").mouseenter(function(){
		$(this).children().children().css("background-color","#C81623 ");
		$(this).find(".tab_text").stop().animate({left:-48},500);
	})
	$(".toolbar_footer_item").mouseleave(function(){
		$(this).children().children().css("background-color","#7a6e6e ");
		$(this).find(".tab_text").stop().animate({left:35},500);
	})
	$(".toolbar_footer_item").click(function(){
		$(document).scrollTop(0)
	})
	/*$(".toolbar_tab_item").mouseleave(function(){
		$(this).addClass("tab_toolbar_hover").siblings().removeClass("tab_toolbar_hover");
	})*/
	/*$.ajax({
		type : "GET",
		url : "res/rank.json",
		success : function(res){
			var title = "";
			var content1 = "";
			var content2 = "";
			console.log(res);
			var arr = res.info;
			for(let i=0;i<arr.length;i++){
				
				var cur = arr[i];
				console.log(cur);
				title += `<div class="tab_head_item">
						<a href="" class="tab_head_lk">${cur.name}</a>
					</div>`;
			}
			for(let i=0;arr[0].list.length;i++){
				if(i<3){
					var cur = arr[i]
					content1 += `<div class="top_item">
								<a href="" class="top_item_lk">
									<div class="top_item_img">
										<img src="images/${cur.src}" alt="" />
									</div>
									<span class="top_item_rank top_item_rank${cur.id}">${cur.id}</span>
									<span class="top_item_name">${cur.name}</span>
								</a>
							</div>`
				}
			}
			$(".tabhead").html(title).find("a").eq(0).addClass("tab_head_active");
			$(".item_active").html(content1);
		}
	})*/
	
	var str = location.href;
	var s = "";
	//console.log(JSON.parse(localStorage.getItem("login")))
	/*var status = str.split("?")[1].split("&")[0].split("=")[1];
	var name = str.split("?")[1].split("&")[1].split("=")[1];*/
	//var status = JSON.parse(localStorage.getItem("login")).status;
	//var name = JSON.parse(localStorage.getItem("login")).name;
	var loginInfo = getCookie("loginInfo");
	var status = loginInfo.status;
	var name = loginInfo.name;
	$("#tbar_login").empty();
	$(".user_show").empty();
	$(".user_profit").empty();
	console.log(status)
	if(status){
		s = `<div class="dt cw_icon">
								<i class="userico_ico"></i>
								<a href="javascript:;" class="nickname">${name}</a>
								<i class="iconfont icon-jiantouxia"></i>
							</div>`
		$("#tbar_login").html(s);
		$(".user_show").html(`<p>
										Hi
										<a href="">${name}</a>
									</p>
									<p>
										<a href="" class="user_spoint">
										<i class="user_spoint_icon"></i>
										</a>
										<a href="" class="user_level">
											<i class="user_level_icon"></i>
										</a>
										<a href="javascript:;" class="logout">退出</a>
									</p>`);
		$(".user_profit").html(`<a href="" class="user_profit_lk user_profit_lk_long">开通PLUS 平均省1012元/年</a>`);
	}else{
		$("#tbar_login").html(`<a href="login.html" class="login-link">你好，请登录</a>
							&nbsp;&nbsp;
							<a href="regist.html" class="register style-red">免费注册</a>`);
		$(".user_show").html(`<p class="user_tip">Hi~欢迎来到京东！</p>
									<p>
										<a href="login.html" class="user_login">登陆</a>
										<a href="regist.html" class="uset_reg">注册</a>
									</p>`);
		$(".user_profit").html(`<a href="" class="user_profit_lk">新人福利</a>
									<a href="" class="user_profit_lk plus">PLUS会员</a>`);
	}
	$(".logout").click(function(){
		var obj = getCookie("loginInfo");
		obj.status = 0;
		setCookie("loginInfo",JSON.stringify(obj));
		location.reload();
	})
	var deff = $.ajax({
		type : "GET",
		url : "res/product.json",
	})
	deff.done(function(res){
		
		var arr = res.good;
		var con = "";
		for(var i=0;i<arr.length;i++){
			var cur = arr[i];
			con+=`<li class="more_item more_item_good">
					<a href="page.html?pid=${cur.id}" class="more_link">
						<div class="more_img">
							<img src="images/${cur.src}" alt="" width="170px" height="170px"/>
						</div>
						<div class="more_info">
							<p class="more_info_name">${cur.name}</p>
							<div class="more_info_price">
								<div class="mod_price">
									<i>¥</i>
									<span class="more_info_price_txt">${cur.price}</span>
								</div>
							</div>
						</div>
					</a>
					<div class="more_find">
						<div class="more_find_btn">
							<span>找相似</span>
						</div>
					</div>
				</li>`;
		}
		$(".more_list").html(con);
	})
	/*$(".more_item").mouseenter(function(){
		$(".more_find").addClass("csstransitions");
	})*/
}

