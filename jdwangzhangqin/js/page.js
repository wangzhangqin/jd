window.onload = function(){
	var str = location.href;
	var bImg = [];
	var sImg = [];
	var cou;
	//console.log(str);
	var pid = str.split("?")[1].split("=")[1];
	$.ajax({
		type : "GET",
		url : "res/detailinfo.json",
		success : function(res){
			var arr = res.list;
			for(var i=0;i<arr.length;i++){
				var cur = arr[i];
				console.log(cur)
				if(pid == cur.id){
					var con = "";
					bImg = cur.bsrc;
					sImg = cur.ssrc;
					$(".sku-name").html(cur.name);
					$(".price").html(cur.price);
					//$(".btn-lg").attr("href",`addToCart.html?pid=${cur.id}&pc=${cou}`);
					$("#spec-n1").find("img").attr("src",`images/${sImg[0]}.jpg`);
					$(".zoomdiv").find("img").attr("src",`images/${bImg[0]}.jpg`);
					for(var j=0;j<cur.lsrc.length;j++){
						var item = cur.lsrc[j];
						con += `<li data-id="${cur.name}">
								<img src="images/${item}.jpg" alt="" width="54px" height="54px" />
							</li>`
					}
					$(".lh").html(con);
					var obj = {
						name : cur.name,
						color : cur.color,
						size : cur.size,
						price : cur.price,
						num : 1,
						src : cur.lsrc[0]
					};
					setCookie("shopnumber",JSON.stringify(obj));
				}
			}
		}
	})
	$(".lh").on("click","li",function(){
		alert()
		console.log(str)
		console.log($(this).data("id"))
	})
	$(".lh").on("mouseenter","li",function(){
		$(this).addClass("img-hover").siblings().removeClass("img-hover");
		//<img src="images/preview-small1.jpg" alt="" width="450px" id="spec-img"/>
		$("#spec-img").attr("src",`images/${sImg[$(this).index()]}.jpg`);
		$(".bigimg").attr("src",`images/${bImg[$(this).index()]}.jpg`);
	})
	$(".main-img").mouseenter(function(){
		$("#mask").show();
		$(".zoomdiv").show();
	})
	$(".main-img").mouseleave(function(){
		$("#mask").hide();
		$(".zoomdiv").hide();
	})
	$("#spec-n1").mousemove(function(e){
		var e = e || event;
		var x = e.pageX - $(this).offset().left - $("#mask").width()/2;
		var y = e.pageY - $(this).offset().top - $("#mask").height()/2;
		var maxL = $(this).width() - $("#mask").width();
		var maxT = $(this).height() - $("#mask").height();
		x = Math.min(Math.max(0,x),maxL);
		y = Math.min(Math.max(0,y),maxT);
		$("#mask").css({left:x,top:y});
		$(".bigimg").css({left:-800/450*x,top:-800/450*y});
	})
	$(".wrap-input a").click(function(){
		var num = $(this).data("number");
		var count = parseInt($("#buy-num").val());
		if(count==1 && num ==-1){
			$(".btn-reduce").addClass("disabled");
			return;
		}else{
			$(".btn-reduce").removeClass("disabled");
		};
		$("#buy-num").val(count+num);
		var obj = getCookie("shopnumber");
		obj.num = count+num;
		console.log(obj)
		setCookie("shopnumber",JSON.stringify(obj));
		$(".btn-lg").attr("href",`addToCart.html?pid=${pid}&pc=${$("#buy-num").val()}`);
	})
	var cou = $("#buy-num").val();
	$(".btn-lg").attr("href",`addToCart.html?pid=${pid}&pc=${cou}`);
	var ary = [];
	
	/*$(".btn-lg").click(function(){
		var obj = getCookie("shopnumber");
		console.log(obj.name);
		console.log(obj.price);
		console.log(obj.src);
		$.ajax({
			type:"get",
			url:"shopList.php",
			async:true,
			data : `status=insert&id=${pid}&name=${obj.name}&price=${obj.price}&src=${obj.src}&count=${obj.num}&color=${obj.color}&size=${obj.size}`,
			success : function(res){
				console.log(res)
			}
		});
		
	})*/
	$(".btn-lg").click(function(){
		var obj = getCookie("shopnumber");
		var data = {
			name : obj.name,
			id : pid,
			price : obj.price,
			color: obj.color,
			size :obj.size,
			count :obj.num,
			src : obj.src
		};
		var flag = true;
		var shopInfo = getCookie("shopInfo");
		
		if(shopInfo.length!=0){
			for(var i=0;i<shopInfo.length;i++){
				if(data.id == shopInfo[i].id){
					shopInfo[i].count += data.count;
					flag = false;
					break;
				}
			}
		}
		if(flag){
			shopInfo.push(data);
		}
		console.log(ary)
		setCookie("shopInfo",JSON.stringify(shopInfo),2);
	})
	
}
