window.onload = function(){
	var index = 0;
	var flag = true;
	var timer = setInterval(autoPlay,3000);
	function autoPlay(){
		index++;
		if(index == 7){
			index = 1;
			$(".fs_tab_cont").css("left","0");
		}
		$(".fs_tab_cont").animate({left:index*-590},1000);
		$(".fs_nav_item").eq(index==6? 0:index).addClass("now").siblings().removeClass("now");
	}
	//
	$(".gotop").click(function(){
		flag=false;
		$("body,html").animate({scrollTop:0},1000,function(){
			flag = true;
		})
	})
	$(".evevator_handle").click(function(){
		flag = false;
		var index = $(this).index();
		var top = $(".floor").eq(index).offset().top;
		$("body,html").animate({scrollTop:top},1000,function(){
			flag=true;
		});
		$(this).addClass("current").siblings().removeClass("current");
	})
	//滑动楼梯
	$(window).scroll(function(){
		if(flag){
			var stop = $(document).scrollTop();
		//console.log($(".floor"))
			var $floor = $(".floor").filter(function(index){
				//console.log(index)
				//console.log($(this).offset().top - stop + "...." + $(this).height()/2 + "..."+ $(this).index());
				return Math.abs($(this).offset().top - stop) < $(this).height()/2;
				//return stop+$(window).height() > $(this).height()/2 + $(this).offset().top;
			})
			console.log($floor)
			var s = $floor.index();
			console.log(s)
			if(s != -1){
				$(".evevator_handle").eq(s).addClass("current").siblings().removeClass("current");
			}
			if(stop<100){
				$(".evevator_handle").removeClass("current");
				$(".elevator").hide();
			}else{
				$(".elevator").show();
			}
		}
	})
	$(".club0 .nav-item").mouseenter(function(){
		$(this).addClass("current").siblings().removeClass("current");
		$(".club0 .content-item").eq($(this).index()).addClass("current").siblings().removeClass("current");
	})
	$(".club1 .nav-item").mouseenter(function(){
		$(this).addClass("current").siblings().removeClass("current");
		$(".club1 .content-item").eq($(this).index()).addClass("current").siblings().removeClass("current");
	})
	$(".club2 .nav-item").mouseenter(function(){
		$(this).addClass("current").siblings().removeClass("current");
		$(".club2 .content-item").eq($(this).index()).addClass("current").siblings().removeClass("current");
	})
	$(".shuma-new .m-item").mouseenter(function(){
		$(this).addClass("current").siblings().removeClass("current");
	})
	$(".side").mouseenter(function(){
		$(".huadong").stop().animate({left:250},500,function(){
			$(".huadong").css("left","-250px");
		});
	})
}
