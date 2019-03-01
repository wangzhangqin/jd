window.onload = function(){
	var res = location.href;
	var arr = res.split("?")[1];
	var pid = arr.split("&")[0].split("=")[1];
	var pc = arr.split("&")[1].split("=")[1];
	var simi = ["simi-item1","simi-item2","simi-item3","simi-item4","simi-item5","simi-item6","simi-item7","simi-item8"]
	$(".txt").eq(2).html("/ 数量:"+pc);
	$.ajax({
		type:"get",
		url:"res/detailinfo.json",
		async:true,
		success : function(response){
			console.log(response)
			var arr = response.list;
			for(var i=0;i<arr.length;i++){
				if(pid == arr[i].id){
					$(".p-name a").html(arr[i].name);
					$(".txt").eq(0).html("颜色:"+arr[i].color);
					$(".txt").eq(1).html("尺码:"+arr[i].size);
					$(".succees-cont .p-img img").attr("src",`images/${arr[i].lsrc[0]}.jpg`);
					$(".btn-tobback").attr("href",`page.html?pid=${arr[i].id}`);
				}
			}
		}
	});
	$(".s-nav-item").mouseenter(function(){
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".mc").stop().animate({left:-1211*$(this).index()},1000)
	})
	$.ajax({
		type : "get",
		url : "similar.php",
		success : function(res){
			var arr = JSON.parse(res);
			var str = "";
			for(var i=0;i<arr.length;i++){
				var item = arr[i];
				console.log(item.color);
				if(i==3||i==7){
						str += `<li>
							<div class="item item-last">
								<div class="p-img">
									<a href="">
										<img src="${item.src}" alt="" width="98px" height="98px"/>
									</a>
								</div>
								<div class="p-name">
									<a href="">${item.name}</a>
								</div>
								<div class="p-price">
									<strong>
										<em>￥</em>
										<i>${item.price}</i>
									</strong>
								</div>
								<div class="p-btn">
									<a href="#none" class="btn-append" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-src="${simi[i]}" data-color="${item.color}" data-size="${item.size}" >
										<b></b>
										加入购物车
									</a>
								</div>
							</div>
						</li>`
				}else{
					
				
				str += `<li>
							<div class="item">
								<div class="p-img">
									<a href="">
										<img src="${item.src}" alt="" width="98px" height="98px"/>
									</a>
								</div>
								<div class="p-name">
									<a href="">${item.name}</a>
								</div>
								<div class="p-price">
									<strong>
										<em>￥</em>
										<i>${item.price}</i>
									</strong>
								</div>
								<div class="p-btn">
									<a href="#none" class="btn-append" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-src="${simi[i]}" data-color="${item.color}" data-size="${item.size}" >
										<b></b>
										加入购物车
									</a>
								</div>
							</div>
						</li>`
				}
			}
			$(".goods-list").find("ul").html(str);
			
		}
	})
	$(".goods-list").on("click",".btn-append",function(){
		var data = {
			name : $(this).data("name"),
			id :$(this).data("id"),
			price : $(this).data("price"),
			color: $(this).data("color"),
			size :$(this).data("size"),
			count :1,
			src : $(this).data("src")
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
		setCookie("shopInfo",JSON.stringify(shopInfo),2);
		if(!confirm("取消进购物车")){
			location.href = "cart.html";
		}
	})
	/*$(".goods-list").on("click",".btn-append",function(){
		var id = $(this).data("id");
		var name = $(this).data("name");
		var price = $(this).data("price");
		var src = $(this).data("src");
		var count = 1;
		var color = $(this).data("color");
		var size = $(this).data("size");
		/*var name = $(this).data("name");
		
		
		console.log(size);
		console.log(color);
		$.ajax({
			type:"get",
			url:"shopList.php",
			data : `status=insert&id=${id}&name=${name}&price=${price}&src=${src}&count=${count}&color=${color}&size=${size}`,
			success : function(res){
				if(res == 1){
					alert("修改成功")
				}else if(res == 0){
					alert("修改失败")
				}else if(res == 0){
					alert("添加成功")
				}else if(res == 0){
					alert("添加失败")
				}
			}
		});
	})*/
}
