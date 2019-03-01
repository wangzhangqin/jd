<?php
	include "public.php";
	$status = $_GET["status"];
	if($status == "insert"){
		$id = $_GET["id"];
		$name = $_GET["name"];
		$price = $_GET["price"];
		$src = $_GET["src"];
		$count = $_GET["count"];
		$color = $_GET["color"];
		$size = $_GET["size"];
		$sql = "select * from shoplist where `id`=$id";
		$row = mysql_query( $sql );
		$arr = mysql_fetch_array($row);
		$num = $arr['count'] + $count;
		if( $arr ){
			$sql = "UPDATE `shoplist` SET `count`='$num' WHERE id=$id";
			$res = mysql_query($sql);
			if( $res ){
				echo 1;
			}else{
				echo 0;
			}
		}else{
			$sql = "insert into shoplist (`id`,`name`,`price`,`src`,`count`,`color`,`size`) values ('$id','$name','$price','$src','$count','$color','$size')";
			$row = mysql_query($sql);
			if( $row ){
				echo 2;
			}else{
				echo 3;
			}
		}
	}else if($status == "select"){
		$sql = "select * from shoplist";
		$row = mysql_query($sql);
		$data = array();
		while( $arr = mysql_fetch_array($row) ){
			$data[] = $arr;
		}
		echo json_encode($data);
	}
?>