window.onload = function(){
	var arr = getCookie("shopInfo");
	var con = "";
	var count = 0;
	console.log(5)
	
	for(var i=0;i<arr.length;i++){
		var cur = arr[i];
		console.log(cur);
		con += `<div class="item-single item-item">
					<div class="item-form" style="height: 107px;">
						<div class="p-checkbox cell">
							<div class="cart-checkbox">
								<input type="checkbox" name="checkItem" class="jdcheckbox"/>
								<label for="">勾选全部商品</label>
							</div>
						</div>
						<div class="p-goods cell">
							<div class="goods-item">
								<div class="p-img">
									<a href=""><img src="images/${cur.src}.jpg"/></a>
								</div>
								<div class="item-msg">
									<div class="p-name">
										<a href="">${cur.name}</a>
									</div>
								</div>
							</div>
						</div>
						<div class="p-props cell">
							<div class="props-txt">${cur.color}</div>
							<div class="props-txt">${cur.size}</div>
						</div>
						<div class="p-price-new cell">
							¥${cur.price}
						</div>
						<div class="p-quantity cell">
							<div class="quantity-form" data-id="${cur.id}">
								<a href="#none" class="decrement crement" data-num="-1">-</a>
								<input type="text" class="itxt" value="${cur.count}"/>
								<a href="#none" class="increment crement" data-num="1">+</a>
							</div>
						</div>
						<div class="p-sum cell">
							¥<strong>${cur.price*cur.count}</strong>
						</div>
						<div class="p-ops cell">
							<a href="javascript:;" data-id="${cur.id}" class="del-btn">删除</a>
						</div>
					</div>
				</div>`;
		count+=parseInt(cur.count);
	}
	$(".number").html(count);
	$(".item-list").html(con);
	//全选
	$("input[name='toggle-checkboxes']").click(function(){
		if($(this).prop("checked")){
			$(".item-item").addClass("item-selected");
		}else{
			$(".item-item").removeClass("item-selected");
		}
		$("input[name=checkItem]").prop("checked",$(this).prop("checked"));
		$("input[name=toggle-checkboxes]").prop("checked",$(this).prop("checked"));
		total();
	})
	//结算
	function total(){
		var tCount = 0;
		var tMoney = 0;
		$("input[name=checkItem]:checked").each(function(){
			tCount += parseInt($(this).parent().parent().parent().find(".itxt").val());
			tMoney += parseInt($(this).parent().parent().parent().find("strong").html())
		})
		console.log(tCount)
		$(".amount-sum").find("em").html(tCount);
		$(".sumPrice").find("em").html("￥"+tMoney);
	}
	
	$("input[name=checkItem]").click(function(){
		if($(this).prop("checked")){
			$(this).parent().parent().parent().parent().addClass("item-selected");
		}else{
			$(this).parent().parent().parent().parent().removeClass("item-selected");
		}
		total();
	})
	//删除
	$(".p-ops").on("click",".del-btn",function(){
		var pid = $(this).data("id");
		/*$(".ui-dialog").show();
		$(".ui-mask").show();*/
		for(var i=0;i<arr.length;i++){
			if(arr[i].id == pid){
				if(confirm("确定删除吗？")){
					arr.splice(i,1);
					setCookie("shopInfo",JSON.stringify(arr));
					$(this).parent().parent().remove();
				}
			}
		}
		//$(".ui-mask").show();
	})
	/*$(".btn-9").click(function(){
		for(var i=0;i<arr.length;i++){
			if(arr[i].id == pid){
				arr.splice(i,1);
				setCookie("shopInfo",JSON.stringify(arr));
				$(this).parent().parent().remove();
			}
		}
	})*/
	//加减操作
	$(".quantity-form").on("click",".crement",function(){
		var num = $(this).data("num");
		var count = $(this).parent().find(".itxt").val();
		if(count == 1 && num == -1){
			return;
		}
		var pid = $(this).parent().data("id");
		for(var i=0;i<arr.length;i++){
			if(pid == arr[i].id){
				arr[i].count += num;
				setCookie("shopInfo",JSON.stringify(arr));
				$(this).parent().find(".itxt").val(arr[i].count);
				$(this).parent().parent().next().find("strong").html(arr[i].count*arr[i].price);
				total();
			}
		}
	})
	$(".ui-dialog-close").click(function(){
		$(".ui-dialog").hide();
		$(".ui-mask").hide();
	})
}
